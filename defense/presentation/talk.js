/* PhD defense presentation engine.
   - Every slide is drawn on a 1920 x 1080 canvas, scaled to the screen.
   - Steps: video slides advance scene by scene (each scene stops on its last frame),
     build slides reveal their [data-step] elements one at a time.
   - Video slides have a scene bar (shown when the mouse moves): pause and play, drag
     to any time, one dot per scene. Keys: K pause and play, J and L five seconds.
   - Links between slides ([data-go]) keep a return history, as Beamer's return buttons.
   - Presenter view (P): current and next slide, notes, timer; synced with BroadcastChannel.
   - Review mode (C, or the comment button): handled by review.js through window.TALKAPI.
   Plain script (no modules) so that the folder also runs offline from file://. */
(function () {
  "use strict";
  const T = window.TALK;
  const EPS = 1 / 60;
  const MAIN = T.slides, BACK = T.backups;
  const ALL = MAIN.concat(BACK);
  const IDX = {};
  ALL.forEach((s, i) => { IDX[s.id] = i; s.i = i; s.main = i < MAIN.length; });
  const SEC = {};
  T.sections.forEach((s) => { SEC[s.id] = s; });
  const PRESENTER = /[?&]presenter\b/.test(location.search);
  const chan = "BroadcastChannel" in window ? new BroadcastChannel("phd-defense-talk") : null;

  const stage = document.getElementById("stage");
  let cur = 0, step = 0;           // slide index, step (video: current part, -1 = before part 1)
  let playing = false, stopAt = 0; // video part being played
  const trail = [];                // return points for links: [{i, step}]

  // ---------------------------------------------------------------- helpers
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const label = (s) => s.main ? `${s.i + 1}` : (s.type === "bindex" ? "A" : `A${s.i - MAIN.length}`);
  const fullLabel = (s) => s.main ? `${s.i + 1} / ${MAIN.length}` : label(s);
  const isVideo = (s) => s.type === "video";
  const nSteps = (s) => isVideo(s) ? s.video.parts.length : (s.steps || 0);
  const secSlides = (sec) => ALL.filter((s) => s.sec === sec && s.type !== "section");
  const ICON = {
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
    play: '<svg class="i-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.2v13.6L19 12z"/></svg>',
    pause: '<svg class="i-pause" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4.3" height="14" rx="1.2"/><rect x="13.7" y="5" width="4.3" height="14" rx="1.2"/></svg>',
    cmt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M4 5.5h16v10.5h-9l-4.5 3.5v-3.5H4z"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/></svg>',
  };

  // ---------------------------------------------------------------- building the slides
  function header(s) {
    const sec = SEC[s.sec];
    const kick = sec ? `<a data-go="${sec.page}" title="Section page">${esc(sec.kicker)}</a>` : "";
    const sub = s.kicker ? (sec ? " · " : "") + esc(s.kicker) : "";
    const peers = s.sec ? secSlides(s.sec) : [];
    const mini = peers.length > 1 ? `<div class="mini">${peers.map((p) =>
      `<button type="button" data-go="${p.id}" title="${esc(label(p) + " · " + p.title)}" class="${p.i === s.i ? "on" : ""}"></button>`).join("")}</div>` : "";
    const cs = (s.c || []).map((c) => `<a class="cbadge" data-go="contrib" title="Contribution ${c}">${c}</a>`).join("");
    return `<div class="hdr"><div class="contrib">${cs}</div><div class="kicker">${kick}${sub}</div>` +
      `<div class="title">${s.title}</div>${mini}</div>` + thread(s);
  }

  // the guiding thread of a section (the introduction): its steps, the current one marked
  function thread(s) {
    const sec = SEC[s.sec];
    if (!s.th || !sec || !sec.thread) return "";
    const k = sec.thread.indexOf(s.th);
    return `<div class="thr">` + sec.thread.map((lab, j) => {
      const to = ALL.find((x) => x.sec === s.sec && x.th === lab);
      return `<a${to ? ` data-go="${to.id}"` : ""} class="${j < k ? "done" : (j === k ? "on" : "")}">${esc(lab)}</a>`;
    }).join("<i>›</i>") + `</div>`;
  }

  function footer(s) {
    const secs = T.sections.map((x) =>
      `<button type="button" data-go="${x.page}" class="${x.id === s.sec ? "on" : ""}" title="${esc(x.toc || x.title)}">${esc(x.short || x.n)}</button>`).join("") +
      `<button type="button" class="part ${s.main ? "" : "on"}" data-go="bindex" title="Appendix">Appendix</button>`;
    const num = s.type === "title" ? "" : fullLabel(s);
    return `<div class="ftr"><div class="secs">${secs}</div>` +
      (s.type === "video" ? "" : `<div class="who">${esc(T.footer)}</div>`) +
      `<div class="nav"><button type="button" class="ret" data-ret hidden title="Return (R)"></button>` +
      `<button type="button" data-cmd="prev" title="Previous (←)" aria-label="Previous">${ICON.prev}</button>` +
      `<button type="button" data-cmd="overview" title="All slides (O)" aria-label="All slides">${ICON.grid}</button>` +
      `<button type="button" data-cmd="next" title="Next (→)" aria-label="Next">${ICON.next}</button>` +
      `<button type="button" class="cmtbtn" data-cmd="comments" title="Comments (C)" aria-label="Comments">${ICON.cmt}<span class="cnt"></span></button>` +
      `<span class="num">${num}</span></div></div>` +
      (s.main ? `<div class="progress"><i style="width:${((s.i + 1) / MAIN.length * 100).toFixed(2)}%"></i></div>` : "");
  }

  function tocHTML(onSec) {
    let html = "";
    T.sections.forEach((x) => {
      const done = onSec && T.sections.findIndex((y) => y.id === onSec) > T.sections.indexOf(x);
      html += `<a data-go="${x.page}" class="${x.id === onSec ? "on" : (done ? "done" : "")}"><span>${x.n}</span><span>${esc(x.toc || x.title)}</span></a>`;
    });
    return html;
  }

  // references of a slide, at its foot, as in an article: [n] authors, "title," venue, year.
  // Numbered over the whole defense (T.bibnum); each number opens the References pages at the end.
  function cites(s) {
    const ks = (s.refs || []).filter((k) => T.bib && T.bib[k]);
    if (!ks.length || s.type === "video" || s.dark) return "";
    return `<div class="cites${ks.length > 2 ? " two" : ""}">` +
      ks.map((k) => `<p><a data-go="${T.refpage[k]}">[${T.bibnum[k]}]</a> ${T.bib[k][0]}</p>`).join("") + `</div>`;
  }

  // in-text citations: each marker gets its numbers, [3] or [3, 7], and opens the References
  function citeNumbers(el) {
    el.querySelectorAll("cite.cref").forEach((c) => {
      const ks = c.dataset.k.split(",").filter((k) => T.bibnum && T.bibnum[k]).sort((a, b) => T.bibnum[a] - T.bibnum[b]);
      if (!ks.length) { c.remove(); return; }
      c.textContent = `[${ks.map((k) => T.bibnum[k]).join(", ")}]`;
      c.title = ks.map((k) => `[${T.bibnum[k]}] ` + T.bib[k][1].replace(/<[^>]+>/g, "")).join(" · ");
      c.dataset.go = T.refpage[ks[0]];
    });
  }

  function build(s) {
    const el = document.createElement("section");
    el.className = "slide " + (s.type || "content") + (s.dark ? " dark" : "") + (s.th && !s.dark && s.type !== "video" ? " thr-on" : "") +
      (cites(s) ? " has-cites" : "");
    el.dataset.i = s.i;
    let inner = "";
    if (s.type === "title") {
      inner = s.html + footer(s);
    } else if (s.type === "agenda") {
      // the title of every section, nothing else; each row opens its section page
      const rows = T.sections.map((x) => `<a class="ag-row" data-go="${x.page}" href="#/${x.page}"><span class="n">${x.n}</span>` +
        `<div class="t">${esc(x.toc || x.title)}</div></a>`).join("");
      inner = header(s) + `<div class="body"><div class="agenda">${rows}</div>${s.html || ""}</div>` + footer(s);
    } else if (s.type === "outline") {
      const rows = T.sections.filter((x) => x.c).map((x) => `<a data-go="${x.page}" href="#/${x.page}">` +
        `<div class="num-badge ${x.c[0].toLowerCase()}">${x.c[0]}</div>` +
        `<div class="t">${esc(x.title)}<small>${esc(x.sub || "")}</small></div>` +
        `<div class="m">${(x.pubs || []).map((p) => `<span class="pill line">${esc(p)}</span>`).join("")}${x.pubk ? `<cite class="cref" data-k="${x.pubk}"></cite>` : ""}</div>` +
        `<span class="arrow">→</span></a>`).join("");
      inner = header(s) + `<div class="body"><div class="outl">${rows}</div>${s.html || ""}</div>` + cites(s) + footer(s);
    } else if (s.type === "section") {
      // the part, its question and its publication; nothing repeated (no C badge, no principle strip, no goal line)
      const x = SEC[s.sec];
      const pubs = (x.pubs || []).map((p) => `<span class="pill">${esc(p)}</span>`).join("");
      const kick = x.title.toLowerCase().startsWith(x.ch.toLowerCase()) ? "" : `<div class="k">${esc(x.ch)}</div>`;
      inner = `<div class="sec"><div class="main">${kick}` +
        `<div class="big">${esc(x.title.replace(/^C\d+ · /, ""))}</div>${x.sub ? `<div class="sub">${x.sub}</div>` : ""}` +
        `${pubs ? `<div class="cs">${pubs}</div>` : ""}</div>` +
        `<div class="side">${tocHTML(s.sec)}</div></div>` + footer(s);
    } else if (s.type === "video") {
      inner = `<video muted playsinline preload="none" data-src="${esc(s.video.src)}" aria-label="${esc(s.title)}"></video>` +
        `<div class="vstep"></div><div class="scrub"><button type="button" class="pp" data-cmd="vtoggle" title="Pause or play (K)" aria-label="Pause or play">${ICON.play}${ICON.pause}</button>` +
        `<span class="tc now">0:00</span><div class="track"><div class="rail"></div><div class="fill"></div>` +
        s.video.parts.map((p, k) => `<button type="button" class="dot" data-part="${k}" aria-label="${esc(`Scene ${k + 1}: ${p[1]}`)}"></button>`).join("") +
        `<div class="knob"></div><div class="tip"></div></div><span class="tc end"></span></div>` + footer(s);
    } else if (s.type === "thanks" || s.type === "bindex" || s.type === "bridge") {
      inner = (s.type === "bindex" ? header(s) : "") + s.html + footer(s);
    } else {
      const bk = (s.backups || []).map((b) => `<a data-go="${b}">Appendix ${label(ALL[IDX[b]])} · ${esc(ALL[IDX[b]].title)}</a>`).join("");
      inner = header(s) + (bk ? `<div class="bk">${bk}</div>` : "") + `<div class="body">${s.html}</div>` + cites(s) + footer(s);
    }
    el.innerHTML = inner;
    citeNumbers(el);
    return el;
  }

  const els = ALL.map((s) => { const el = build(s); stage.appendChild(el); applySteps(el, 0); return el; });

  // the foot references take the room they need: the body ends just above them
  function fitCites() {
    els.forEach((el) => {
      const c = el.querySelector(":scope > .cites"), b = el.querySelector(":scope > .body");
      if (c && b) b.style.bottom = `${Math.ceil(66 + c.offsetHeight + 14)}px`;
    });
  }
  fitCites();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitCites);

  // header titles: shrink until they fit on one line
  function fitTitles(root) {
    root.querySelectorAll(".hdr .title").forEach((t) => {
      let size = 43;
      t.style.fontSize = size + "px";
      while (t.scrollWidth > t.clientWidth + 1 && size > 28) { size -= 1; t.style.fontSize = size + "px"; }
      if (t.scrollWidth > t.clientWidth + 1) { t.style.whiteSpace = "normal"; t.style.fontSize = "30px"; }
    });
  }

  // ---------------------------------------------------------------- scaling
  function fit() {
    // the review panel takes the right side of wide screens
    const W = window.innerWidth - (document.body.classList.contains("cmt-open") && window.innerWidth > 900 ? 380 : 0);
    const s = Math.min(W / 1920, window.innerHeight / 1080);
    stage.style.left = "0px"; stage.style.top = "0px";
    stage.style.transform = `translate(${(W - 1920 * s) / 2}px, ${(window.innerHeight - 1080 * s) / 2}px) scale(${s})`;
    if (PRESENTER) fitPresenter();
  }
  window.addEventListener("resize", fit);

  // ---------------------------------------------------------------- videos
  const vidOf = (i) => els[i].querySelector("video");
  function ensureSrc(i) {
    const v = ALL[i] && isVideo(ALL[i]) ? vidOf(i) : null;
    if (v && !v.getAttribute("src")) {
      v.preload = "auto"; v.src = v.dataset.src; v.load();
      v.addEventListener("loadedmetadata", () => layoutScrub(i));
      ["seeked", "timeupdate", "play", "pause"].forEach((ev) => v.addEventListener(ev, () => updateScrub(i)));
      // safety net: when the page is in the background, animation frames stop, timeupdate does not
      v.addEventListener("timeupdate", () => { if (i === cur && playing && v.currentTime >= stopAt) { v.pause(); v.currentTime = stopAt; playing = false; render(); } });
      v.addEventListener("seeked", () => { if (i === cur && pendingT !== null) { const t = pendingT; pendingT = null; seekTo(t); } });
    }
    return v;
  }
  function whenReady(v, fn) {
    if (v.readyState >= 1) fn(); else v.addEventListener("loadedmetadata", fn, { once: true });
  }
  const startOf = (s, k) => s.video.parts[k][0];
  function endOf(s, k, v) {
    const parts = s.video.parts;
    const end = k + 1 < parts.length ? parts[k + 1][0] : (s.video.end || (v && v.duration) || s.video.duration);
    return end - 2 * EPS;
  }
  function watch() {
    const s = ALL[cur];
    if (!playing || !isVideo(s)) return;
    const v = vidOf(cur);
    if (v.currentTime >= stopAt) { v.pause(); v.currentTime = stopAt; playing = false; render(); return; }
    updateScrub(cur);
    requestAnimationFrame(watch);
  }
  // play scene k from time t (default: its start) up to its last frame
  function playFrom(k, t) {
    const s = ALL[cur], v = ensureSrc(cur);
    step = k; playing = true;
    whenReady(v, () => {
      stopAt = endOf(s, k, v);
      v.currentTime = t === undefined ? startOf(s, k) + EPS : t;
      v.play().then(() => requestAnimationFrame(watch)).catch(() => { playing = false; });
    });
  }
  const playPart = (k) => playFrom(k);

  // ---------------------------------------------------------------- scene bar
  const fmtT = (t) => { t = Math.max(0, Math.floor(t + 1e-3)); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`; };
  const vEnd = (s, v) => s.video.end || (v && v.duration) || s.video.duration || 0;
  const partAt = (s, t) => s.video.parts.reduce((k, p, j) => (t >= p[0] - 0.01 ? j : k), 0);
  let pendingT = null, drag = null, barTimer = 0;
  function span(i) {
    const s = ALL[i], v = vidOf(i);
    return { s, v, t0: startOf(s, 0), t1: vEnd(s, v) };
  }
  function layoutScrub(i) {
    const { s, t0, t1 } = span(i);
    if (!(t1 > t0)) return;
    els[i].querySelectorAll(".scrub .dot").forEach((d) => { d.style.left = `${((s.video.parts[+d.dataset.part][0] - t0) / (t1 - t0)) * 100}%`; });
    els[i].querySelector(".scrub .end").textContent = fmtT(t1);
    updateScrub(i);
  }
  function updateScrub(i) {
    const { s, v, t0, t1 } = span(i);
    if (!v || !(t1 > t0) || v.readyState < 1) return;
    const el = els[i], t = Math.min(Math.max(v.currentTime, t0), t1), f = `${((t - t0) / (t1 - t0)) * 100}%`;
    el.querySelector(".scrub .fill").style.width = f;
    el.querySelector(".scrub .knob").style.left = f;
    el.querySelector(".scrub .now").textContent = fmtT(v.currentTime);
    const k = partAt(s, t);
    el.querySelectorAll(".scrub .dot").forEach((d) => { const j = +d.dataset.part; d.classList.toggle("past", j <= k); d.classList.toggle("on", j === k); });
    el.querySelector(".scrub").classList.toggle("playing", i === cur && playing);
    el.querySelector(".vstep").textContent = `Scene ${k + 1} / ${s.video.parts.length} · ${s.video.parts[k][1]}`;
  }
  // pause on the frame at time t; the scene becomes the one that contains t
  function seekTo(t) {
    const s = ALL[cur];
    if (!isVideo(s)) return;
    const v = ensureSrc(cur);
    whenReady(v, () => {
      t = Math.min(Math.max(t, startOf(s, 0) + EPS), vEnd(s, v) - 2 * EPS);
      playing = false; v.pause(); v.currentTime = t;
      step = partAt(s, t);
      render();
    });
  }
  function seekLive(t) {             // while dragging: one seek at a time
    const v = vidOf(cur);
    if (v && v.seeking) { pendingT = t; return; }
    seekTo(t);
  }
  function seekBy(d) {
    const s = ALL[cur];
    if (!isVideo(s)) return;
    const v = ensureSrc(cur);
    whenReady(v, () => {
      const t = Math.min(Math.max(v.currentTime + d, startOf(s, 0) + EPS), vEnd(s, v) - 2 * EPS);
      if (playing) { const k = partAt(s, t); playFrom(k, Math.min(t, endOf(s, k, v) - EPS)); render(); }
      else seekTo(t);
    });
  }
  function toggleVideo() {
    const s = ALL[cur];
    if (!isVideo(s)) return;
    const v = ensureSrc(cur);
    if (playing) { playing = false; v.pause(); render(); return; }
    whenReady(v, () => {
      const k = partAt(s, v.currentTime);
      if (v.currentTime < endOf(s, k, v) - 0.1) playFrom(k, v.currentTime);
      else if (k + 1 < s.video.parts.length) playFrom(k + 1);
      render();
    });
  }
  function showBar() {
    document.body.classList.add("vui");
    clearTimeout(barTimer);
    barTimer = setTimeout(function hide() {
      if (drag || document.querySelector(".slide.current .scrub:hover")) { barTimer = setTimeout(hide, 800); return; }
      document.body.classList.remove("vui");
    }, 2500);
  }
  function timeAt(track, x) {
    const { t0, t1 } = span(cur), r = track.querySelector(".rail").getBoundingClientRect();
    return t0 + Math.min(Math.max((x - r.left) / r.width, 0), 1) * (t1 - t0);
  }
  function hoverTip(track, x) {
    const { s, t0, t1 } = span(cur);
    if (!(t1 > t0)) return;
    const t = timeAt(track, x), k = partAt(s, t), tip = track.querySelector(".tip");
    tip.textContent = `${k + 1} · ${s.video.parts[k][1]} · ${fmtT(t)}`;
    const w = track.offsetWidth, half = tip.offsetWidth / 2;
    tip.style.left = `${Math.min(Math.max(((t - t0) / (t1 - t0)) * w, half - 40), w - half + 40)}px`;
  }
  document.addEventListener("pointerdown", (e) => {
    const track = e.target.closest && e.target.closest(".slide.current .scrub .track");
    if (!track || PRESENTER) return;
    e.preventDefault();
    const d = e.target.closest(".dot");
    if (d) { command("vpart:" + d.dataset.part); return; }
    drag = track;
    try { track.setPointerCapture(e.pointerId); } catch (_) { /* synthetic pointer */ }
    seekLive(timeAt(track, e.clientX));
  });
  document.addEventListener("pointermove", (e) => {
    if (drag) { seekLive(timeAt(drag, e.clientX)); hoverTip(drag, e.clientX); return; }
    const track = e.target.closest && e.target.closest(".slide.current .scrub .track");
    if (track) hoverTip(track, e.clientX);
  });
  const endDrag = () => { if (drag) { drag = null; showBar(); } };
  document.addEventListener("pointerup", endDrag);
  document.addEventListener("pointercancel", endDrag);
  function showFrame(i, t) {
    const v = ensureSrc(i);
    whenReady(v, () => { v.pause(); v.currentTime = typeof t === "function" ? t(v) : t; });
  }
  function stopVideo(i) {
    const v = ALL[i] && isVideo(ALL[i]) ? vidOf(i) : null;
    if (v) v.pause();
    playing = false;
  }

  // ---------------------------------------------------------------- steps on build slides
  function applySteps(root, k) {
    root.querySelectorAll("[data-step]").forEach((e) => e.classList.toggle("hidden", k < +e.dataset.step));
    root.querySelectorAll("[data-dim]").forEach((e) => e.classList.toggle("dim", k >= +e.dataset.dim));
    root.querySelectorAll("[data-until]").forEach((e) => e.classList.toggle("hidden", k >= +e.dataset.until));
  }

  // ---------------------------------------------------------------- navigation
  function render() {
    els.forEach((e, i) => e.classList.toggle("current", i === cur));
    const s = ALL[cur], el = els[cur];
    if (!isVideo(s)) applySteps(el, step);
    else updateScrub(cur);
    const ret = el.querySelector("[data-ret]");
    if (ret) {
      ret.hidden = !trail.length;
      if (trail.length) ret.textContent = "↩ " + label(ALL[trail[trail.length - 1].i]);
    }
    el.querySelectorAll("[data-cmd=prev]").forEach((b) => { b.disabled = cur === 0 && step <= 0; });
    el.querySelectorAll("[data-cmd=next]").forEach((b) => { b.disabled = cur === ALL.length - 1 && step >= nSteps(s) - (isVideo(s) ? 1 : 0) && !playing; });
    for (let j = cur; j <= cur + 2 && j < ALL.length; j++) if (isVideo(ALL[j])) ensureSrc(j);
    els.forEach((e, i) => e.querySelectorAll("video.bg").forEach((b) => {
      if (i !== cur) { b.pause(); return; }
      const t0 = +(b.dataset.start || 0);
      if (!b.getAttribute("src")) {
        b.src = b.dataset.src;
        b.addEventListener("loadedmetadata", () => { b.currentTime = t0; }, { once: true });
        b.addEventListener("ended", () => { b.currentTime = t0; b.play().catch(() => {}); });
      }
      if (b.dataset.rate) b.playbackRate = +b.dataset.rate;
      // data-on: this loop plays only at that step of the slide, the others wait paused
      if (b.dataset.on !== undefined) {
        const on = +b.dataset.on === step;
        const card = b.closest(".sl");
        const was = card ? card.classList.contains("on") : !b.paused;
        if (card) card.classList.toggle("on", on);
        if (!on) {
          b.pause();
          // a waiting loop shows a representative frame of its scene (data-still, in seconds)
          if (b.dataset.still) {
            if (b.readyState > 0) b.currentTime = +b.dataset.still;
            else b.addEventListener("loadeddata", () => { if (b.paused) b.currentTime = +b.dataset.still; }, { once: true });
          }
          return;
        }
        if (!was && b.readyState > 0) b.currentTime = t0;     // each loop starts from its beginning
      }
      b.play().catch(() => {});
    }));
    if (history.replaceState && !PRESENTER) history.replaceState(null, "", "#/" + s.id);
    broadcast();
    if (window.TALKREVIEW) window.TALKREVIEW.render();
  }

  // enter slide i; dir = 1 forward (start), -1 backward (end state)
  function goTo(i, dir, link) {
    if (i < 0 || i >= ALL.length) return;
    if (link) trail.push({ i: cur, step: isVideo(ALL[cur]) ? -1 : step });
    stopVideo(cur);
    cur = i;
    const s = ALL[cur];
    if (isVideo(s)) {
      if (dir < 0) {
        step = s.video.parts.length - 1;
        showFrame(cur, (v) => endOf(s, step, v));
      } else if (dir === 0) {      // jump without playing: first frame of part 1
        step = -1;
        showFrame(cur, startOf(s, 0) + EPS);
      } else {
        playPart(0);
      }
    } else {
      step = dir < 0 ? nSteps(s) : 0;
    }
    render();
  }

  function next() {
    const s = ALL[cur];
    if (isVideo(s)) {
      const v = vidOf(cur);
      if (playing) { playing = false; v.pause(); v.currentTime = stopAt; render(); return; }  // complete the scene
      if (step >= 0 && v.readyState >= 1 && v.currentTime < endOf(s, step, v) - 0.1) { playFrom(step, v.currentTime); render(); return; }  // resume
      if (step + 1 < s.video.parts.length) { playPart(step + 1); render(); return; }
      goTo(cur + 1, 1); return;
    }
    if (step < nSteps(s)) { step++; render(); return; }
    goTo(cur + 1, 1);
  }

  function prev() {
    const s = ALL[cur];
    if (isVideo(s)) {
      if (step > 0) {              // back to the end of the previous scene
        stopVideo(cur);
        step -= 1;
        showFrame(cur, (v) => endOf(s, step, v));
        render(); return;
      }
      const v = vidOf(cur);
      if (step === 0 && v.readyState >= 1 && v.currentTime < endOf(s, 0, v) - 0.1) {  // paused inside the first scene
        stopVideo(cur);
        step = -1;
        showFrame(cur, startOf(s, 0) + EPS);
        render(); return;
      }
      goTo(cur - 1, -1); return;
    }
    if (step > 0) { step--; render(); return; }
    goTo(cur - 1, -1);
  }

  function back() {
    if (!trail.length) return;
    const h = trail.pop();
    stopVideo(cur);
    cur = h.i;
    const s = ALL[cur];
    if (isVideo(s)) { step = -1; showFrame(cur, startOf(s, 0) + EPS); } else step = h.step;
    render();
  }

  function go(id) {
    if (id === "back") return back();
    if (!(id in IDX)) return;
    goTo(IDX[id], 0, true);
  }

  // ---------------------------------------------------------------- overview, go-to, help, blank, full screen
  const overview = document.getElementById("overview");
  function buildOverview() {
    let html = `<h2>All slides</h2><div class="hint">Click a slide, or press Esc. Type a number and Enter to jump.</div>`;
    const groups = T.sections.map((x) => ({ name: `${x.n}. ${x.toc || x.title}`, items: MAIN.filter((s) => s.sec === x.id) }));
    groups.unshift({ name: "Opening", items: MAIN.filter((s) => !s.sec) });
    groups.push({ name: "Appendix", items: BACK });
    groups.forEach((g) => {
      if (!g.items.length) return;
      html += `<div class="grp">${esc(g.name)}</div><div class="items">` + g.items.map((s) =>
        `<button type="button" data-ov="${s.i}"><span class="k">${label(s)}</span><span>${s.title.replace(/<[^>]+>/g, "")}` +
        (isVideo(s) ? `<span class="v">▶ video · ${s.video.parts.length} scenes</span>` : "") +
        `</span></button>`).join("") + `</div>`;
    });
    overview.innerHTML = html;
  }
  function toggleOverview(open) {
    const on = open === undefined ? !overview.classList.contains("open") : open;
    if (on) {
      buildOverview();
      overview.querySelectorAll("[data-ov]").forEach((b) => b.classList.toggle("on", +b.dataset.ov === cur));
      overview.classList.add("open");
      const b = overview.querySelector(".on"); if (b) b.scrollIntoView({ block: "center" });
    } else overview.classList.remove("open");
  }
  overview.addEventListener("click", (e) => {
    const b = e.target.closest("[data-ov]");
    if (b) { toggleOverview(false); goTo(+b.dataset.ov, 0); }
  });

  const gotoBox = document.getElementById("goto");
  let typed = "", typedTimer = 0;
  function typeDigit(d) {
    typed += d; gotoBox.textContent = "Go to slide " + typed; gotoBox.classList.add("open");
    clearTimeout(typedTimer); typedTimer = setTimeout(() => { typed = ""; gotoBox.classList.remove("open"); }, 3000);
  }
  const helpBox = document.getElementById("help");
  function fullscreen() {
    if (document.fullscreenElement) { document.exitFullscreen(); return; }
    const r = document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen;
    if (r) Promise.resolve(r.call(document.documentElement)).catch(() => {});
  }
  function openPresenter() {
    window.open(location.pathname + "?presenter#/" + ALL[cur].id, "phd-defense-presenter", "width=1400,height=860");
  }

  // ---------------------------------------------------------------- input
  function command(c) {
    if (PRESENTER && chan) { chan.postMessage({ type: "cmd", cmd: c }); return; }
    if (c === "next") next(); else if (c === "prev") prev(); else if (c === "back") back();
    else if (c === "overview") toggleOverview();
    else if (c.startsWith("go:")) go(c.slice(3));
    else if (c.startsWith("idx:")) goTo(+c.slice(4), 0);
    else if (c === "vtoggle") toggleVideo();
    else if (c.startsWith("vat:")) seekLive(+c.slice(4));
    else if (c.startsWith("vby:")) seekBy(+c.slice(4));
    else if (c.startsWith("vpart:")) { if (isVideo(ALL[cur])) seekTo(startOf(ALL[cur], +c.slice(6)) + EPS); }
    else if (c === "comments") { if (window.TALKREVIEW) window.TALKREVIEW.toggle(); }
    if (/^v(toggle|by|part)/.test(c)) showBar();
  }

  document.addEventListener("click", (e) => {
    const g = e.target.closest("[data-go]");
    if (g) { e.preventDefault(); g.blur && g.blur(); command("go:" + g.dataset.go); return; }
    const c = e.target.closest("[data-cmd]");
    if (c) { c.blur(); command(c.dataset.cmd); return; }
    if (e.target.closest("[data-ret]")) { command("back"); return; }
    if (e.target.tagName === "VIDEO") command("next");
  });

  document.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.closest && e.target.closest("input, textarea, select, [contenteditable]")) return;  // typing a comment
    const k = e.key;
    if (helpBox.classList.contains("open")) { helpBox.classList.remove("open"); e.preventDefault(); return; }
    if (overview.classList.contains("open") && (k === "Escape" || k === "o" || k === "O")) { toggleOverview(false); e.preventDefault(); return; }
    if (/^[0-9]$/.test(k)) { typeDigit(k); e.preventDefault(); return; }
    if (k === "Enter" && typed) {
      const n = parseInt(typed, 10); typed = ""; gotoBox.classList.remove("open");
      if (n >= 1 && n <= MAIN.length) command("idx:" + (n - 1));
      e.preventDefault(); return;
    }
    const onBtn = e.target.closest && e.target.closest("button, a");
    if (onBtn && (k === " " || k === "Enter")) return;
    if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter", "n", "N"].includes(k)) { e.preventDefault(); command("next"); }
    else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(k)) { e.preventDefault(); command("prev"); }
    else if (k === "Home") { e.preventDefault(); command("idx:0"); }
    else if (k === "End") { e.preventDefault(); command("idx:" + (MAIN.length - 1)); }
    else if (k === "o" || k === "O") { e.preventDefault(); command("overview"); }
    else if (k === "r" || k === "R" || k === "Backspace") { e.preventDefault(); command("back"); }
    else if (k === "f" || k === "F" || k === "F5") { e.preventDefault(); fullscreen(); }
    else if (k === "b" || k === "B" || k === ".") { e.preventDefault(); document.body.classList.toggle("blank"); }
    else if ((k === "p" || k === "P") && !PRESENTER) { e.preventDefault(); openPresenter(); }
    else if (k === "h" || k === "H" || k === "?") { e.preventDefault(); helpBox.classList.add("open"); }
    else if (k === "k" || k === "K") { e.preventDefault(); command("vtoggle"); }
    else if (k === "j" || k === "J") { e.preventDefault(); command("vby:-5"); }
    else if (k === "l" || k === "L") { e.preventDefault(); command("vby:5"); }
    else if ((k === "c" || k === "C") && !PRESENTER) { e.preventDefault(); command("comments"); }
    else if (k === "Escape") { toggleOverview(false); }
  });

  // the cursor disappears when the mouse rests in full screen
  let idleTimer = 0;
  document.addEventListener("mousemove", () => {
    if (isVideo(ALL[cur]) && !PRESENTER) showBar();
    document.body.classList.remove("idle");
    clearTimeout(idleTimer);
    if (document.fullscreenElement) idleTimer = setTimeout(() => document.body.classList.add("idle"), 1800);
  });

  // ---------------------------------------------------------------- presenter sync
  function broadcast() {
    if (chan && !PRESENTER) chan.postMessage({ type: "state", i: cur, step, playing });
  }
  if (chan) chan.onmessage = (m) => {
    const d = m.data || {};
    if (!PRESENTER) {
      if (d.type === "cmd") command(d.cmd);
      else if (d.type === "hello") broadcast();
    } else if (d.type === "state") {
      presenterShow(d.i, d.step, d.playing);
    }
  };

  // presenter window
  let pvStart = Date.now();
  function fitPresenter() {
    document.querySelectorAll("#pv .frame").forEach((f) => {
      const box = f.parentElement; const s = box.clientWidth / 1920;
      f.style.transform = `scale(${s})`;
    });
  }
  function cloneSlide(i, k, into) {
    into.innerHTML = "";
    if (i < 0 || i >= ALL.length) return;
    const frame = document.createElement("div"); frame.className = "frame";
    const c = els[i].cloneNode(true); c.classList.add("current");
    frame.appendChild(c); into.appendChild(frame);
    const s = ALL[i];
    if (isVideo(s)) {
      const v = c.querySelector("video"); v.src = v.dataset.src; v.preload = "auto";
      const kk = Math.max(0, k);
      whenReady(v, () => { v.currentTime = k < 0 ? startOf(s, 0) + EPS : endOf(s, kk, v); });
    } else applySteps(c, k);
    fitTitles(c);
  }
  const fmt = (ms) => { const t = Math.max(0, Math.round(Math.abs(ms) / 1000)); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`; };
  let pvState = { i: 0, step: 0 };
  function presenterShow(i, k, isPlaying) {
    pvState = { i, step: k };
    const s = ALL[i];
    cloneSlide(i, k, document.querySelector("#pv .cur"));
    // next view: next step of this slide, or the next slide
    const more = isVideo(s) ? k + 1 < s.video.parts.length : k < nSteps(s);
    if (more && !isVideo(s)) cloneSlide(i, k + 1, document.querySelector("#pv .nxt"));
    else cloneSlide(more ? i : i + 1, more ? k + 1 : 0, document.querySelector("#pv .nxt"));
    document.querySelector("#pv .nlab").textContent = more ? (isVideo(s) ? `Next: scene ${k + 2} of this video` : "Next: next step of this slide") : "Next slide";
    let notes = `<div class="meta">${esc(fullLabel(s))}${s.time ? " · planned " + fmt(s.time * 1000) : ""}</div>`;
    if (isVideo(s)) {
      notes += `<div class="vctl"><button type="button" data-cmd="vby:-5">−5 s (J)</button><button type="button" data-cmd="vtoggle">Pause / play (K)</button><button type="button" data-cmd="vby:5">+5 s (L)</button></div>`;
      notes += `<div class="scenes">${s.video.parts.map((p, j) => `<button type="button" data-cmd="vpart:${j}" class="${j === k ? "on" : ""}">${j + 1}. ${esc(p[1])}${j === k && isPlaying ? " (playing)" : ""}</button>`).join("")}</div>`;
    }
    notes += s.notes ? `<p>${esc(s.notes)}</p>` : "";
    document.querySelector("#pv .notes").innerHTML = notes;
    tick();
    fitPresenter();
  }
  function tick() {
    if (!PRESENTER) return;
    const el = Date.now() - pvStart;
    const planned = MAIN.slice(0, Math.min(pvState.i, MAIN.length)).reduce((a, s) => a + (s.time || 0), 0) * 1000;
    const total = MAIN.reduce((a, s) => a + (s.time || 0), 0) * 1000;
    const d = el - planned;
    document.querySelector("#pv .clock").textContent = fmt(el);
    const p = document.querySelector("#pv .plan");
    p.innerHTML = `Planned at this slide ${fmt(planned)} · <span class="${d > 30000 ? "late" : (d < -30000 ? "early" : "")}">${d >= 0 ? "+" : "−"}${fmt(d)}</span> · talk ${fmt(total)} · now ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }
  function initPresenter() {
    document.body.classList.add("presenter");
    const pv = document.getElementById("pv");
    pv.innerHTML = `<div class="bar"><span class="clock">0:00</span><span class="plan"></span><span style="flex:1"></span>` +
      `<button type="button" data-pv="reset">Restart timer</button><button type="button" data-cmd="prev">← Previous</button><button type="button" data-cmd="next">Next →</button></div>` +
      `<div class="curwrap"><div class="lab">Current</div><div class="cur"></div></div>` +
      `<div class="right"><div class="lab nlab">Next</div><div class="nxt"></div><div class="notes"></div></div>`;
    pv.querySelector("[data-pv=reset]").addEventListener("click", () => { pvStart = Date.now(); tick(); });
    setInterval(tick, 1000);
    window.addEventListener("resize", fitPresenter);
    if (chan) chan.postMessage({ type: "hello" });
    else document.querySelector("#pv .notes").textContent = "This browser cannot link the two windows.";
  }

  // ---------------------------------------------------------------- review mode hooks (review.js)
  function gotoAt(id, k, t) {
    if (!(id in IDX)) return;
    const i = IDX[id], s = ALL[i];
    if (i !== cur) goTo(i, 0);
    if (isVideo(s)) {
      if (typeof t === "number") { stopVideo(cur); step = partAt(s, t); showFrame(cur, t); render(); }
    } else { step = Math.max(0, Math.min(k || 0, nSteps(s))); render(); }
  }
  window.TALKAPI = {
    state: () => { const s = ALL[cur]; return { s, step, label: label(s), t: isVideo(s) && vidOf(cur) ? vidOf(cur).currentTime : null, steps: nSteps(s) }; },
    slide: (id) => (id in IDX ? ALL[IDX[id]] : null),
    label: (id) => (id in IDX ? label(ALL[IDX[id]]) : "?"),
    order: (id) => (id in IDX ? IDX[id] : 1e9),
    gotoAt, fit, next: () => command("next"), prev: () => command("prev"), presenter: PRESENTER,
  };

  // ---------------------------------------------------------------- start
  const start = () => {
    fitTitles(stage);
    fit();
    const id = decodeURIComponent((location.hash || "").replace(/^#\/?/, ""));
    if (PRESENTER) { initPresenter(); presenterShow(id in IDX ? IDX[id] : 0, 0, false); return; }
    goTo(id in IDX ? IDX[id] : 0, 0);
  };
  window.addEventListener("hashchange", () => {
    const id = decodeURIComponent((location.hash || "").replace(/^#\/?/, ""));
    if (id in IDX && IDX[id] !== cur) goTo(IDX[id], 0);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start); else start();
})();
