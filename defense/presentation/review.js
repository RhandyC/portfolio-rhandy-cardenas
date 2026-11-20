/* Review mode of the PhD defense presentation, for the supervisors.
   - C or the comment button: click on a slide to comment a point, drag to circle an area.
   - The comments are listed on the right, for this slide or for all slides, and kept in this browser.
   - "Send to Rhandy" copies them and opens an email; the email ends with a data block that
     "Import" reads back, so that every comment reappears at its place on the slides.
   Nothing is sent anywhere without the reviewer clicking Send. */
(function () {
  "use strict";
  const API = window.TALKAPI;
  if (!API || API.presenter) return;
  const TO = "rhandy.cardenas-curo@hds.utc.fr";
  const KEY = "defense-comments-v1", NAME = "defense-comments-name", HINT = "defense-comments-hint";
  const BEGIN = "----- BEGIN DEFENSE COMMENTS -----", END = "----- END DEFENSE COMMENTS -----";
  const W = 1920, H = 1004;                 // comments live above the footer, in canvas units
  const ls = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (_) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (_) { /* private window */ } },
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const plain = (h) => String(h).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  let list = [];
  try { list = JSON.parse(ls.get(KEY, "[]")) || []; } catch (_) { list = []; }
  const save = () => ls.set(KEY, JSON.stringify(list));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  let on = false, tab = "slide", selected = null, draft = null, msg = "";

  // ---------------------------------------------------------------- elements
  const stage = document.getElementById("stage");
  const layer = document.createElement("div"); layer.id = "cmt-layer"; stage.appendChild(layer);
  const panel = document.createElement("aside"); panel.id = "cmt-panel"; panel.setAttribute("aria-label", "Comments"); document.body.appendChild(panel);
  const pop = document.createElement("div"); pop.id = "cmt-pop"; pop.setAttribute("role", "dialog"); document.body.appendChild(pop);

  const here = () => API.state();
  const ofSlide = (id) => list.filter((c) => c.slide === id).sort((a, b) => a.at.localeCompare(b.at));
  const numberOf = (c) => ofSlide(c.slide).indexOf(c) + 1;
  const sorted = () => list.slice().sort((a, b) => (API.order(a.slide) - API.order(b.slide)) || a.at.localeCompare(b.at));
  const where = (c) => {
    const cx = c.x + (c.w || 0) / 2, cy = c.y + (c.h || 0) / 2;
    return `${cy < 360 ? "top" : cy < 700 ? "middle" : "bottom"} ${cx < 640 ? "left" : cx < 1280 ? "center" : "right"}`;
  };
  const stepTxt = (c) => (c.t != null ? `at ${Math.floor(c.t / 60)}:${String(Math.floor(c.t % 60)).padStart(2, "0")} of the video` : (c.steps ? `step ${c.step + 1} of ${c.steps + 1}` : ""));
  const when = (iso) => { const d = new Date(iso); return isNaN(d) ? "" : d.toLocaleString([], { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }); };

  // ---------------------------------------------------------------- marks on the slide
  function drawMarks() {
    const st = here();
    const cs = ofSlide(st.s.id);
    layer.innerHTML = cs.map((c, j) => {
      const sel = c.id === selected ? " sel" : "";
      const later = c.t == null && c.step > st.step ? " later" : "";
      if (c.kind === "area") {
        const px = c.x + c.w / 2 - (c.w / 2) * 0.72, py = c.y + c.h / 2 - (c.h / 2) * 0.72;
        return `<div class="cm-area${sel}${later}" style="left:${c.x}px;top:${c.y}px;width:${c.w}px;height:${c.h}px"></div>` +
          `<button type="button" class="cm-pin${sel}${later}" data-cid="${c.id}" style="left:${px}px;top:${py}px" title="${esc(c.author)}: ${esc(c.text)}">${j + 1}</button>`;
      }
      return `<button type="button" class="cm-pin${sel}${later}" data-cid="${c.id}" style="left:${c.x}px;top:${c.y}px" title="${esc(c.author)}: ${esc(c.text)}">${j + 1}</button>`;
    }).join("") + (draft ? draftHTML() : "");
    const n = cs.length;
    document.querySelectorAll(".slide.current .cmtbtn .cnt").forEach((e) => { e.textContent = n ? String(n) : ""; });
  }
  function draftHTML() {
    const d = draft;
    if (d.kind === "area") return `<div class="cm-area draft" style="left:${d.x}px;top:${d.y}px;width:${d.w}px;height:${d.h}px"></div>`;
    return `<span class="cm-pin draft" style="left:${d.x}px;top:${d.y}px">+</span>`;
  }

  // ---------------------------------------------------------------- panel
  function card(c, all) {
    const s = API.slide(c.slide);
    const head = all ? `<b>${esc(API.label(c.slide))} · ${esc(plain(s ? s.title : c.title || c.slide))}</b>` : `<b>${c.kind === "area" ? "Area" : "Point"}</b>`;
    return `<div class="cc${c.id === selected ? " sel" : ""}" data-cid="${c.id}" tabindex="0">` +
      `<div class="cc-h"><span class="n">${numberOf(c)}</span>${head}<span class="st">${esc(stepTxt(c))}</span></div>` +
      `<div class="cc-t">${esc(c.text).replace(/\n/g, "<br>")}</div>` +
      `<div class="cc-m"><span>${esc(c.author || "Anonymous")} · ${esc(when(c.at))}</span><span><button type="button" data-x="edit">Edit</button><button type="button" data-x="del">Delete</button></span></div></div>`;
  }
  function drawPanel() {
    const st = here(), mine = ofSlide(st.s.id), all = sorted();
    const items = tab === "slide" ? mine : all;
    panel.innerHTML =
      `<div class="cp-h"><div><b>Comments</b><span class="sub">${esc(st.label)} · ${esc(plain(st.s.title))}</span></div>` +
      `<div class="cp-nav"><button type="button" data-x="prev" title="Previous (←)">‹</button><button type="button" data-x="next" title="Next (→)">›</button>` +
      `<button type="button" data-x="close" title="Close the comment mode (C)">✕</button></div></div>` +
      `<div class="cp-help"><b>Click</b> on the slide to comment a point, or <b>drag</b> to circle an area. Use ← → to move through the slides and their steps.</div>` +
      `<label class="cp-name">Your name <input type="text" data-x="name" value="${esc(ls.get(NAME, ""))}" placeholder="e.g. Philippe" autocomplete="name"></label>` +
      `<div class="cp-tabs"><button type="button" data-tab="slide" class="${tab === "slide" ? "on" : ""}">This slide (${mine.length})</button>` +
      `<button type="button" data-tab="all" class="${tab === "all" ? "on" : ""}">All slides (${all.length})</button></div>` +
      `<div class="cp-list">${items.length ? items.map((c) => card(c, tab === "all")).join("") :
        `<p class="cp-empty">${tab === "slide" ? "No comment on this slide yet." : "No comment yet."}</p>`}</div>` +
      `<div class="cp-f"><button type="button" class="pri" data-x="send"${list.length ? "" : " disabled"}>Send to Rhandy (${list.length})</button>` +
      `<div class="row"><button type="button" data-x="dl"${list.length ? "" : " disabled"}>Download</button><button type="button" data-x="imp">Import</button></div>` +
      `<div class="cp-msg">${msg}</div><p class="cp-note">Comments stay in this browser until you send them.</p></div>`;
  }

  function render() {
    if (!stage.contains(layer)) stage.appendChild(layer);
    drawMarks();
    if (on) drawPanel();
  }

  // ---------------------------------------------------------------- mode
  function toggle(force) {
    on = force === undefined ? !on : force;
    document.body.classList.toggle("cmt-on", on);
    document.body.classList.toggle("cmt-open", on);
    if (!on) closePop();
    msg = "";
    API.fit();
    render();
  }

  // ---------------------------------------------------------------- drawing on the slide
  const toCanvas = (e) => {
    const r = stage.getBoundingClientRect();
    return { x: Math.min(Math.max((e.clientX - r.left) * 1920 / r.width, 0), W), y: Math.min(Math.max((e.clientY - r.top) * 1080 / r.height, 0), H) };
  };
  let down = null;
  layer.addEventListener("pointerdown", (e) => {
    if (!on || e.button > 0) return;
    const pin = e.target.closest(".cm-pin[data-cid]");
    if (pin) { e.preventDefault(); select(pin.dataset.cid, true); return; }
    if (pop.classList.contains("open")) { closePop(); return; }
    e.preventDefault();
    down = toCanvas(e);
    draft = { kind: "point", x: down.x, y: down.y };
    try { layer.setPointerCapture(e.pointerId); } catch (_) { /* synthetic pointer */ }
    drawMarks();
  });
  layer.addEventListener("pointermove", (e) => {
    if (!down) return;
    const p = toCanvas(e);
    if (Math.abs(p.x - down.x) + Math.abs(p.y - down.y) < 14) { draft = { kind: "point", x: down.x, y: down.y }; }
    else draft = { kind: "area", x: Math.min(p.x, down.x), y: Math.min(p.y, down.y), w: Math.abs(p.x - down.x), h: Math.abs(p.y - down.y) };
    drawMarks();
  });
  const up = () => {
    if (!down) return;
    down = null;
    ["x", "y", "w", "h"].forEach((k) => { if (draft[k] != null) draft[k] = Math.round(draft[k]); });
    openPop(null);
  };
  layer.addEventListener("pointerup", up);
  layer.addEventListener("pointercancel", () => { down = null; draft = null; drawMarks(); });

  // ---------------------------------------------------------------- editor
  function anchorOf(c) {
    const r = stage.getBoundingClientRect(), k = r.width / 1920;
    const x = c.kind === "area" ? c.x + c.w : c.x, y = c.kind === "area" ? c.y : c.y;
    return { x: r.left + x * k, y: r.top + y * k };
  }
  function openPop(c) {
    const it = c || draft;
    if (!it) return;
    const name = ls.get(NAME, "");
    pop.dataset.cid = c ? c.id : "";
    pop.innerHTML = `<div class="pp-h">${c ? "Edit comment" : (it.kind === "area" ? "Comment on this area" : "Comment on this point")}</div>` +
      (name ? "" : `<input type="text" data-x="pname" placeholder="Your name" autocomplete="name">`) +
      `<textarea data-x="text" rows="4" placeholder="Your comment…">${c ? esc(c.text) : ""}</textarea>` +
      `<div class="pp-f"><span class="hint">Ctrl + Enter to save</span>${c ? `<button type="button" data-x="pdel" class="ghost">Delete</button>` : ""}` +
      `<button type="button" data-x="pcancel" class="ghost">Cancel</button><button type="button" data-x="psave" class="pri">Save</button></div>`;
    pop.classList.add("open");
    const a = anchorOf(it), w = 340;
    let left = a.x + 14, top = a.y;
    if (left + w > window.innerWidth - (document.body.classList.contains("cmt-open") && window.innerWidth > 900 ? 392 : 12)) left = Math.max(12, a.x - w - 14);
    top = Math.min(Math.max(12, top), window.innerHeight - 250);
    pop.style.left = left + "px"; pop.style.top = top + "px";
    const f = pop.querySelector(name ? "textarea" : "[data-x=pname]"); setTimeout(() => f && f.focus(), 0);
  }
  function closePop() { pop.classList.remove("open"); draft = null; drawMarks(); }
  function savePop() {
    const text = pop.querySelector("textarea").value.trim();
    const pn = pop.querySelector("[data-x=pname]");
    if (pn) { if (!pn.value.trim()) { pn.focus(); pn.classList.add("bad"); return; } ls.set(NAME, pn.value.trim()); }
    if (!text) { pop.querySelector("textarea").focus(); return; }
    const id = pop.dataset.cid;
    if (id) {
      const c = list.find((x) => x.id === id); if (c) { c.text = text; c.edited = new Date().toISOString(); }
    } else if (draft) {
      const st = here();
      const c = Object.assign({ id: uid(), slide: st.s.id, title: plain(st.s.title), step: st.t == null ? st.step : null, steps: st.t == null ? st.steps : 0,
        t: st.t == null ? null : Math.round(st.t * 10) / 10, text, author: ls.get(NAME, "") || "Anonymous", at: new Date().toISOString() }, draft);
      list.push(c); selected = c.id;
    }
    save(); msg = "";
    pop.classList.remove("open"); draft = null;
    render();
  }
  function remove(id) {
    if (!window.confirm("Delete this comment?")) return;
    list = list.filter((c) => c.id !== id); if (selected === id) selected = null;
    save(); closePop(); render();
  }
  function select(id, edit) {
    const c = list.find((x) => x.id === id); if (!c) return;
    selected = id;
    if (c.slide !== here().s.id || (c.t == null && c.step !== here().step)) API.gotoAt(c.slide, c.step, c.t);
    render();
    if (edit) openPop(c);
    const el = panel.querySelector(`.cc[data-cid="${id}"]`); if (el) el.scrollIntoView({ block: "nearest" });
  }

  pop.addEventListener("click", (e) => {
    const x = e.target.closest("[data-x]"); if (!x) return;
    if (x.dataset.x === "psave") savePop();
    else if (x.dataset.x === "pcancel") closePop();
    else if (x.dataset.x === "pdel") remove(pop.dataset.cid);
  });
  pop.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); savePop(); }
    else if (e.key === "Escape") { e.preventDefault(); closePop(); }
  });

  // ---------------------------------------------------------------- sending, downloading, importing
  const toB64 = (s) => btoa(unescape(encodeURIComponent(s)));
  const fromB64 = (s) => decodeURIComponent(escape(atob(s)));
  function report() {
    const who = ls.get(NAME, "") || "a reviewer";
    let t = `Comments on the PhD defense presentation, from ${who} (${new Date().toLocaleDateString()})\n${location.origin}${location.pathname}\n`;
    let last = null;
    sorted().forEach((c) => {
      if (c.slide !== last) { t += `\n■ Slide ${API.label(c.slide)} · ${plain((API.slide(c.slide) || {}).title || c.title)}\n`; last = c.slide; }
      t += `  ${numberOf(c)}. [${c.kind === "area" ? "area" : "point"}, ${where(c)}${stepTxt(c) ? ", " + stepTxt(c) : ""}] ${c.text.replace(/\n/g, "\n     ")}\n`;
    });
    const data = toB64(JSON.stringify({ v: 1, comments: list })).replace(/(.{76})/g, "$1\n");
    return t + `\nTo place these comments on the slides, open the presentation, press C, then Import, and paste this email.\n${BEGIN}\n${data}\n${END}\n`;
  }
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).then(() => true, () => fallbackCopy(text));
    return Promise.resolve(fallbackCopy(text));
  }
  function fallbackCopy(text) {
    const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    let ok = false; try { ok = document.execCommand("copy"); } catch (_) { ok = false; }
    ta.remove(); return ok;
  }
  function send() {
    const text = report(), subject = "Comments on the PhD defense presentation";
    copy(text).then((ok) => {
      const fits = encodeURIComponent(text).length < 1800;
      const body = fits ? text : (ok ? "The comments are in the clipboard: paste them here (Ctrl + V).\n\n" : "Please paste the comments here.\n\n");
      msg = ok ? `Copied. Your email app opens with a message to Rhandy${fits ? "" : ": paste the comments into it (Ctrl + V)"}. If it does not open, paste them into an email to <b>${esc(TO)}</b>.`
        : `Your browser blocked the copy: use Download, and attach the file to an email to <b>${esc(TO)}</b>.`;
      drawPanel();
      window.location.href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
  function download() {
    const blob = new Blob([JSON.stringify({ v: 1, comments: list }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `defense-comments-${(ls.get(NAME, "") || "reviewer").replace(/[^\w-]+/g, "_")}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  function parseImport(text) {
    let json = null;
    const i = text.indexOf(BEGIN), j = text.indexOf(END);
    if (i >= 0 && j > i) json = JSON.parse(fromB64(text.slice(i + BEGIN.length, j).replace(/[^A-Za-z0-9+/=]/g, "")));
    else json = JSON.parse(text);
    const arr = Array.isArray(json) ? json : (json && json.comments) || [];
    let added = 0;
    arr.forEach((c) => {
      if (!c || !c.id || !c.slide || typeof c.text !== "string" || list.some((x) => x.id === c.id)) return;
      list.push({ id: String(c.id), slide: String(c.slide), title: String(c.title || ""), step: c.step == null ? null : +c.step, steps: +c.steps || 0,
        t: c.t == null ? null : +c.t, kind: c.kind === "area" ? "area" : "point", x: +c.x || 0, y: +c.y || 0, w: +c.w || 0, h: +c.h || 0,
        text: c.text, author: String(c.author || "Anonymous"), at: String(c.at || new Date().toISOString()) });
      added++;
    });
    save(); return added;
  }
  function openImport() {
    pop.dataset.cid = "";
    pop.innerHTML = `<div class="pp-h">Import comments</div><p class="pp-p">Paste an email sent from this page, or choose a downloaded file.</p>` +
      `<textarea data-x="itext" rows="6" placeholder="Paste here…"></textarea><input type="file" data-x="ifile" accept=".json,application/json,text/plain">` +
      `<div class="pp-f"><button type="button" data-x="pcancel" class="ghost">Cancel</button><button type="button" data-x="iadd" class="pri">Import</button></div>`;
    pop.classList.add("open");
    pop.style.left = Math.max(12, window.innerWidth - 392 - 360) + "px"; pop.style.top = "120px";
    const doImport = (text) => {
      try { const n = parseImport(text); msg = `${n} comment${n === 1 ? "" : "s"} imported.`; tab = "all"; pop.classList.remove("open"); render(); }
      catch (_) { msg = "Nothing to import: paste the whole email, including the data block."; drawPanel(); }
    };
    pop.querySelector("[data-x=iadd]").onclick = () => doImport(pop.querySelector("[data-x=itext]").value);
    pop.querySelector("[data-x=ifile]").onchange = (e) => { const f = e.target.files[0]; if (f) f.text().then(doImport); };
  }

  // ---------------------------------------------------------------- panel events
  panel.addEventListener("click", (e) => {
    const t = e.target.closest("[data-tab]"); if (t) { tab = t.dataset.tab; drawPanel(); return; }
    const x = e.target.closest("[data-x]");
    const cc = e.target.closest(".cc[data-cid]");
    if (x) {
      const a = x.dataset.x;
      if (a === "close") toggle(false);
      else if (a === "prev") API.prev();
      else if (a === "next") API.next();
      else if (a === "send") send();
      else if (a === "dl") download();
      else if (a === "imp") openImport();
      else if (a === "edit" && cc) select(cc.dataset.cid, true);
      else if (a === "del" && cc) remove(cc.dataset.cid);
      return;
    }
    if (cc) select(cc.dataset.cid, false);
  });
  panel.addEventListener("change", (e) => { if (e.target.dataset.x === "name") ls.set(NAME, e.target.value.trim()); });
  panel.addEventListener("input", (e) => { if (e.target.dataset.x === "name") ls.set(NAME, e.target.value.trim()); });
  window.addEventListener("resize", () => { if (pop.classList.contains("open")) closePop(); });

  // ---------------------------------------------------------------- invitation for reviewers (?review in the link)
  if (/[?&]review\b/.test(location.search) && ls.get(HINT, "") !== "1") {
    const h = document.createElement("div"); h.id = "cmt-hint";
    h.innerHTML = `<span class="tx"><b>Review mode.</b> Click the comment button at the bottom right, or press <kbd>C</kbd>, to comment any slide: click a point, or drag to circle an area.</span><button type="button">Start commenting</button><button type="button" class="ghost">Later</button>`;
    document.body.appendChild(h);
    h.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      ls.set(HINT, "1"); h.remove();
      if (!b.classList.contains("ghost")) toggle(true);
    });
  }

  window.TALKREVIEW = { toggle, render, report };
  render();
})();
