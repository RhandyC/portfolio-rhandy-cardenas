/* Content of the PhD defense, in the order of the manuscript: introduction, fundamentals and state
   of the art, the method (C1 to C3, each illustrated by its animations), the validation (C4), conclusion.
   type: title | agenda | outline | section | content (default) | video | bridge | thanks | bindex
   cpc (sections): which half of 'capability precedes choice' the part answers
   ref: section of the manuscript · c: contributions shown in the header
   time: planned seconds (presenter view) · backups: links to appendix slides
   video.parts: [start (s), title]; a part stops on the frame before the next start. */
(function () {
  "use strict";
  const A = "../../videos/defense/";        // animations of the defense page
  const V = "video/";                       // use-case videos
  const F = "fig/";
  const fig = (src, alt, h) => `<div class="fig" style="${h ? `height:${h}px` : "flex:1 1 0"}"><img src="${F}${src}" alt="${alt}"></div>`;
  const go = (id, text) => `<a class="go" data-go="${id}" href="#/${id}">${text}</a>`;
  const Uens = (s = "S") => `<i>U</i><sub>ens</sub>(<i>${s}</i>)`;
  const Aens = (s = "s") => `<i>A</i><sub>ens</sub>(<i>${s}</i>)`;

  // Structure of the defense: the order of the manuscript. The introduction (chapter 1), the
  // fundamentals and the state of the art (part I), the method (part II: C1 in chapter 4, C2 and C3
  // in chapter 5, each illustrated by its animations), the validation (part III, chapter 6, C4),
  // and the conclusion (chapter 7).
  // part: group shown in the agenda and on the section pages · ag: what the agenda says the section covers
  // ch: the contribution · where: the chapters and sections of the manuscript it covers
  const sections = [
    { id: "intro", part: "Chapter 1", short: "Intro", n: 1, page: "sec-intro", kicker: "Introduction", title: "Introduction", toc: "Introduction",
      ch: "Introduction", where: "Chapter 1",
      sub: "Why the operational design domain must enter the decision", goal: "The motivation, the problem, the research question and the four contributions",
      ag: "The ODD and who is responsible, the guiding principle, the problem and the research question, the four contributions" },
    { id: "sota", part: "Part I · Chapters 2 – 3", short: "SotA", n: 2, page: "sec-sota", kicker: "Fundamentals and state of the art", title: "What exists today?", toc: "Fundamentals and state of the art",
      ch: "Fundamentals and state of the art", where: "Chapters 2 and 3",
      sub: "Awareness, the ODD and the capability of the vehicle; decision-making for driving", goal: "What the vehicle must know about itself, how capability is assessed and tactical decisions are taken today, and what is missing",
      ag: "Self- and context-awareness, capability assessment, decision levels, tactical decision-making, the four gaps" },
    { id: "c1", part: "Part II · Chapters 4 – 5", cpc: "cap", short: "C1", n: 3, page: "sec-c1", kicker: "C1 · Decisional capability", title: "What can the vehicle still ensure?", toc: "C1 · What can the vehicle still ensure?",
      ch: "Contribution 1", where: "Chapter 4", c: ["C1"], pubs: ["IFAC IAV 2025"],
      sub: "The ODD-aptive architecture and the Maneuver Capability Estimator (MCE)", goal: "Which maneuvers are ensured, in the current and in the predicted states",
      ag: "The ODD-aptive architecture, ensured maneuvers and levels of operability, the skills of a maneuver, the strategic margin" },
    { id: "c2", part: "Part II · Chapters 4 – 5", cpc: "cho", short: "C2", n: 4, page: "sec-c2", kicker: "C2 · ODD-constrained MDP", title: "How to decide without losing the fallback?", toc: "C2 · How to decide without losing the fallback?",
      ch: "Contribution 2", where: "Chapter 5 (§5.2) · validated in §6.3 – §6.4", c: ["C2"], pubs: ["IEEE IV 2025"],
      sub: "The ODD-constrained MDP", goal: "Decisions only among ensured maneuvers, over the whole planning horizon",
      ag: "The ODD-MDP: formalism, resolution on the tree of ensured states, reward, safe states" },
    { id: "c3", part: "Part II · Chapters 4 – 5", cpc: "cho", short: "C3", n: 5, page: "sec-c3", kicker: "C3 · ODD-constrained POMDP", title: "And when the vehicle is uncertain?", toc: "C3 · And when the vehicle is uncertain?",
      ch: "Contribution 3", where: "Chapter 5 (§5.3) · validated in §6.5", c: ["C3"],
      sub: "The ODD-constrained POMDP", goal: "Capability before choice, under uncertain states, forecasts and intentions",
      ag: "The ODD-POMDP: sources of uncertainty, belief, ensured actions on the belief, Monte Carlo planning" },
    { id: "c4", part: "Part III · Chapter 6", cpc: "cap cho", short: "C4", n: 6, page: "sec-c4", kicker: "C4 · Validation", title: "Does it hold, in simulation and on a real vehicle?", toc: "C4 · Validation, in simulation and on a real vehicle",
      ch: "Contribution 4", where: "Chapter 6", c: ["C4"],
      sub: "Validation, from IPG CarMaker to a Mégane E-Tech prototype", goal: "The nominal behavior, the fail-operational behavior in fog and before a highway exit, the results under uncertainty, and the same planner, unchanged, on a real vehicle",
      ag: "The platform, nominal behavior and overtaking on the prototype, fog and highway exit, results under uncertainty" },
    { id: "concl", part: "Chapter 7", cpc: "cap cho", short: "Conclusion", n: 7, page: "sec-concl", kicker: "Conclusion", title: "Conclusion and perspectives", toc: "Conclusion and perspectives",
      ch: "Conclusion", where: "Chapter 7",
      sub: "Contributions, evidence, limitations and future directions",
      ag: "Each contribution and the evidence behind it, future directions" },
  ];

  const jury = [
    ["Reviewer", "Lydie Nouvelière", "Université Jean Monnet, Saint-Étienne"],
    ["Reviewer", "Fawzi Nashashibi", "Inria, Paris"],
    ["Examiner", "Jean-Christophe Popieul", "Université Polytechnique Hauts-de-France"],
    ["Examiner", "David Filliat", "ENSTA, Institut Polytechnique de Paris"],
    ["Examiner", "Philippe Bonnifait", "Université de technologie de Compiègne"],
    ["Thesis director", "Lounis Adouane", "Université de technologie de Compiègne"],
    ["Co-supervisor", "Clément Zinoune", "Ampere, Renault Group"],
    ["Co-supervisor", "Mohamed-Amir Benloucif", "Ampere, Renault Group"],
  ];

  const slides = [
    // ================================================================ opening
    { id: "title", type: "title", title: "Fail-operational decision-making for intelligent vehicles", time: 30,
      notes: "Good morning. Thank you to the members of the jury for being here, and in particular to the two reviewers. This thesis was carried out under a CIFRE agreement between Heudiasyc at UTC and Ampere, Renault Group. Its question: how can a vehicle keep taking correct decisions while its operating conditions change.",
      html: `<div class="ttl"><div class="left"><div class="lbl">Doctoral thesis defense</div>
        <h1>Fail-operational decision-making for intelligent vehicles</h1><div class="rule"></div>
        <div class="author">Rhandy Cardenas</div>
        <div class="aff">Université de technologie de Compiègne · Heudiasyc, UMR CNRS 7253<br>Ampere, Renault Group</div>
        <div class="date">1 December 2026</div>
        <div class="logos"><img src="${F}logo_utc.png" alt="Université de technologie de Compiègne"><img src="${F}logo_heudiasyc.png" alt="Heudiasyc"></div></div>
        <div class="jury"><h2>JURY</h2>${jury.map(([r, n, a]) => `<div class="p"><div class="r">${r}</div><div><div class="n">${n}</div><div class="a">${a}</div></div></div>`).join("")}</div></div>` },

    { id: "agenda", type: "agenda", kicker: "Outline of the defense", time: 40,
      title: "Agenda",
      notes: "The defense follows the order of the manuscript. After the introduction come the foundations and the state of the art. Then the ODD-aptive architecture and its method: first the capability of the vehicle, then the choice, with an MDP and then a POMDP; each step is illustrated with its animations. The validation, in simulation and on the prototype vehicle, comes at the end, before the conclusion. Each line links to its part." },

    // ================================================================ 1. introduction (chapter 1): the news, the ODD, who is responsible, the changing context, the principle, the problem, the aim, the contributions
    { id: "sec-intro", type: "section", sec: "intro", dark: true, title: "Introduction", time: 10 },

    { id: "news", sec: "intro", kicker: "In the news", ref: "§2.3", time: 60,
      title: "No driver on board: the vehicle alone must judge its own limits",
      notes: "Two scenes from this year. In Phoenix, in January, a robotaxi stops on the light rail tracks; its passenger gets out as a train approaches, and the car keeps driving on the tracks. In Atlanta, in May, during a flash flood, an empty robotaxi drives into a flooded street. Two days later the operator suspends its service in six cities. A month earlier, after a similar case in San Antonio, its recall filing said that the vehicle had detected the flood water, and proceeded at reduced speed. These incidents may have several causes. But they show the point of this thesis: perceiving the conditions is not enough; with no driver on board, the vehicle itself must know what it can still do there.",
      html: `<div class="g2 grow">
        ${[["news_lightrail_phoenix", "Phoenix · 7 January 2026", "A robotaxi stops on the light rail tracks. Its passenger gets out as a train approaches, and the car keeps driving on the tracks.", "Video: Luis_Central_Tires, via 12 News"],
           ["news_flood_atlanta", "Atlanta · 20 May 2026", "During a flash flood, an empty robotaxi drives into a flooded street, water almost up to its headlights. Two days later, the service is suspended in six cities.", "Video: @_SirLuke, via Atlanta News First"]]
          .map(([v, d, t, c]) => `<div class="card col news">
            <video class="bg loop" muted playsinline preload="none" poster="${V}${v}.jpg" data-src="${V}${v}.mp4" aria-label="${t}"></video>
            <div class="row" style="align-items:baseline;justify-content:space-between;gap:12px"><b class="navyt" style="font-size:25px">${d}</b><span class="xs mute">${c}</span></div>
            <p class="small" style="margin:0">${t}</p></div>`).join("")}
        </div>
        <div class="card navy" style="padding:22px 36px"><div class="row" style="align-items:center;gap:34px">
          <div style="flex:1"><div class="quote" style="color:#fff;font-size:28px">The vehicle “detected potentially untraversable flood water and proceeded at reduced speed.”</div>
            <p class="xs" style="margin:8px 0 0 38px;color:#c7d3e3">Waymo, safety recall of 3,791 robotaxis filed with NHTSA, May 2026, after a flooded road in San Antonio</p></div>
          <div style="flex:0 0 560px;font-size:28px;font-weight:600;line-height:1.4">Perceiving the conditions was not enough: the vehicle had to know <span style="color:var(--amber)">what it could still do</span> there.</div></div></div>` },

    { id: "odd", sec: "intro", kicker: "Motivation · what is the ODD?", ref: "§2.2", time: 75, steps: 2,
      title: "The Operational Design Domain: where a function is designed to operate",
      notes: "Before talking about levels and responsibility, the key notion. SAE J3016 defines the Operational Design Domain as the operating conditions under which a driving automation system, or a feature of it, is specifically designed to function: environmental, geographical and time-of-day restrictions, and the presence or absence of some traffic or roadway characteristics. What is it for? The designer knows the performance of the system and states the contexts in which it works correctly and safely. Outside the ODD, the system is beyond its operational limits. For instance, an ACC may be designed for highways in free-flowing traffic, and not validated with two-wheelers or in heavy rain. (1) How is it structured? As a hierarchical taxonomy: here the six top levels proposed by the NHTSA, each broken down into sublevels; ISO 34503 sets the requirements for such a taxonomy. (2) A deployed example: Mercedes-Benz Drive Pilot, the first Level 3 system approved in Europe, describes its ODD as a driving scene with five conditions.",
      html: `<div class="row grow">
        <div class="col grow" style="flex:1 1 0">
          <div class="card" style="padding:28px 36px"><div class="quote" style="font-size:27px">“Operating conditions under which a given driving automation system or feature thereof is specifically designed to function, including, but not limited to, environmental, geographical, and time-of-day restrictions, and/or the requisite presence or absence of certain traffic or roadway characteristics.”</div>
            <p class="xs mute" style="margin:10px 0 0 38px">SAE J3016, definition of the Operational Design Domain (ODD)</p></div>
          <div class="card grow"><h3>What is it for?</h3><ul class="list" style="gap:22px;font-size:28px">
            <li>The designer states the conditions in which the function was <b>designed and validated</b></li>
            <li>Outside its ODD, the system is <b>beyond its operational limits</b></li>
            <li>Example: an ACC designed for highways in free-flowing traffic, not validated in heavy rain or with two-wheelers</li></ul></div>
        </div>
        <div class="col grow" style="flex:1.05 1 0">
          <div class="card" data-step="1"><h3 style="margin-bottom:12px">How is it structured? A hierarchical taxonomy</h3>
            <div class="oddtax">
              <div><b>Physical infrastructure</b><span>road types, surfaces, edges, geometry</span></div>
              <div><b>Operational constraints</b><span>speed limit, traffic conditions</span></div>
              <div><b>Objects</b><span>signage, road users, obstacles</span></div>
              <div><b>Connectivity</b><span>V2X, fleet management, infrastructure sensors</span></div>
              <div><b>Environmental conditions</b><span>weather, illumination, particulate matter</span></div>
              <div><b>Zones</b><span>geofencing, school and work zones, regions</span></div>
            </div><p class="xs mute" style="margin:10px 0 0">Top levels proposed by the NHTSA (2018), each broken down into sublevels · requirements in ISO 34503 (2023)</p></div>
          <div class="card row grow" data-step="2" style="gap:22px;align-items:center;padding:18px 22px">
            <img src="${F}odd_mercedes.jpg" alt="Mercedes-Benz Drive Pilot ODD shown as a driving scene" style="height:300px;border-radius:10px">
            <div><h4 style="margin-bottom:8px">Deployed example: Mercedes-Benz Drive Pilot</h4><p class="small" style="margin:0">The first Level 3 system approved in Europe. Its ODD is a driving scene: separated highway, HD map, moderate to heavy traffic, detectable lane markings, no inclement weather.</p></div></div>
        </div></div>` },

    { id: "responsibility", sec: "intro", kicker: "Motivation · who is responsible?", ref: "§1.2", time: 60,
      title: "Who watches the ODD? From Level 3, the vehicle itself",
      notes: "Every automated feature has its own ODD; the automation level says who is responsible for it. Fully self-driving fleets were announced for 2019 and 2020, by General Motors, Toyota and Nissan. They did not arrive: driving proved harder than assumed, and automation now advances level by level. The decisive step is between Level 2 and Level 3. Up to Level 2, the driver supervises, and must know the limits of the system, which drivers often do not. From Level 3, the system performs the whole driving task within its ODD: it must monitor its own limits and request a takeover in time, 12 to 15 seconds ahead. From Level 4, nobody takes over: the system must reach a minimal risk condition by itself. The higher the level, the more the vehicle itself must know what it can do.",
      html: `<div class="card tight row" style="align-items:center;gap:22px"><span class="pill amber">2018</span><p class="small" style="margin:0">Fully self-driving fleets announced for 2019 – 2020 by General Motors, Toyota and Nissan. The task proved harder than assumed: automation now advances <b>level by level</b>.</p></div>
        <div class="row grow">
          <div class="card col" style="flex:1.3 1 0"><h4>Each feature has its own ODD</h4>${fig("sae_levels.png", "Automation levels and examples of ODD")}</div>
          <div class="col grow">
            <div class="card tight grow"><h4>Up to Level 2</h4><p class="small">The <b>driver</b> supervises, and must know the ODD of the system, which drivers often do not.</p></div>
            <div class="card tight accent grow"><h4>Level 3</h4><p class="small">The <b>system</b> performs the whole driving task within its ODD, monitors its own limits and requests a takeover in time, <b>12 to 15 s</b> ahead.</p></div>
            <div class="card tight ok grow"><h4>Level 4 and above</h4><p class="small">Nobody takes over: the system reaches a <b>minimal risk condition</b> by itself.</p></div>
          </div></div>
        <div class="takeaway">The higher the level, the more the vehicle itself must know <b>what it can do</b>, and under which conditions.</div>` },

    { id: "context", sec: "intro", kicker: "Motivation · a changing context", ref: "§1.2, §2.2", time: 60, steps: 2,
      title: "Along a route, the context keeps changing; the ODD does not",
      notes: "Along one route, the context keeps changing: a highway exit, road works, missing lane markings, a tunnel, a traffic jam, a curve, rain expected ahead. The ODD, fixed by design, does not change. What changes is the operational domain, OD, the current conditions; staying in the ODD means keeping the OD inside it, now and on the route ahead. (1) Today, ODD monitoring is mostly a set of isolated condition checks, rarely part of the decision: the limit is noticed once it is crossed, with an abrupt deactivation, an emergency stop or, for a fleet, a suspended service. (2) What is needed is the opposite: anticipate the limits inside the decision, keep operating with fewer capabilities while it is safe, and start the fallback while it is still feasible. That is graceful degradation.",
      html: `<div class="row grow">
        <div class="card col" style="flex:0 0 700px;padding:20px 26px"><h4>One route, many context changes</h4>${fig("context_changes.png", "Target route with context changes: highway exit, road works, missing lane markings, tunnel, traffic jam, curved road, expected rain")}</div>
        <div class="col grow">
          <div class="card accent"><h3>Operational domain (OD) and ODD</h3><p>The <b>ODD</b> is fixed by design. The <b>OD</b>, the current conditions, changes all along the journey. Staying in the ODD means keeping the OD inside it, <b>now and on the route ahead</b>.</p></div>
          <div class="card bad grow" data-step="1"><h3>Today: monitor, then react</h3><ul class="list" style="gap:12px">
            <li>Isolated condition checks, rarely part of the decision</li>
            <li>The limit is noticed once it is crossed</li>
            <li>Abrupt deactivation, emergency stop, or a suspended service</li></ul></div>
          <div class="card ok grow" data-step="2"><h3>Needed: anticipate, inside the decision</h3><ul class="list" style="gap:12px">
            <li>Foresee the limits over the coming maneuvers</li>
            <li>Keep operating with fewer capabilities while it is safe</li>
            <li>Start the fallback while it is still feasible: <b>graceful degradation</b></li></ul></div>
        </div></div>` },

    { id: "principle", sec: "intro", kicker: "Guiding principle of the thesis", ref: "§1.2", time: 60, steps: 2,
      title: "Capability precedes choice",
      notes: "The motivation in one line. Automated driving proved harder than announced, so automation advances level by level. From Level 3, the vehicle answers for its own limits; it must therefore be aware of its ODD, now and ahead, and use it to decide: avoid ODD exits, and degrade safely when needed. (1) This is the guiding principle of the whole thesis: a system can only make the right choice if it first understands what it is capable of, and within which operational limits. (2) Two steps, in this order. First, capability: what can the vehicle still do safely, now and in the situations its decisions lead to. Then, choice: among those options only, which maneuvers, in which order, keeping a fallback within reach.",
      html: `<div class="chain">
          <div class="st"><span class="n">1</span>Driving proved harder than announced</div><div class="ar2">→</div>
          <div class="st"><span class="n">2</span>Automation advances level by level</div><div class="ar2">→</div>
          <div class="st"><span class="n">3</span>From Level 3, the vehicle answers for its own limits</div><div class="ar2">→</div>
          <div class="st"><span class="n">4</span>It must be aware of its ODD, now and ahead</div><div class="ar2">→</div>
          <div class="st"><span class="n">5</span>And use it to decide: avoid ODD exits, degrade safely</div></div>
        <div class="card navy" data-step="1" style="padding:40px 64px"><div class="quote" style="font-size:42px;color:#fff;border-color:var(--amber)">A system can only make the right choice if it first understands what it is capable of, and within which operational limits.</div></div>
        <div class="cpcflow grow" data-step="2">
          <div class="card ok col" style="gap:14px;justify-content:center"><h3 style="margin:0;font-size:44px">1 · Capability</h3>
            <p style="font-size:33px">What can the vehicle still do <b>safely</b>, now and in the situations its decisions lead to?</p></div>
          <div class="arrow-big">→</div>
          <div class="card col" style="gap:14px;justify-content:center;border-left:10px solid var(--blue)"><h3 style="margin:0;font-size:44px">2 · Choice</h3>
            <p style="font-size:33px">Among <b>those options only</b>, which maneuvers, in which order, keeping a fallback within reach?</p></div>
        </div>` },

    { id: "v-problem-a", type: "video", sec: "intro", ref: "§1.3", time: 45,
      title: "Problem: a sequence of admissible decisions can leave no fallback",
      notes: "Current systems check the ODD as a monitor: each maneuver is admissible when it is chosen. Yet the sequence narrows operability until no fallback is left, without any single decision being incorrect.",
      video: { src: A + "problem.mp4", parts: [[0.0, "Each decision is checked when it is taken"], [9.0, "Yet the sequence leaves no fallback"]], end: 16.0 } },

    { id: "question", sec: "intro", kicker: "Problem statement", ref: "§1.3", time: 75, steps: 3,
      title: "Research question",
      notes: "The research question. The figure gives what an answer must achieve, in two views of the same situation: on the left, the operational conditions as a point in the space of conditions, with the ODD as the region where the system was designed to operate; on the right, the road. (0) At t0, the conditions lie within the ODD. (1) A first decision, DM1, leads to t1, still within the ODD. (2) Rain reduces the visibility ahead: if nothing changes, the next state would leave the ODD. (3) Anticipating it, the second decision reduces the speed, and the vehicle stays within its ODD. The decision is taken before the limit, not after it.",
      html: `<div class="card" style="padding:20px 36px"><div class="quote" style="font-size:32px">“How can an intelligent vehicle ensure ODD-compliant decision-making as its operational context continuously evolves?”</div></div>
        <div class="row grow" style="align-items:stretch">
          <div class="card col" style="flex:0 0 640px;padding:14px 18px"><h4 style="margin:0">In the space of operational conditions</h4>
            <svg class="odsp" viewBox="0 0 640 520" aria-hidden="true">
              <defs><marker id="odsp-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d1d1d"/></marker></defs>
              <path class="blob" d="M70 130 C 50 50, 210 20, 310 45 C 430 75, 560 30, 575 160 C 585 260, 548 330, 560 420 C 572 500, 430 505, 310 488 C 190 470, 70 505, 48 400 C 32 300, 85 220, 70 130 Z"/>
              <text class="oddl" x="96" y="112">ODD</text>
              <g class="odb"><rect x="80" y="300" width="150" height="100" rx="6"/><text x="155" y="352">OD<tspan class="sb" dy="12">t0</tspan></text></g>
              <g data-step="1"><path class="dm" d="M168 404 Q 228 476 296 424" marker-end="url(#odsp-a)"/><text class="dml" x="138" y="470">DM<tspan class="sb" dy="8">1</tspan></text>
                <g class="odb"><rect x="300" y="330" width="150" height="100" rx="6"/><text x="375" y="382">OD<tspan class="sb" dy="12">t1</tspan></text></g></g>
              <g data-step="2"><rect class="out" x="561" y="296" width="46" height="108"/><rect class="odd2" x="430" y="296" width="177" height="108" rx="6"/>
                <text class="odl2" x="600" y="438">OD<tspan class="sb" dy="12">t1′</tspan></text>
                <text class="rain" x="606" y="476" text-anchor="end">rain: visibility drops</text></g>
              <g data-step="3"><path class="dm" d="M372 328 Q 350 258 396 199" marker-end="url(#odsp-a)"/><text class="dml" x="272" y="268">DM<tspan class="sb" dy="8">2</tspan></text>
                <g class="odb"><rect x="330" y="95" width="150" height="100" rx="6"/><text x="405" y="147">OD<tspan class="sb" dy="12">t2</tspan></text></g></g>
            </svg></div>
          <div class="card col grow" style="padding:14px 18px;align-items:center"><h4 style="margin:0;align-self:flex-start">On the road</h4>
            <div class="wipe"><img class="w0" src="${F}anticipation.jpg" alt=""><div class="wp" data-dim="1"><div data-dim="2"><div data-dim="3"><img class="w1" src="${F}anticipation.jpg" alt="Anticipatory decision-making: the vehicle reduces its speed before the visibility drops"></div></div></div></div></div>
        </div>
        <div class="capt"><div data-until="1">At <i class="m">t</i><sub>0</sub>, the operational conditions lie within the ODD</div>
          <div data-step="1"><div data-until="2">Decision DM<sub>1</sub>: at <i class="m">t</i><sub>1</sub>, the conditions are still within the ODD</div></div>
          <div data-step="2"><div data-until="3">Rain reduces the visibility: <b>if nothing changes</b>, the next state OD<sub>t1′</sub> leaves the ODD</div></div>
          <div data-step="3">Anticipating it, DM<sub>2</sub> <b>reduces the speed</b>: OD<sub>t2</sub> stays within the ODD</div></div>` },

    { id: "v-problem-b", type: "video", sec: "intro", ref: "§1.3", time: 40,
      title: "Anticipate: a fallback always within reach",
      notes: "The answer of the thesis: anticipate the loss of capability, so that a fallback always stays within reach. This is fail-operational decision-making.",
      video: { src: A + "problem.mp4", parts: [[16.0, "Anticipate the loss of capability"], [25.5, "Fail-operational: a fallback always reachable"]] } },

    { id: "failop", sec: "intro", kicker: "The aim", ref: "§1.3, §2.2.1", time: 60, steps: 2,
      title: "Fail-operational: keep driving with fewer capabilities, a fallback always reachable",
      notes: "What we aim for, on a simple example from chapter 2: on a highway at 130 km/h, the primary LiDAR loses range, so the perception horizon shrinks. (1) A fail-safe system reaches a minimal risk condition: it stops on the hard shoulder, and the mission is aborted. (2) A fail-operational system updates its capabilities and replans: it continues at a reduced speed, without the lane change that is no longer ensured, while a minimal risk maneuver remains reachable. The scope of the thesis is this kind of degradation, such as fog, that reduces capabilities without any fault.",
      html: `<div class="card row" style="gap:30px;align-items:center;padding:18px 28px">
          <img src="${F}failop_a.png" alt="The LiDAR range is reduced; the nominal range is dashed" style="width:640px;border-radius:10px">
          <div><h4 style="margin-bottom:8px">Example: the primary LiDAR loses range</h4><p style="margin:0">Highway, 130 km/h. The perception horizon shrinks <span class="mute">(nominal range dashed)</span>. What should the vehicle do?</p></div></div>
        <div class="g2 grow">
          <div class="card col" data-step="1" style="gap:12px"><h3 style="margin:0">Fail-safe</h3><img src="${F}failop_e.png" alt="Fail-safe: the vehicle stops on the hard shoulder" style="width:100%;border-radius:10px">
            <p style="margin:0;font-size:27px">Reaches a minimal risk condition, here a stop on the hard shoulder: <b>the mission is aborted</b>.</p></div>
          <div class="card col ok" data-step="2" style="gap:12px"><h3 style="margin:0">Fail-operational</h3><img src="${F}failop_f.png" alt="Fail-operational: the vehicle continues at a reduced speed, the lane change is no longer ensured" style="width:100%;border-radius:10px">
            <p style="margin:0;font-size:27px">Updates its capabilities and <b>keeps driving</b> at a reduced speed, without the lane change no longer ensured, a fallback always reachable.</p></div>
        </div>
        <div class="takeaway" data-step="2">Scope of the thesis: degradations, such as fog, that reduce capabilities <b>without any fault</b>.</div>` },

    { id: "contrib", type: "outline", sec: "intro", kicker: "Contributions and outline", ref: "§1.4", time: 60,
      title: "Four contributions, integrated into one architecture: ODD-aptive",
      notes: "Four contributions, one principle: capability precedes choice. Each one answers a question. The first three are the method, in chapters 4 and 5, each illustrated with its animations; the fourth is the validation of all of them, in chapter 6, in simulation and on a prototype vehicle. Each line links to its part.",
      html: `<div class="card navy"><h3>Capability precedes choice</h3><p>A maneuver must be assessed as ensured in the corresponding state before the policy planner can consider it, throughout the planning horizon.</p></div>` },

    // ================================================================ 2. fundamentals and state of the art (part I, chapters 2 and 3)
    { id: "sec-sota", type: "section", sec: "sota", dark: true, title: "Fundamentals and state of the art", time: 10 },

    { id: "awareness", sec: "sota", kicker: "Background · awareness and the ODD", ref: "§2.2.2 – §2.4", time: 60,
      title: "What must the vehicle know about itself and its context?",
      notes: "The synthesis of chapter 2. Self-awareness: an explicit representation of the vehicle's own capabilities. Context-awareness: the external conditions. The ODD links both. Its limits: uncertainty requires margins, and discontinuities at the boundaries require anticipation. That is the task of a fail-operational system.",
      html: `<div class="card tight" style="height:440px">${fig("awareness.png", "Context-awareness and self-awareness", 404)}</div>
        <div class="g4">
          <div class="card tight ok"><h4>Self-awareness</h4><p class="small">The vehicle's own capabilities: what it can achieve now, and after a given action, each with a degree of performance.</p></div>
          <div class="card tight" style="border-left:10px solid var(--blue)"><h4>Context-awareness</h4><p class="small">The external conditions, from the relations between road users to the road topology and the traffic rules.</p></div>
          <div class="card tight accent"><h4>The ODD</h4><p class="small">Links the capabilities of the system to a structured representation of the context. Its monitoring can support the decision.</p></div>
          <div class="card tight bad"><h4>Its limits</h4><p class="small">Uncertainty on the perceived context requires margins. Discontinuities at the boundaries require <b>anticipation</b>.</p></div>
        </div>
        <div class="takeaway">A fail-operational vehicle must know <b>what it can still do</b> in the context ahead, not only whether it is inside its ODD now.</div>` },

    { id: "rw-c1", sec: "sota", c: ["C1"], kicker: "Related work · capability assessment", ref: "§2.2, §3.4", time: 70,
      title: "How is the capability of the vehicle assessed today?",
      notes: "Three families. Ability and skill graphs decompose a behavior into skills with a level of performance, and have been used to trigger a lane change or not. The restricted operational domain removes the maneuvers that a lost capability no longer supports. The arbitration graph checks every function against the ODD before deciding. Monitoring estimates the time to exit the ODD. All of them assess the current state, and adapt once a condition is detected. The MCE assesses each maneuver, in the predicted states too.",
      html: `<div class="g3" style="height:250px">
          <div class="card tight col" style="gap:6px">${fig("rw_ability_graph.png", "Ability graph for an ACC behavior")}<p class="xs mute" style="margin:0;text-align:center">Ability graph (Reschka, 2015)</p></div>
          <div class="card tight col" style="gap:6px">${fig("rw_rod.png", "Restricted Operational Domain")}<p class="xs mute" style="margin:0;text-align:center">Restricted Operational Domain (Colwell, 2018)</p></div>
          <div class="card tight col" style="gap:6px">${fig("rw_arbitration_graph.png", "Arbitration graph")}<p class="xs mute" style="margin:0;text-align:center">Arbitration graph (Pior, 2020)</p></div>
        </div>
        <table class="tbl chkt"><tr><th style="width:430px">Work</th><th style="width:170px">Level</th><th>What it brings</th><th>What is missing</th></tr>
          <tr><td><b>Ability and skill graphs</b> <span class="mute">Reschka, 2015 · Ulbrich, 2015</span></td><td>Tactical</td><td class="y">Skills with a level of performance; trigger a lane change or not</td><td class="n">Current state only</td></tr>
          <tr><td><b>Restricted Operational Domain</b> <span class="mute">Colwell, 2018</span></td><td>Monitoring</td><td class="y">A lost capability removes some maneuvers and keeps others</td><td class="n">Current state only, reactive</td></tr>
          <tr><td><b>Arbitration graph</b> <span class="mute">Pior, 2020</span></td><td>Tactical</td><td class="y">Every function checked against the ODD before deciding</td><td class="n">No prediction of the future state</td></tr>
          <tr><td><b>Time to exit the ODD</b> <span class="mute">Charmet, 2024</span></td><td>Monitoring</td><td class="y">Anticipates the exit, with measurement uncertainty</td><td class="n">Triggers a takeover or an MRM, not the maneuver</td></tr>
          <tr><td><b>μODDs</b> <span class="mute">Salvi, 2022</span></td><td>Operational</td><td class="y">Speed reduced as the rain increases</td><td class="n">One dimension, one maneuver</td></tr>
          <tr class="hl"><td><b>MCE, this thesis</b> <span class="cbadge ink" style="height:26px;font-size:15px;min-width:40px;margin-left:6px">C1</span></td><td>Tactical</td><td class="y" colspan="2">Each maneuver, in the current <b>and in the predicted states</b>, every loss traced back to a change of context</td></tr></table>` },

    { id: "levels", sec: "sota", kicker: "State of the art · decision levels", ref: "§3.2", time: 50,
      title: "Which decision? The tactical level: which maneuver, and when",
      notes: "Three decision levels after Michon. The tactical level answers what maneuver to perform, when and how, over a few seconds. The industrial starting point is a set of ADAS features already validated.",
      html: `<div class="row grow">
        <div class="card col" style="flex:1.2 1 0"><h4>Michon's three levels</h4>${fig("michon.png", "Michon's levels of the driving task")}</div>
        <div class="col grow">
          <div class="card tight"><span class="pill gray">Strategic · 1 h to 1 min</span><p class="small" style="margin-top:8px">Route search and planning</p></div>
          <div class="card tight amber"><span class="pill amber">Tactical · 1 min to 1 s</span><p class="small" style="margin-top:8px">Selection and coordination of maneuvers</p></div>
          <div class="card tight"><span class="pill gray">Operational · 1 s to 10 ms</span><p class="small" style="margin-top:8px">Trajectory, control and stabilization</p></div>
          <div class="card navy"><h3>Contribution of the thesis</h3><p>An anticipatory tactical layer that keeps the vehicle within what it can ensure, over ADAS features already validated.</p></div>
        </div></div>` },

    { id: "methods", sec: "sota", kicker: "State of the art · tactical decision-making", ref: "§3.3", time: 60,
      title: "How do existing methods decide?",
      notes: "The state of the art in one table, the synthesis of the survey, table of chapter 3. Probabilistic methods handle uncertainty and long horizons at a computational cost, which online sampling solvers mitigate. Learning-based methods scale but give no guarantee. In all families, the context describes the scene.",
      html: `<table class="tbl" style="font-size:24px"><tr><th>Method</th><th class="c">Uncert.</th><th class="c">Scal.</th><th class="c">Unseen</th><th class="c">Horizon</th><th class="c">Explain.</th><th class="c">Cost</th><th class="c">Real time</th><th>Main limitation</th></tr>
        <tr><td><b>Rule-based</b></td><td class="c">−</td><td class="c">−</td><td class="c">−</td><td class="c">−</td><td class="c">++</td><td class="c">++</td><td class="c">++</td><td>Limited to the encoded cases, one maneuver at a time</td></tr>
        <tr class="hl"><td><b>Probabilistic</b></td><td class="c">++</td><td class="c">+</td><td class="c">+</td><td class="c">++</td><td class="c">+</td><td class="c">−</td><td class="c">+</td><td>Cost grows with the state and belief spaces</td></tr>
        <tr><td><b>Learning-based</b></td><td class="c">+</td><td class="c">++</td><td class="c">++</td><td class="c">++</td><td class="c">−</td><td class="c">−</td><td class="c">+</td><td>Black box, no safety guarantee, sim-to-real gap</td></tr>
        <tr><td><b>Hybrid</b></td><td class="c">++</td><td class="c">−</td><td class="c">+</td><td class="c">++</td><td class="c">+</td><td class="c">−−</td><td class="c">+</td><td>Scalability and computational cost</td></tr></table>
        <div class="row grow">
          <div class="card grow"><h4>Families reviewed</h4><ul class="list">
            <li><b>Rule-based:</b> finite and hierarchical state machines, behavior trees, fuzzy logic</li>
            <li><b>Probabilistic:</b> game theory, decision networks, MDP, POMDP</li>
            <li><b>Learning-based:</b> SVM, decision trees, neural networks, reinforcement learning</li>
            <li><b>Hybrid:</b> rules combined with learning</li></ul></div>
          <div class="card navy grow"><h3>What this thesis keeps, and what is missing</h3><ul class="chk">
            <li class="y">Probabilistic planning: sequential decisions over a long horizon, explainable</li>
            <li class="n">In every family, the context “is used to describe the scene, not to assess whether the vehicle remains capable of operating safely in it”</li></ul></div>
        </div>`,
      backups: ["b-learning"] },

    { id: "rw-c3", sec: "sota", c: ["C3"], kicker: "Related work · partial observability", ref: "§3.3", time: 60,
      title: "How do POMDP planners handle uncertainty?",
      notes: "POMDPs are the standard frame for tactical decisions under partial observability: lane changes, merging, intersections. Online Monte Carlo search with belief updates makes them tractable, and POMCP represents the belief with particles. What they keep uncertain is the traffic. The capability of the vehicle is assessed, at best, in the current state. The ODD-POMDP adds the capability check in every particle.",
      html: `<div class="card tight col" style="height:410px;gap:8px">${fig("rw_pomdp.png", "Partially observable driving scenarios")}
          <p class="xs mute" style="margin:0;text-align:center">Left: intersection with unknown intentions and sensor noise (Hubmann, 2018). Right: highway exit where the yielding intentions are hidden (Chen, 2025).</p></div>
        <div class="g2 grow">
          <div class="card col" style="justify-content:center"><h3>What POMDP planners bring</h3><ul class="chk">
            <li class="y">A belief over what is hidden: sensor noise, intentions <span class="mute">(Ulbrich, 2015; Hubmann, 2018)</span></li>
            <li class="y">Online Monte Carlo search with belief updates keeps it tractable <span class="mute">(Hubmann, 2018; Zhang, 2020)</span>, with particles in POMCP <span class="mute">(Silver, 2010)</span></li>
            <li class="y">Deep reinforcement learning to scale <span class="mute">(Hoel, 2019)</span></li></ul></div>
          <div class="card navy col" style="justify-content:center"><h3>What is missing, and what C3 adds</h3><ul class="chk">
            <li class="n">The uncertainty is on the traffic. The capability of the vehicle is assessed, at best, in the current state <span style="color:#9fb6d4">(Ulbrich, 2015)</span></li>
            <li class="to">ODD-POMDP: an action is kept when a share <i class="m">τ</i> of the particles ensures it, in every node of the search</li></ul></div>
        </div>` },

    { id: "positioning", sec: "sota", kicker: "Positioning", ref: "§3.4 – §3.5", time: 75,
      title: "What is missing in the state of the art?",
      notes: "The four gaps identified at the end of the survey, published in IEEE Transactions on Intelligent Vehicles in 2025. For each, what exists, what is missing, and the contribution that addresses it. Each badge links to its part.",
      backups: ["b-learning"],
      html: `<div class="g2 grow">
        ${[["Long-term, sequential decisions", "MDPs and POMDPs plan sequences of maneuvers, under uncertainty <span class=\"mute\">(Brechtel, 2014; Hubmann, 2018; Hoel, 2019)</span>", "Rule-based and most learning-based methods select one maneuver at a time", ["C2", "C3"]],
           ["Capability in future states", "Ability and skill graphs, restricted domains and arbitration graphs assess what the vehicle can do <span class=\"mute\">(Reschka, 2015; Colwell, 2018; Pior, 2020)</span>", "Only in the current state: the logic remains reactive", ["C1", "C2"]],
           ["Situation awareness enriched by the ODD", "Monitoring tells how far the operational domain is inside the ODD, and even the time left before exiting it <span class=\"mute\">(Charmet, 2024)</span>", "The context describes the scene, not whether the vehicle remains capable in it", ["C1"]],
           ["Interdependent ODD dimensions", "Weather, road type and density are each monitored, for instance rain through μODDs <span class=\"mute\">(Salvi, 2022)</span>", "One dimension at a time, while the admissible speed depends on visibility or friction", ["C1"]]]
          .map(([t, y, n, cs], j) => `<div class="card col" style="gap:20px;padding:30px 36px"><div class="row" style="align-items:center;gap:18px"><div class="num-badge" style="width:50px;height:50px;font-size:24px">${j + 1}</div><h3 style="margin:0;font-size:31px">${t}</h3></div>
            <ul class="chk" style="gap:16px"><li class="y">${y}</li><li class="n">${n}</li></ul>
            <div class="row" style="margin-top:auto;align-items:center;gap:10px"><span class="xs mute" style="font-weight:600">Addressed by</span>${cs.map((c) => `<a class="cbadge ink" data-go="sec-${c.toLowerCase()}" href="#/sec-${c.toLowerCase()}">${c}</a>`).join("")}</div></div>`).join("")}
        </div>
        <p class="xs mute" style="margin:0;text-align:right">Gaps identified in the survey: R. Cardenas et al., IEEE Transactions on Intelligent Vehicles, 2025</p>` },

    // ================================================================ 3. C1 · capability: the architecture and the MCE (part II, chapter 4), illustrated by its animations
    { id: "sec-c1", type: "section", sec: "c1", dark: true, title: "C1 · What can the vehicle still ensure?", time: 10 },

    { id: "assumptions", sec: "c1", c: ["C1"], kicker: "Problem statement and working assumptions", ref: "§4.2", time: 60,
      title: "A tactical layer that orchestrates the existing driving functions",
      notes: "Where the work sits: between route planning and control, at the tactical level. ODD-aptive does not redesign the driving functions. And the assumptions, stated up front: they are design choices that keep the focus on the decision.",
      html: `<div class="row grow">
        <div class="col grow">
          <div class="card tight"><span class="pill gray">Strategic</span> <span class="small">Route: road segments, exits, destination</span></div>
          <div class="card tight amber"><span class="pill amber">Tactical</span> <span class="small"><b>Which maneuver, and when: ODD-aptive</b></span></div>
          <div class="card tight"><span class="pill gray">Operational</span> <span class="small">Trajectory and control</span></div>
          <div class="card grow"><p>ODD-aptive does not redesign the driving functions. It orchestrates commercially validated ADAS features, each with its own operating envelope: ACC, lane centering (LCA), semi-autonomous lane change (SALC), and the MRM execution.</p></div>
        </div>
        <div class="card grow"><h3>Working assumptions</h3><ul class="list">
          <li>The ODD and its requirements are specified in advance. Only the decisions adapt</li>
          <li>A predefined set of maneuvers, whose availability is assessed in each situation</li>
          <li>Ego, traffic and context come from upstream perception, localization, maps and fusion</li>
          <li>Capabilities that are not assessed, Act skills included, are assumed fulfilled</li>
          <li>Prediction models exist over a finite horizon; future operability is conditional on them</li>
          <li>Highway driving, with the conditions ahead announced by the electronic horizon</li></ul></div>
        </div>` },

    { id: "architecture", sec: "c1", kicker: "Our answer: ODD-aptive", ref: "§4.3", time: 150, steps: 5,
      title: "ODD-aptive: three decision layers, and inside the tactical one",
      notes: "The architecture of chapter 4, Figure 4.1, read as a loop. On the left, input preparation: the context sources (perception, V2X, map) feed the world model, which gives the tactical state s = OD × ego × surrounding vehicles. The decision follows Michon's three levels. The strategic layer plans the route from the map and the ego pose, and passes the route plan R. The tactical layer, our contribution, receives the current state s0 and the route plan, and decides which maneuver and when. Its current action a_t = (m_t, θ_t) goes to the operational layer: the ADAS features selector activates ACC, LCA, SALC or the MRM with its parameters, the trajectory planner gives the reference trajectory T, and low-level control sends the commands u_t to the vehicle. The measurements close the loop. (1) Zoom into the tactical layer. The current state, or belief, becomes the root s0 of the planning horizon builder. (2) For each state, the builder queries the MCE, which monitors the Sense, Think and Act skills each maneuver requires, and returns the ensured maneuvers A_ens(s). Here the lane change to the right is not ensured, so it is never expanded. (3) The state predictor computes the next state of each ensured maneuver, using the electronic horizon for the conditions ahead; query and prediction repeat up to the horizon H. (4) The result is an MDP, or a POMDP, whose actions are only ensured maneuvers: capability enters the model before the policy planner chooses. The reward combines safety, legal, progress, route and operability; the solver applies Bellman restricted to A_ens. (5) The output is a sequence of maneuvers, here keep lane, change left, then change right. Only the first one is executed, as an ADAS feature with its parameters; then the plan is rebuilt from the new state.",
      html: `<div class="ar zm">
        <div class="ov" data-dim="1">
        <div class="frm" style="left:0;top:0;width:340px;height:712px"><span class="frt">Input preparation</span></div>
        <div class="pn" style="left:14px;top:40px;width:312px;height:160px"><div class="ph"><span class="k">A</span>Context sources</div>
          <div class="pb"><div><b>Perception &amp; localization</b><div class="t">cameras · LiDAR · radar · GNSS</div></div><div><b>V2X</b> <span class="t">vehicles, infrastructure</span></div><div><b>Digital map</b> <span class="t">road topology</span></div></div></div>
        <div class="pn" style="left:14px;top:238px;width:312px;height:92px"><div class="ph"><span class="k">B</span>World model</div><div class="pb">Fusion, tracking, context update</div></div>
        <div class="pn" style="left:14px;top:368px;width:312px;height:334px"><div class="ph"><span class="k">C</span>State representation</div>
          <div class="pb ctr"><div class="eqs"><i>𝒮</i> = OD × <i>p</i><sub>ego</sub> × {<i>p<sub>i</sub></i>}</div><div class="t">Operational domain (OD)</div><img src="${F}arch_od.jpg" alt="Operational domain: weather, road type, speed limit" style="width:270px"><div class="t">Dynamic scenario: ego and other vehicles</div><img src="${F}arch_scen.jpg" alt="Ego vehicle and surrounding vehicles" style="width:228px"></div></div>
        <div class="pn" style="left:0;top:752px;width:340px;height:100px"><div class="ph"><span class="k">G</span>Input environment</div><img class="cover" src="${F}arch_env.jpg" alt="Highway traffic"></div>

        <div class="pn" style="left:430px;top:0;width:940px;height:196px"><div class="ph"><span class="k">D</span>Strategic layer<span class="s">Mission and route planning at the road-network level</span></div>
          <div class="pb row"><img src="${F}arch_city.jpg" alt="Route on a city map" style="width:640px;height:107px;border-radius:8px"><div class="rp"><b>Route plan <i>𝓡</i></b><ul><li>Road segments</li><li>Upcoming exit</li><li>Destination</li></ul></div></div></div>

        <div class="pn tac" style="left:430px;top:262px;width:940px;height:447px"><div class="ph"><span class="k">E</span>Tactical layer<span class="s">Maneuver decisions with ensured maneuver capabilities</span><span class="tag">Contribution</span></div></div>

        <div class="pn" style="left:1460px;top:262px;width:332px;height:447px"><div class="ph"><span class="k">F</span>Operational layer</div></div>
        <div class="pn sb" style="left:1474px;top:304px;width:304px;height:164px"><div class="ph"><span class="k">F1</span>ADAS features selector</div><img src="${F}arch_adas.png" alt="ACC, LCA, SALC and MRM execution" style="width:288px;margin:6px 6px 0"></div>
        <div class="pn sb" style="left:1474px;top:498px;width:304px;height:96px"><div class="ph"><span class="k">F2</span>Trajectory planner</div><img src="${F}arch_traj.jpg" alt="Reference trajectory" style="width:288px;margin:2px 6px 0"></div>
        <div class="pn sb" style="left:1474px;top:622px;width:304px;height:78px"><div class="ph"><span class="k">F3</span>Low-level control</div><div class="pb ctr" style="justify-content:center;flex:1;padding:4px 8px">Lateral and longitudinal control</div></div>

        <svg class="wires" viewBox="0 0 1792 852" aria-hidden="true">
          <defs><marker id="arA-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#063669"/></marker></defs>
          <g marker-end="url(#arA-n)">
            <path class="w" d="M170 200 V234"/><path class="w" d="M170 330 V364"/>
            <path class="w" d="M326 284 H392 V100 H426"/>
            <path class="w" d="M326 520 H426"/><path class="w" d="M900 196 V258"/>
            <path class="w" d="M1370 380 H1470"/>
            <path class="w" d="M1626 468 V494"/><path class="w" d="M1626 594 V618"/>
            <path class="w" d="M1626 700 V806 H344"/><path class="w" d="M170 752 V716"/>
          </g>
          <text class="vl" transform="translate(381 192) rotate(-90)" text-anchor="middle">Map + ego pose</text>
        </svg>
        <div class="sig" style="left:182px;top:207px">Observations</div>
        <div class="sig" style="left:182px;top:331px;font-size:13.5px;line-height:1.15">Integrated world<br>representation</div>
        <div class="sig" style="left:346px;top:466px">Current<br>state <i>s</i><sub>0</sub></div>
        <div class="sig" style="left:914px;top:214px">Route plan <i>𝓡</i>: road segments, upcoming exit, destination</div>
        <div class="sig zh" style="left:1080px;top:344px;width:282px;text-align:right">Current action <i>a<sub>t</sub></i> = (<i>m<sub>t</sub></i>, <i>θ<sub>t</sub></i>)</div>
        <div class="sig" style="left:1638px;top:470px">Selected feature + <i>θ<sub>t</sub></i></div>
        <div class="sig" style="left:1638px;top:596px">Reference trajectory <i>T</i></div>
        <div class="sig" style="left:1180px;top:778px">Control commands <i>u<sub>t</sub></i></div>
        <div class="sig" style="left:182px;top:722px">Measurements</div>
        </div>
        <div class="q" data-until="1" style="left:430px;top:372px;width:940px"><div class="qm">?</div><div class="qt">Which maneuver, and when?</div></div>

        <div class="pn after" data-step="1" style="left:110px;top:386px;width:552px;height:240px"><div class="ph"><span class="k">E2</span>Planning horizon builder<span class="s">states (MDP) · beliefs (POMDP)</span></div></div>

        <div class="pn" data-step="2" style="left:110px;top:96px;width:552px;height:240px"><div class="ph"><span class="k">E1</span>Maneuver Capability Estimator<span class="tag cap">Monitoring</span></div>
          <div class="mce">
            <div><h5>Sense</h5><span class="sk l">Sense skill 1</span><span class="sk b">Sense skill 2</span><span class="sk k">Sense skill 3</span></div>
            <div><h5>Think</h5><span class="sk l">Think skill 1</span><span class="sk b">Think skill 2</span><span class="sk k">Think skill 3</span></div>
            <div><h5>Act</h5><span class="sk b">Act skill 1</span><span class="sk l">Act skill 2</span><span class="sk k">Act skill 3</span></div>
          </div>
          <div class="lg"><span class="sk k sw"></span>KL requires <span class="sk l sw"></span>LCL requires · ensured if all its skills hold in <i>s<sub>i</sub></i></div></div>

        <div class="pn mg" data-step="4" style="left:760px;top:96px;width:400px;height:240px"><div class="ph"><span class="k"><i>𝓜</i></span>MDP / POMDP with ensured maneuvers</div>
          <div class="pb"><ul class="ls"><li>States <i>s<sub>i</sub></i>, or beliefs <i>b<sub>i</sub></i>, up to horizon <i>H</i></li><li>Actions restricted to <i>A</i><sub>ens</sub>(<i>s<sub>i</sub></i>)</li><li>Predicted transitions (<i>s<sub>i</sub></i>, <i>a</i>, <i>s′</i>)</li></ul><div class="t" style="margin-top:4px"><b class="mgt">Capability enters the model</b> before the policy is optimized</div></div></div>

        <div class="pn" data-step="3" style="left:760px;top:430px;width:400px;height:196px"><div class="ph"><span class="k">E3</span>State predictor<span class="s">+ electronic horizon (V2X)</span></div>
          <div class="e3"><figure><img src="${F}arch_e3in.jpg" alt="Input state and lane change to the left"><figcaption>state <i>s<sub>i</sub></i> + maneuver <i>a</i></figcaption></figure><span class="ar1">→</span><figure><img src="${F}arch_e3out.jpg" alt="Predicted state"><figcaption>predicted state <i>s′</i></figcaption></figure></div>
          <div class="eqs" style="text-align:center;font-size:19px"><i>s′</i> = <i>f</i>(<i>s<sub>i</sub></i>, <i>a</i>), &nbsp;<i>a</i> ∈ <i>A</i><sub>ens</sub>(<i>s<sub>i</sub></i>)</div></div>

        <div class="pn" data-step="4" style="left:1210px;top:130px;width:566px;height:496px"><div class="ph"><span class="k">E4</span>Policy planner<span class="tag cho">Choice</span></div>
          <div class="e4">
            <div class="blk"><div class="sh"><span class="k">E4.1</span>Reward evaluation</div>
              <table class="rw"><tr><td>Safety</td><td>collision, TTC / TIV risk</td><td><i>R</i><sub>col</sub>, <i>R</i><sub>risk</sub></td></tr>
                <tr><td>Legal</td><td>speed limit</td><td><i>R</i><sub>legal</sub></td></tr>
                <tr><td>Progress</td><td>driving speed</td><td><i>R</i><sub>speed</sub></td></tr>
                <tr><td>Route</td><td>itinerary lane, next exit</td><td><i>R</i><sub>route</sub></td></tr>
                <tr><td>Operability</td><td>ensured maneuvers, MRM</td><td><i>R</i><sub>op</sub>, <i>R</i><sub>time</sub></td></tr></table>
              <div class="eqs" style="text-align:center;margin-top:6px"><i>R</i>(<i>s</i>) = Σ<sub><i>k</i></sub> <i>W<sub>k</sub></i> <i>R<sub>k</sub></i>(<i>s</i>)</div></div>
            <div class="blk"><div class="sh"><span class="k">E4.2</span>Solver</div>
              <div class="eqs" style="font-size:20px;text-align:center"><i>V</i>(<i>s</i>) = max<sub><i>a</i> ∈ <i>A</i><sub>ens</sub>(<i>s</i>)</sub> [ <i>R</i>(<i>s</i>, <i>a</i>) + <i>γ</i> Σ<sub><i>s′</i></sub> <i>P</i>(<i>s′</i> | <i>s</i>, <i>a</i>) <i>V</i>(<i>s′</i>) ]</div>
              <div class="t" style="text-align:center">MDP: value iteration · POMDP: Monte Carlo tree search</div>
              <div class="cpc1">The max runs over <i>A</i><sub>ens</sub>(<i>s</i>) only: <b>capability precedes choice</b></div></div>
            <div class="po">Solver output: the policy <i>π</i></div>
          </div></div>

        <div class="outc" data-step="5" style="left:110px;top:660px;width:1340px;height:176px">
          <div class="o1"><div class="ot">Output: a sequence of maneuvers</div><div class="eqs big"><i>π</i>(<i>s</i><sub>0</sub>) = <i>A</i><sub>1</sub> → <i>A</i><sub>2</sub> → <i>A</i><sub>3</sub></div><div class="t">here keep lane → change left → change right</div></div>
          <img src="${F}arch_pol.jpg" alt="Sequence KL, LCL, LCR" style="width:540px;border-radius:8px">
          <div class="o3"><b>Only <i>A</i><sub>1</sub> is executed</b><div class="t">then the plan is rebuilt from the new state (receding horizon)</div></div></div>

        <svg class="wires" viewBox="0 0 1792 852" aria-hidden="true">
          <defs><marker id="arB-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#063669"/></marker>
          <marker id="arB-m" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="#a8237e"/></marker></defs>
          <g transform="translate(-118 0)">
            <g data-step="5"><path class="w am" d="M290 535 L470 490 L640 522 L724 522"/></g>
            <g class="after" data-step="1"><path class="w" d="M124 535 H258" marker-end="url(#arB-n)"/>
              <g class="nd"><circle cx="290" cy="535" r="28"/><text class="nt" x="290" y="537">s₀</text></g></g>
            <g data-step="2">
              <path class="w" d="M380 384 V340" marker-end="url(#arB-n)"/>
              <path class="w" d="M640 338 V382" marker-end="url(#arB-n)"/>
              <path class="w" d="M317 528 L444 497" marker-end="url(#arB-n)"/>
              <path class="w" d="M316 546 L444 581" marker-end="url(#arB-n)"/>
              <path class="w bad" d="M300 562 L321 603"/><text class="xx" x="325" y="613">✕</text>
              <text class="el" x="366" y="503">KL</text><text class="el" x="384" y="586">LCL</text><text class="el bad" x="250" y="606">LCR</text>
            </g>
            <g data-step="3">
              <path class="w" d="M780 470 H874" marker-end="url(#arB-n)"/>
              <path class="w" d="M878 590 H784" marker-end="url(#arB-n)"/>
              <path class="w" d="M492 486 L616 472" marker-end="url(#arB-n)"/>
              <path class="w" d="M491 497 L617 517" marker-end="url(#arB-n)"/>
              <path class="w" d="M492 588 L616 584" marker-end="url(#arB-n)"/>
              <path class="w bad" d="M486 603 L540 613"/><text class="xx" x="546" y="620">✕</text>
              <text class="el" x="546" y="471">KL</text><text class="el" x="530" y="530">LCL</text><text class="el" x="546" y="580">KL</text>
              <g class="nd p"><circle cx="470" cy="490" r="22"/><text class="nt" x="470" y="492">s₁</text></g>
              <g class="nd p"><circle cx="470" cy="588" r="22"/><text class="nt" x="470" y="590">s₂</text></g>
              <g class="nd p"><circle cx="640" cy="470" r="20"/><text class="nt sm" x="640" y="472">s₃</text></g>
              <g class="nd p"><circle cx="640" cy="522" r="20"/><text class="nt sm" x="640" y="524">s₄</text></g>
              <g class="nd p"><circle cx="640" cy="584" r="20"/><text class="nt sm" x="640" y="586">s₅</text></g>
              <text class="dots" x="700" y="476">…</text><text class="dots" x="700" y="590">…</text>
              <text class="dl" x="290" y="446">depth 0</text><text class="dl" x="470" y="446">depth 1</text><text class="dl" x="640" y="446">depth 2</text><text class="dl" x="738" y="446">… <tspan font-style="italic" font-family="Cambria Math, serif">H</tspan></text>
              <text class="el bad" x="672" y="616" style="font-size:13px">✕ not ensured</text>
            </g>
            <g data-step="5">
              <circle class="ring" cx="470" cy="490" r="27"/><circle class="ring" cx="640" cy="522" r="25"/>
              <text class="el am" x="680" y="514">LCR</text>
            </g>
          </g>
          <g data-step="4">
            <path class="w mg" d="M662 410 H712 V214 H754" marker-end="url(#arB-m)"/>
            <path class="w mg" d="M1160 214 H1204" marker-end="url(#arB-m)"/>
            <path class="w" d="M1250 74 V126" marker-end="url(#arB-n)"/>
          </g>
          <g data-step="5">
            <path class="w" d="M1330 626 V656" marker-end="url(#arB-n)"/>
            <path class="w" d="M1450 748 H1782" marker-end="url(#arB-n)"/>
          </g>
        </svg>
        <div class="sig after" data-step="1" style="left:14px;top:498px"><i>s</i><sub>0</sub> / <i>b</i><sub>0</sub></div>
        <div class="sig t after" data-step="1" style="left:14px;top:546px">from C</div>
        <div class="sig" data-step="2" style="left:104px;top:349px;width:150px;text-align:right">Query with state <i>s<sub>i</sub></i></div>
        <div class="sig" data-step="2" style="left:532px;top:347px"><i>A</i><sub>ens</sub>(<i>s<sub>i</sub></i>)</div>
        <div class="sig" data-step="3" style="left:668px;top:440px"><i>s<sub>i</sub></i>, <i>A</i><sub>ens</sub>(<i>s<sub>i</sub></i>)</div>
        <div class="sig" data-step="3" style="left:672px;top:597px">(<i>s<sub>i</sub></i>, <i>a</i>, <i>s′</i>)</div>
        <div class="sig" data-step="4" style="left:1262px;top:84px">Route plan <i>𝓡</i> from D: road segments, upcoming exit, destination</div>
        <div class="sig" data-step="5" style="left:1342px;top:630px">policy <i>π</i></div>
        <div class="sig" data-step="5" style="left:1490px;top:714px"><i>a<sub>t</sub></i> = (<i>m<sub>t</sub></i>, <i>θ<sub>t</sub></i>)</div>
        <div class="sig t" data-step="5" style="left:1470px;top:758px;line-height:1.2">current action, to the<br>ADAS features selector (F1)</div>
      </div>` },

    { id: "maneuvers", sec: "c1", c: ["C1"], kicker: "Mapping the ODD to the behavioral level", ref: "§4.4.1 – §4.4.2", time: 55,
      title: "The driving task is decomposed into maneuvers, each with its own boundaries",
      notes: "Asking whether the whole vehicle is within its ODD is too coarse. The task is decomposed into maneuvers, and the question is asked for each of them. Each maneuver has its own boundaries in the space of the operational constraints.",
      html: `<div class="card col" style="flex:1.3 1 0">${fig("decomposition.jpg", "Decomposition of the driving task into maneuvers")}</div>
        <div class="g3">
          <div class="card"><h4>Maneuvers</h4><div class="eq"><i>U</i> = {KL, LCL, LCR, MRM}</div><p class="small">Each maneuver activates an existing feature, configured by its parameters: target speed, target lane, time gap.</p></div>
          <div class="card"><h4>Operational domain</h4><div class="eq"><i>X</i><sub>ODD</sub> = <i>C</i><sub>1</sub> × <i>C</i><sub>2</sub> × … × <i>C<sub>n</sub></i></div><p class="small">Each constraint has its admissible values. The OD is a point of this space, moving along the journey.</p></div>
          <div class="card"><h4>Constraints</h4><p class="small"><b>Continuous</b> ones (visibility, density, speed) allow margins and gradual anticipation. <b>Discrete</b> ones (road type, works) change abruptly: their transitions must be predicted.</p></div>
        </div>` },

    { id: "operability", sec: "c1", c: ["C1"], kicker: "Ensured maneuvers and levels of operability", ref: "§4.4.3", time: 45,
      title: "Three levels of operability, from the set of ensured maneuvers",
      notes: "Three levels of operability. Degradation is per maneuver, not an intermediate level: a maneuver can remain ensured with a reduced performance range. The same assessment runs on predicted states, fed by the electronic horizon.",
      html: `<div class="g3">
          <div class="card ok col" style="gap:22px;padding:34px 36px"><span class="pill ok" style="align-self:flex-start;font-size:24px">Full operability</span><div class="eq" style="font-size:44px">${Uens()} = <i>U</i></div><p style="font-size:28px">Every maneuver is ensured, possibly in a degraded mode.</p></div>
          <div class="card deg col" style="gap:22px;padding:34px 36px"><span class="pill deg" style="align-self:flex-start;font-size:24px">Partial operability</span><div class="eq" style="font-size:44px">∅ ⊊ ${Uens()} ⊊ <i>U</i></div><p style="font-size:28px">A restricted operational domain: only some maneuvers remain.</p></div>
          <div class="card bad col" style="gap:22px;padding:34px 36px"><span class="pill bad" style="align-self:flex-start;font-size:24px">Loss of operability</span><div class="eq" style="font-size:44px">${Uens()} = ∅</div><p style="font-size:28px">No maneuver is ensured: a fallback is required.</p></div>
        </div>
        <div class="card amber"><p>Degradation is <b>per maneuver</b>, not an intermediate level: a maneuver can remain ensured with a reduced performance range.</p></div>
        <div class="takeaway">The same assessment runs on <b>predicted states</b>, fed by the electronic horizon. This is what makes anticipation possible.</div>` },

    { id: "skills", sec: "c1", c: ["C1"], kicker: "Assessing the decisional capability", ref: "§4.5.1 – §4.5.2", time: 60,
      title: "A maneuver is ensured when all its skills are fulfilled",
      notes: "Sense, Think, Act, after Pfeifer. Each skill is a requirement expressed on the operational domain, so it can be evaluated on a predicted context, which is what makes anticipation possible.",
      html: `<div class="row grow">
        <div class="card col" style="flex:1.25 1 0"><h4>Maneuver Capability Estimator (MCE)</h4>${fig("skills.png", "Skills of the Maneuver Capability Estimator")}</div>
        <div class="col grow">
          <div class="card eqbox"><div class="eq"><i>u<sub>i</sub></i> ∈ ${Uens()} ⇔ ∀<i>k</i> ∈ 𝒦(<i>u<sub>i</sub></i>), <i>f<sub>k</sub></i>(<i>S</i>) = 1</div><div class="xs mute">𝒦(<i>u</i>): the skills required by the maneuver <i>u</i></div></div>
          <div class="card tight"><span class="pill">Sense</span> <span class="small">acquire the information the maneuver needs: vehicles in the areas of interest, lane markings</span></div>
          <div class="card tight"><span class="pill">Think</span> <span class="small">process it for the decision: types the predictor supports, traffic density</span></div>
          <div class="card tight"><span class="pill gray">Act</span> <span class="small">execute the maneuver: assumed fulfilled in this work</span></div>
          <p class="small" style="margin:0">Skills are organized in graphs and shared between maneuvers. Every loss can be traced back to an identified change of context.</p>
        </div></div>` },

    { id: "v-mce", type: "video", sec: "c1", c: ["C1"], ref: "§4.5.2", time: 60,
      title: "The Maneuver Capability Estimator",
      notes: "Skill graphs per maneuver, evaluation in S_i, one skill lost (partial operability), a shared skill lost (MRM required), traceability back to the context.",
      video: { src: A + "mce.mp4", parts: [[0.0, "Each maneuver relies on its own skill graph"], [12.5, "A maneuver is ensured when all its skills are fulfilled"], [21.0, "A change of context affects only the maneuvers that need the skill"], [32.5, "A shared skill is lost: every maneuver that needs it is lost"], [44.5, "Every loss is traced back to a change of context"]] } },

    { id: "v-rss", type: "video", sec: "c1", c: ["C1"], ref: "§4.5.3", time: 40,
      title: "Application to a lane change: what distance to keep behind the front vehicle",
      notes: "The safe distance of RSS: enough to stop in time, and enough for the ACC to settle in smoothly behind a vehicle that slows down. It builds the required perception range of the Sense skill.",
      video: { src: A + "rss.mp4", parts: [[0.0, "How much distance to stop in time?"], [16.91, "How much distance to settle in smoothly behind it?"]] } },

    { id: "sense", sec: "c1", c: ["C1"], kicker: "Application to a lane change", ref: "§4.5.3", time: 60,
      title: "Sense: the perception range must cover the RSS distance in each zone",
      notes: "The lane change needs to see vehicles in zones A, B and C. The requirement depends on the speeds, through the RSS distance. Below about 67 m of visibility the lane change window vanishes, while Keep Lane remains ensured at a lower speed.",
      backups: ["b-rss"],
      html: `<div class="row grow">
        <div class="card col" style="flex:0.62 1 0"><h4>Zones of interest</h4>${fig("zones.jpg", "Zones A, B and C of the lane change")}</div>
        <div class="card col" style="flex:1 1 0"><h4>Required range per zone</h4>${fig("required_range.png", "Required perception range per zone")}</div>
        <div class="col" style="flex:0.85 1 0">
          <div class="card eqbox"><div class="eq" style="font-size:27px"><i>f</i><sub>veh</sub>(<i>S</i>) = 1 ⇔ <i>d</i><sub>PE</sub><sup><i>z</i></sup>(<i>S</i>) ≥ <i>d</i><sub>req</sub><sup><i>z</i></sup>(<i>S</i>), <i>z</i> ∈ {A, B, C}</div>
            <div class="xs mute">Built on the RSS safe distance, traffic speed 110 km/h ± 10 %</div></div>
          <div class="card tight stat"><span class="v">≈ 67 m</span><span class="l">of visibility: below it, the lane change is no longer ensured (≈ 114 km/h)</span></div>
          <div class="card tight stat"><span class="v">≈ 81 m</span><span class="l">the same limit with the uncertainty margins</span></div>
          <div class="card tight stat"><span class="v">≈ 95 km/h</span><span class="l">highest speed for Keep Lane with 50 m of visibility</span></div>
        </div></div>` },

    { id: "v-window", type: "video", sec: "c1", c: ["C1"], ref: "§4.5.3", time: 65,
      title: "The lane change window closes in the fog",
      notes: "The perception range required in three zones defines a speed window for the lane change. Fog narrows it until it closes, while keeping the lane remains ensured.",
      video: { src: A + "window.mp4", parts: [[0.0, "Required perception range: one RSS rule, three zones"], [6.0, "Speed trades the rear zone against the front zones"], [14.5, "Above both curves, the lane change is ensured"], [18.5, "Fog shrinks the envelope: the speed window narrows"], [27.0, "Too slow or too fast: a zone is no longer covered"], [36.0, "Below ≈ 67 m: Keep Lane ensured, lane change not ensured"], [46.5, "Uncertainty on the traffic speed: the limit rises to ≈ 81 m"]] } },

    { id: "other-skills", sec: "c1", c: ["C1"], kicker: "Application to a lane change", ref: "§4.5.3", time: 45,
      title: "Lane markings, prediction and interaction complete the skill graph",
      notes: "Three other skills. The density skill is the one used for the congestion before the exit. Degradation is per maneuver: Keep Lane can remain ensured with a reduced performance range.",
      html: `<div class="g3">
          <div class="card col"><span class="pill" style="align-self:flex-start">Sense · lane markings</span><div class="eq" style="margin:18px 0;font-size:29px"><i>f</i><sub>lane</sub>(<i>S</i>) = 1 ⇔ <i>d</i><sub>PE</sub><sup>lane</sup>(<i>S</i>) ≥ <i>D</i><sub>min</sub>(<i>S</i>)</div><p class="small">The markings of the target lane are detected over the stopping distance at the current speed.</p></div>
          <div class="card col"><span class="pill" style="align-self:flex-start">Think · prediction</span><div class="eq" style="margin:18px 0;font-size:29px"><i>f</i><sub>pred</sub>(<i>S</i>) = 1 ⇔ every perceived vehicle is regular</div><p class="small">Emergency vehicles and two-wheelers fall outside what the predictor models.</p></div>
          <div class="card col"><span class="pill" style="align-self:flex-start">Think · interaction</span><div class="eq" style="margin:18px 0;font-size:29px"><i>f</i><sub>inter</sub>(<i>S</i>) = 1 ⇔ <i>ρ</i>(<i>S</i>) ≤ <i>ρ</i><sub>max</sub></div><p class="small">The lane change function is designed for fluid traffic and does not negotiate gaps. The electronic horizon announces the density in advance.</p></div>
        </div>
        <div class="card ok"><p><b>Keep Lane</b> does not need the rear zone, and its forward requirement drops with the speed. It stays ensured, in a degraded mode, when the lane change is lost.</p></div>` },

    { id: "margin", sec: "c1", c: ["C1"], kicker: "Strategic margin", ref: "§4.5, §5.2.5", time: 60, steps: 2,
      title: "Ensured, but how close to the boundary? The strategic margin",
      notes: "Ensured is binary: it says whether a maneuver is available, not how close it is to being lost. With 50 m of visibility, Keep Lane is ensured up to about 95 km/h. At 50 km/h it is far from the boundary. At 90 km/h it is still ensured, but on the edge: a little less visibility and it is lost. The strategic margin measures this distance. (1) For each skill, the ratio of the available quantity to the required one, for instance the perception range we have over the range we need: 1 on the boundary. The designer chooses m: from m on, the skill is comfortably fulfilled. The normalized margin w goes from 0 on the boundary to 1 in this preferred region, and an action is as close to the boundary as its most constrained skill. (2) This distance enters the operability term of the reward: each ensured action counts with its margin. The planner then prefers states far from the boundaries, so it slows down earlier in fog, and completes its lane changes before a dense section. But a maneuver close to its boundary is never removed: the margin is a preference, not a second boundary.",
      backups: ["b-margin"],
      html: `<div class="col grow">
        <div class="card mgbar"><h4>Keep Lane with 50 m of visibility: at each speed of the ego vehicle, how close to the boundary?</h4>
          <div class="mg-scale">
            <div class="seg ok" style="width:43.08%"><b>Preferred region</b><span>far from the boundary · <i class="m">w</i> = 1</span></div>
            <div class="seg near" style="width:30%"><b>Ensured, but close</b><span>closer and closer · <i class="m">w</i>: 1 → 0</span></div>
            <div class="seg out" style="width:26.92%"><b>Not ensured</b><span>beyond the boundary</span></div>
            <div class="tick" style="left:43.08%"><span><b>56 km/h</b> · <i class="m">ρ</i> = <i class="m">m</i> = 1.5</span></div>
            <div class="tick" style="left:73.08%"><span><b>95 km/h</b> · boundary, <i class="m">ρ</i> = 1</span></div>
          </div>
          <div class="mg-probe"><div class="pr" style="left:38.46%"><b>50 km/h</b>: far from the boundary</div>
            <div class="pr near" style="left:69.23%"><b>90 km/h</b>: still ensured, but on the edge</div>
            <span class="end">0 km/h</span><span class="end r">130 km/h</span></div></div>
        <div class="row grow">
          <div class="card col grow" data-step="1" style="gap:12px"><h4>Measure: how far from the boundary</h4>
            <div class="eqbox"><div class="eq"><i>ρ<sub>k</sub></i>(<i>s</i>) = <span class="fr"><span><i>g<sub>k</sub></i><sup>av</sup>(<i>s</i>)</span><span><i>g<sub>k</sub></i><sup>req</sup>(<i>s</i>)</span></span>
              &nbsp;&nbsp; <i>w<sub>k</sub></i>(<i>s</i>) = min(1, <span class="fr"><span><i>ρ<sub>k</sub></i>(<i>s</i>) − 1</span><span><i>m<sub>k</sub></i> − 1</span></span>)</div></div>
            <ul class="list"><li>Available over required, for instance the perception range we have over the range we need: <b>1 on the boundary</b></li>
              <li><i class="m">w<sub>k</sub></i> = 0 on the boundary, 1 from <i class="m">m<sub>k</sub></i> on: the preferred region</li>
              <li>An action is as close as its most constrained skill: <i class="m">w<sub>a</sub></i> = min<sub><i class="m">k</i></sub> <i class="m">w<sub>k</sub></i></li></ul></div>
          <div class="card col grow" data-step="2" style="gap:12px"><h4>Use: a preference in the reward, not a second boundary</h4>
            <div class="eqbox"><div class="eq"><i>R</i><sub>op</sub>(<i>s</i>) = −( 1 − <sup>1</sup>⁄<sub>|<i>A</i>|</sub> Σ<sub><i>a</i> ∈ ${Aens()}</sub> <i>w<sub>a</sub></i>(<i>s</i>) )</div></div>
            <ul class="list"><li>Each ensured action counts with its margin: the planner prefers states far from the boundaries, and slows down earlier in fog</li>
              <li>No maneuver is removed: ${Aens()} is unchanged</li>
              <li><i class="m">m<sub>k</sub></i> ≥ 1, chosen by the designer: room for what the models do not represent, at the cost of a more conservative behavior</li></ul></div>
        </div></div>` },

    { id: "bridge-c1", type: "bridge", sec: "c1", dark: true, kicker: "Limitation", time: 30,
      title: "Ensured now, but what about the states the decision leads to?",
      notes: "The MCE answers a question about one state. A decision is a sequence: a maneuver ensured now can lead to a state where nothing is ensured, as in the problem shown at the start. So the decision must chain maneuvers and check every predicted state. This is the second contribution.",
      html: `<div class="bridge"><div class="k">Limitation of the assessment alone</div>
        <div class="q">Ensured now, but what about the states the decision leads to?</div>
        <ul class="chk"><li class="y"><b>Capability</b>: the MCE tells which maneuvers are ensured in a given state, current or predicted</li>
          <li class="n">A maneuver ensured now can lead to a state where no fallback is ensured, ${go("v-problem-a", "as in the problem")}</li>
          <li class="to"><b>Choice</b>: chain maneuvers among the ensured ones, and check every predicted state</li></ul>
        <a class="next" data-go="sec-c2" href="#/sec-c2"><span class="cbadge solid">C2</span> How to decide without losing the fallback? →</a></div>` },

    // ================================================================ 4. C2 · choice: ODD-constrained MDP (part II, chapter 5, §5.2)
    { id: "sec-c2", type: "section", sec: "c2", dark: true, title: "C2 · How to decide without losing the fallback?", time: 10 },

    { id: "odd-mdp", sec: "c2", c: ["C2"], kicker: "Formalism", ref: "§5.2.1 – §5.2.3", time: 80,
      title: "The ODD-MDP: capability enters the Bellman equation",
      notes: "Why an MDP. It represents sequential decisions over a horizon. It handles uncertainty in the transitions and extends to partial observability, which the third contribution uses. Tactical maneuvers form a discrete set of actions. And its elements can be tuned from data, as in reinforcement learning. The state joins the operational domain, the ego vehicle and the surrounding vehicles: including the OD is what lets the filter and the reward depend on the context. An action pairs a maneuver with a set speed change. The MCE returns the ensured actions of a state, in every predicted state. The only change to the Bellman equation: the maximum runs over the ensured actions. Capability precedes choice is written into the equation, and the policy is ODD-compliant by construction, not by verification.",
      html: `<div class="row" style="gap:24px">
          <div class="card col" style="flex:0.78 1 0;gap:10px"><h4>Why an MDP</h4><ul class="chk small" style="gap:10px">
            <li class="y">Sequential decisions over a horizon</li>
            <li class="y">Uncertain transitions, extends to partial observability (${go("sec-c3", "C3")})</li>
            <li class="y">Maneuvers form a discrete set of actions</li>
            <li class="y">Elements tunable from data, as in reinforcement learning</li></ul></div>
          <div class="card grow defs">
            <span class="pill">Model</span><div class="eq"><i>M</i> = (<i>S</i>, <i>A</i>, <i>P</i>, <i>R</i>, <i>γ</i>)</div>
            <span class="pill">State</span><div class="eq"><i>S</i> = OD × <i>p</i><sub>ego</sub> × {<i>p<sub>i</sub></i>}<sub><i>i</i>=1</sub><sup><i>N</i></sup>, &nbsp; <i>p<sub>i</sub></i> = (<i>x<sub>i</sub></i>, <i>ẋ<sub>i</sub></i>, <i>ẍ<sub>i</sub></i>, <i>y<sub>i</sub></i>, <i>ẏ<sub>i</sub></i>, <i>ÿ<sub>i</sub></i>)</div>
            <span class="pill">Actions</span><div class="eq"><i>A</i> = {KL, INC, DEC, LCL, LCR, MRM}, &nbsp; <i>a</i> = (<i>m</i>, <i>θ</i>)</div>
            <span class="pill ok">Capability</span><div class="eq"><i>g</i>(<i>s</i>) = ${Aens()} ⊆ <i>A</i> &nbsp;<span class="xs mute" style="font-family:Montserrat,sans-serif">the MCE, in every predicted state</span></div>
          </div></div>
        <div class="card bellman">
          <div class="eq big"><i>V</i>*(<i>s</i>) = <span class="lim"><span class="o hcho">max</span><span class="u hcap"><i>a</i> ∈ ${Aens()}</span></span> [ <i>R</i>(<i>s</i>, <i>a</i>) + <i>γ</i> Σ<sub><i>s</i>′</sub> <i>P</i>(<i>s</i>′ | <i>s</i>, <i>a</i>) <i>V</i>*(<i>s</i>′) ]
            <span style="display:inline-block;width:60px"></span><i>π</i>*(<i>s</i>) = <span class="lim"><span class="o hcho">argmax</span><span class="u hcap"><i>a</i> ∈ ${Aens()}</span></span> <i>Q</i>*(<i>s</i>, <i>a</i>)</div>
          <div class="legend"><span><i class="sw cho"></i><b>Choice</b>: the policy planner, over the whole horizon</span><span><i class="sw cap"></i><b>Capability</b>: only the maneuvers the MCE ensures</span></div></div>
        <div class="takeaway"><b>Capability precedes choice</b>, written into the equation: no maneuver that is not ensured enters the value function, so the policy is <b>ODD-compliant by construction</b>, not by verification.</div>` },

    { id: "v-search", type: "video", sec: "c2", c: ["C2"], ref: "§5.2.3, §5.2.7", time: 55,
      title: "The search tree of the ODD-MDP",
      notes: "How far to explore, where to explore once the MCE prunes what leaves the ODD, the best ensured sequence, and the search that starts again after each action.",
      video: { src: A + "search.mp4", parts: [[0.0, "Deciding means exploring possible futures"], [6.5, "How far to explore: the planning horizon"], [17.0, "Where to explore: pruning with the MCE"], [28.5, "Among the ensured futures, the best sequence"], [36.0, "Execute the first action, then explore again"]] } },

    { id: "mdp-solve", sec: "c2", c: ["C2"], kicker: "Resolution", ref: "§5.2.4, §5.2.7", time: 60,
      title: "Predict each ensured action, then solve the tree by value iteration",
      notes: "How the model is built and solved. The surrounding vehicles follow a constant acceleration model in their lane, without interactions. The ego vehicle follows the kinematics of the maneuver, with ACC behind a leader. The operational domain ahead is not predicted: it is read from the electronic horizon. The state predictor returns one successor for each ensured action, and the MCE is called again on each successor: this builds the tree of ensured state-action pairs. Value iteration then runs on that tree, with the maximum over the ensured actions only. Only the first action is executed, and the whole tree is rebuilt at the next cycle.",
      backups: ["b-transition", "b-vi"],
      html: `<div class="row grow">
        <div class="col" style="flex:1.12 1 0">
          <div class="card col" style="gap:8px"><h4>Transition and prediction</h4>
            <div class="eqrow"><div class="eq"><i>p</i><sub><i>i</i>,<i>t</i>+1</sub> = <i>F</i> <i>p</i><sub><i>i</i>,<i>t</i></sub> + <i>G</i> (<i>ẍ</i><sub><i>i</i>,<i>t</i></sub>, <i>ÿ</i><sub><i>i</i>,<i>t</i></sub>)<sup>⊤</sup></div><span>surrounding vehicles: constant acceleration, in their lane</span></div>
            <div class="eqrow"><div class="eq"><i>p</i><sub>ego,<i>t</i>+1</sub> = <i>f</i>(<i>p</i><sub>ego,<i>t</i></sub>, <i>a<sub>t</sub></i>)</div><span>ego: kinematics of the maneuver, ACC behind a leader</span></div>
            <div class="eqrow"><div class="eq"><i>Ŝ</i><sub><i>t</i>+1</sub><sup><i>a</i></sup> = <i>f</i>(<i>S<sub>t</sub></i>, <i>a</i>), &nbsp;<i>a</i> ∈ ${Aens("S<sub>t</sub>")}</div><span>one successor per ensured action</span></div>
            <p class="xs mute" style="margin:2px 0 0">Operational domain ahead: read from the electronic horizon, not predicted</p></div>
          <div class="card col grow" style="gap:8px"><h4>Resolution: value iteration restricted to the ensured actions</h4>
            <div class="eq"><i>Q</i>(<i>s</i>, <i>a</i>) = <i>R</i>(<i>s</i>, <i>a</i>) + <i>γ</i> Σ<sub><i>s</i>′</sub> <i>P</i>(<i>s</i>′ | <i>s</i>, <i>a</i>) <i>V</i>(<i>s</i>′), &nbsp; <i>a</i> ∈ ${Aens()}</div>
            <div class="eq"><i>V</i>(<i>s</i>) ← max<sub><i>a</i> ∈ ${Aens()}</sub> <i>Q</i>(<i>s</i>, <i>a</i>) &nbsp; until &nbsp;max<sub><i>s</i></sub> |Δ<i>V</i>| &lt; <i>ε</i></div>
            <div class="eq"><i>a<sub>t</sub></i> = <i>π</i>*(<i>s</i><sub>0</sub>) = argmax<sub><i>a</i> ∈ ${Aens("s<sub>0</sub>")}</sub> <i>Q</i>(<i>s</i><sub>0</sub>, <i>a</i>)</div></div>
        </div>
        <div class="card col grow">${fig("tree.png", "Tree of ensured state-action pairs")}
          <ul class="list xs" style="margin-top:8px">
            <li>Horizon of four maneuvers, 14 to 20 s; an action pairs a maneuver with a set speed step of 10 km/h</li>
            <li>Only the first action is executed; the tree is rebuilt every 200 to 300 ms</li></ul></div>
        </div>` },

    { id: "reward", sec: "c2", c: ["C2"], kicker: "Reward function", ref: "§5.2.5", time: 70,
      title: "Among the ensured maneuvers, the reward ranks the options",
      notes: "Five objectives: safety, legal compliance, progress, the route, and operability. The first terms are classical. The operability terms are what makes the policy anticipate. The first one counts the ensured actions, each weighted by its margin to the boundary of its most constrained skill: the planner prefers states where the remaining maneuvers are comfortably ensured. The second one penalizes predicted states, beyond a time threshold, from which no minimal risk maneuver is reachable, more as they are later. The weights put collision first, then the reachable fallback, then operability. And because the model is explicit and the reward is a sum of named terms, every decision can be explained: compared with simply keeping the lane, term by term, now and over the horizon, which gives its main reason and what it costs. The details are in the appendix.",
      backups: ["b-reward", "b-fallback"],
      html: `<div class="card eqbox" style="padding:14px 24px 10px"><div class="eq" style="font-size:29px"><i>R</i>(<i>s</i>) = <span class="grp"><span><i>W</i><sub>col</sub><i>R</i><sub>col</sub> + <i>W</i><sub>risk</sub><i>R</i><sub>risk</sub></span><span class="lab">safety</span></span> + <span class="grp"><span><i>W</i><sub>legal</sub><i>R</i><sub>legal</sub></span><span class="lab">legal</span></span> + <span class="grp"><span><i>W</i><sub>speed</sub><i>R</i><sub>speed</sub></span><span class="lab">progress</span></span> + <span class="grp"><span><i>W</i><sub>route</sub><i>R</i><sub>route</sub></span><span class="lab">route</span></span> + <span class="grp op"><span><i>W</i><sub>op</sub><i>R</i><sub>op</sub> + <i>W</i><sub>time</sub><i>R</i><sub>time</sub></span><span class="lab">operability</span></span></div></div>
        <div class="row grow">
          <table class="tbl" style="flex:1 1 0;font-size:21px"><tr><th style="width:150px">Term</th><th>Definition</th></tr>
            <tr><td><b>Collision</b></td><td><span class="eq" style="font-size:25px"><i>R</i><sub>col</sub>(<i>s</i>) = −𝟙<sub>col</sub>(<i>s</i>)</span>, during the execution or at the resulting state</td></tr>
            <tr><td><b>Risk</b></td><td><span class="eq" style="font-size:25px">TTC<sub><i>i</i></sub> = <i>d<sub>i</sub></i> / (<i>v</i><sub>ego</sub> − <i>v<sub>i</sub></i>), &nbsp;TIV<sub><i>i</i></sub> = <i>d<sub>i</sub></i> / <i>v</i><sub>ego</sub></span>, worst vehicle of the ego lane</td></tr>
            <tr><td><b>Legal</b></td><td>relative excess over the speed limit</td></tr>
            <tr><td><b>Progress</b></td><td><span class="eq" style="font-size:25px"><i>R</i><sub>speed</sub>(<i>s</i>) = <i>v</i><sub>ego</sub> / <i>v</i><sub>max</sub></span>, the only positive term</td></tr>
            <tr><td><b>Route</b></td><td>the lane occupied, more as the next itinerary event approaches</td></tr></table>
          <div class="col" style="flex:1.05 1 0">
            <div class="card ok tight"><h4>Loss of ensured maneuvers</h4><div class="eq" style="font-size:29px"><i>R</i><sub>op</sub>(<i>s</i>) = −( 1 − <sup>1</sup>⁄<sub>|<i>A</i>|</sub> Σ<sub><i>a</i> ∈ ${Aens()}</sub> <i>w<sub>a</sub></i>(<i>s</i>) )</div>
              <p class="xs mute" style="margin:0"><i class="m">w<sub>a</sub></i>(<i class="m">s</i>) = min<sub><i class="m">k</i> ∈ 𝒦(<i class="m">a</i>)</sub> <i class="m">w<sub>k</sub></i>(<i class="m">s</i>): margin of the most constrained skill, 1 in its preferred region, 0 on its boundary</p></div>
            <div class="card ok tight"><h4>Fallback availability</h4><div class="eq" style="font-size:29px"><i>R</i><sub>time</sub>(<i>s</i>) = −[ <i>t</i><sub>pred</sub>(<i>s</i>) − <i>T</i><sub>thr</sub> ]<sub>+</sub> ( 1 − 𝟙<sub>MRM</sub>(<i>s</i>) )</div>
              <p class="xs mute" style="margin:0">a predicted state beyond <i class="m">T</i><sub>thr</sub> with no reachable MRM is penalized, more as it is later</p></div>
            <div class="card tight" style="text-align:center"><div class="eq" style="font-size:28px"><i>W</i><sub>col</sub> ≫ <i>W</i><sub>time</sub> &gt; <i>W</i><sub>op</sub> &gt; <i>W</i><sub>risk</sub> &gt; <i>W</i><sub>legal</sub> &gt; <i>W</i><sub>speed</sub></div></div>
            <div class="card navy tight xhint"><h4>Model-based, so every decision can be explained</h4>
              <p>Each term is known in every predicted state. Compared with <b>keep lane</b>, term by term, a decision gives its <b>main reason</b> and its <b>trade-off</b>, now and over the horizon. ${go("b-explain", "Appendix →")}</p></div>
          </div></div>` },

    { id: "safe", sec: "c2", c: ["C2"], kicker: "Safe states and fail-operational strategies", ref: "§5.2.6", time: 60,
      title: "Fail-operational: every predicted state keeps a fallback available",
      notes: "The fail-operational property, made explicit. It is pursued by the filter and the reward together. On the right, two policies in the plane of speed and perception range: only the anticipatory one keeps every state inside the skill-fulfilled region.",
      backups: ["b-mrm"],
      html: `<div class="row grow">
        <div class="col grow">
          <div class="card eqbox"><div class="eq"><i>s</i> ∈ <i>S</i><sub>safe</sub> ⇔ MRM ∈ ${Aens()}</div><div class="eq">∀<i>k</i> ∈ {0, …, <i>H</i>}, &nbsp;<i>s<sub>k</sub></i> ∈ <i>S</i><sub>safe</sub></div></div>
          <div class="card grow"><p>A state is safe when a fallback remains available from it. The policy seeks to keep every state reached over the horizon in that set.</p>
            <h4 style="margin-top:12px">Two mechanisms act jointly</h4><ul class="list small">
            <li>The <b>filter</b> excludes what is not ensured</li>
            <li>The <b>operability terms</b> prefer margin and a reachable MRM, so the policy anticipates the boundaries</li></ul>
            <p class="small navyt" style="margin-top:12px"><b>The filter alone does not anticipate. The reward alone does not exclude.</b></p></div>
        </div>
        <div class="card col" style="flex:1.05 1 0">${fig("policy_plane.png", "Two policies in the speed and perception range plane")}
          <p class="xs mute">Both start at 90 km/h with 200 m of range; visibility falls to 40 m. The non-anticipatory policy reaches ≈ 117 km/h and crosses the boundary. The anticipatory one holds ≈ 95 km/h, then slows to ≈ 55 km/h.</p></div>
        </div>` },

    { id: "bridge-c2", type: "bridge", sec: "c2", dark: true, kicker: "Limitation", time: 30,
      title: "What if the perceived state is wrong?",
      notes: "The ODD-MDP decides among ensured maneuvers and keeps a fallback reachable over the whole horizon. But it takes the perceived state as exact. Positions and speeds are noisy, the fog forecast can be wrong, and the intentions of the other drivers are hidden. The third contribution keeps the same principle under this uncertainty.",
      html: `<div class="bridge"><div class="k">Limitation of the ODD-MDP</div>
        <div class="q">What if the perceived state is wrong?</div>
        <ul class="chk"><li class="y"><b>Choice</b> only among ensured maneuvers, with a fallback kept reachable over the whole horizon</li>
          <li class="n">The perceived state is taken as exact: noisy positions and speeds, an uncertain fog forecast, hidden intentions</li>
          <li class="to">Keep capability before choice when the state is uncertain</li></ul>
        <a class="next" data-go="sec-c3" href="#/sec-c3"><span class="cbadge solid">C3</span> And when the vehicle is uncertain? →</a></div>` },

    // ================================================================ 5. C3 · choice under uncertainty: ODD-constrained POMDP (part II, chapter 5, §5.3)
    { id: "sec-c3", type: "section", sec: "c3", dark: true, title: "C3 · And when the vehicle is uncertain?", time: 10 },

    { id: "pomdp-sources", sec: "c3", c: ["C3"], kicker: "Extension to partial observability", ref: "§5.3.1 – §5.3.2", time: 55,
      title: "Three sources of uncertainty, one belief over particles",
      notes: "Three sources, which do not play the same role. Noise on the vehicles changes which gap looks acceptable. The forecast uncertainty enters the skills, so this is where the capability reasoning matters most. Intentions stay hidden whatever the sensor quality. Each card links to its experiment, in the validation of chapter 6.",
      html: `<div class="card tight" style="height:250px">${fig("uncertainty.png", "Three sources of uncertainty", 214)}</div>
        <div class="g3 grow">
          ${[["1", "Surrounding vehicles", "Noisy position and speed of the other vehicles", "Which gap looks safe, through the prediction and the reward", "Fit into a platoon before the fog, 100 seeds", "r-noisy"],
             ["2", "Visibility forecast", "Where the fog starts and how dense it is", "The skills themselves, so the capability assessment", "Fog denser or lighter than announced, 20 seeds", "r-forecast"],
             ["3", "Tactical intentions", "Whether a car will cut in", "The predicted traffic, with braking in some of the futures", "Truck cut-in, illustrative run", "r-cutin"]]
            .map(([n, t, u, a, e, to]) => `<div class="card col" style="gap:8px"><div class="row" style="align-items:center;gap:16px"><div class="num-badge">${n}</div><h3 style="margin:0">${t}</h3></div>
              <p class="small"><b class="mute">Uncertain:</b> ${u}</p><p class="small"><b class="mute">Acts on:</b> ${a}</p>
              <p class="small" style="margin-top:auto"><b class="mute">Experiment:</b> ${go(to, e + " →")}</p></div>`).join("")}
        </div>` },

    { id: "pomdp", sec: "c3", c: ["C3"], kicker: "Formalism", ref: "§5.3.1 – §5.3.4", time: 60,
      title: "The ODD-POMDP: the belief replaces the state, the principle stays",
      notes: "The POMDP adds the observations and their model to the tuple. The vehicle no longer knows the state: it maintains a belief, represented by particles. The observations are the estimated kinematic states of the surrounding vehicles, Gaussian around the true state, and their intentions, estimated by a Gaussian naive Bayes classifier on four features. Each element of the ODD-MDP has its counterpart. The ensured set is now defined on the belief, with a threshold tau, and value iteration gives way to Monte Carlo planning. Capability still precedes choice, now in probability.",
      html: `<div class="row" style="gap:24px">
          <div class="card defs grow">
            <span class="pill">Model</span><div class="eq">𝒫 = (<i>S</i>, <i>A</i>, <i>T</i>, <i>R</i>, <i>O</i>, <i>Z</i>, <i>γ</i>)</div>
            <span class="pill">Belief</span><div class="eq"><i>b<sub>t</sub></i> ≈ {<i>s<sub>t</sub></i><sup>(<i>i</i>)</sup>}<sub><i>i</i>=1</sub><sup><i>N</i></sup> &nbsp;<span class="xs mute" style="font-family:Montserrat,sans-serif">particles</span></div>
            <span class="pill">Observation</span><div class="eq"><i>o<sub>t</sub></i> = {(<i>p̂<sub>i</sub></i><sup>kin</sup>(<i>t</i>), <i>û<sub>i</sub></i>(<i>t</i>))}<sub><i>i</i>=1</sub><sup><i>N</i><sub>veh</sub></sup>, &nbsp; <i>p̂<sub>i</sub></i><sup>kin</sup> ~ 𝒩(<i>p<sub>i</sub></i><sup>kin</sup>, <i>Σ<sub>i</sub></i>)</div>
            <span class="pill">Intention</span><div class="eq"><i>P</i>(<i>u</i> | <i>z</i>) ∝ <i>P</i>(<i>u</i>) Π<sub><i>k</i>=1</sub><sup>4</sup> 𝒩(<i>z<sub>k</sub></i> | <i>μ<sub>u,k</sub></i>, <i>σ</i><sup>2</sup><sub><i>u,k</i></sub>)</div>
          </div></div>
        <table class="tbl grow" style="font-size:22px"><tr><th style="width:230px"></th><th>ODD-MDP</th><th>ODD-POMDP</th></tr>
          <tr><td><b>State</b></td><td>fully observed, <i class="m">s</i></td><td>belief over particles, <i class="m">b<sub>t</sub></i></td></tr>
          <tr class="hl"><td><b>Capability</b></td><td><span class="eq" style="font-size:25px">${Aens()}</span></td><td><span class="eq" style="font-size:25px">${Aens("b<sub>t</sub>")} = {<i>a</i> | <i>P</i>(<i>a</i> ensured | <i>b<sub>t</sub></i>) ≥ <i>τ</i>}</span></td></tr>
          <tr><td><b>Choice</b></td><td>value iteration on the tree of ensured states</td><td>POMCP: selection, expansion and rollout among the ensured actions</td></tr>
          <tr><td><b>Uncertainty</b></td><td>in the transitions</td><td>noisy vehicles, fog forecast, hidden intentions</td></tr></table>
        <div class="takeaway"><b>Capability precedes choice</b> still holds: the ensured set becomes a probability, with an explicit threshold <i class="m">τ</i>.</div>` },

    { id: "v-pomcp-a", type: "video", sec: "c3", c: ["C3"], ref: "§5.3.3 – §5.3.4", time: 45,
      title: "The belief, and an action ensured for a share τ of the particles",
      notes: "The current state is only estimated: noisy position and speed, uncertain intentions, an uncertain fog forecast. The belief keeps several possible states, the particles. The MCE checks the action in every particle: it is ensured only if a share τ of the particles ensures it.",
      video: { src: A + "pomcp.mp4", parts: [[0.0, "Under uncertainty, the current state becomes a belief"], [19.0, "An action is ensured when a share τ of the particles ensures it"]], end: 30.6 } },

    { id: "belief", sec: "c3", c: ["C3"], kicker: "Ensured actions at the belief level", ref: "§5.3.3 – §5.3.4", time: 45,
      title: "An action is ensured when a share τ of the particles ensures it",
      notes: "The ensured set is now defined on the belief. An action is kept when the share of particles in which it is ensured reaches the threshold tau. The guarantee becomes probabilistic, and tau an explicit design parameter, 0.9 in the experiments.",
      html: `<div class="row grow">
        <div class="col grow">
          <div class="card col" style="gap:14px"><div class="row" style="justify-content:space-between;align-items:center"><h3 style="margin:0">Keep Lane</h3><span class="pill ok">ensured</span></div>
            <div class="cloud">${"<i></i>".repeat(18)}${'<i class="x"></i>'.repeat(2)}</div><div class="eq" style="text-align:center;font-size:30px">18 / 20 = 0.90 ≥ <i>τ</i></div></div>
          <div class="card col" style="gap:14px"><div class="row" style="justify-content:space-between;align-items:center"><h3 style="margin:0">Lane change left</h3><span class="pill bad">not ensured</span></div>
            <div class="cloud">${"<i></i>".repeat(14)}${'<i class="x"></i>'.repeat(6)}</div><div class="eq" style="text-align:center;font-size:30px">14 / 20 = 0.70 &lt; <i>τ</i></div></div>
          <p class="xs mute" style="margin:0">Illustration with <i class="m">N</i> = 20 particles and <i class="m">τ</i> = 0.9. Green: the action is ensured in that particle.</p>
        </div>
        <div class="col grow">
          <div class="card eqbox" style="text-align:left"><div class="eq" style="font-size:30px"><i>b<sub>t</sub></i> ≈ {<i>s<sub>t</sub></i><sup>(<i>i</i>)</sup>}, &nbsp;<i>i</i> = 1, …, <i>N</i></div>
            <div class="eq" style="font-size:30px"><i>P</i>(<i>a</i> ensured | <i>b<sub>t</sub></i>) ≈ (1/<i>N</i>) Σ<sub><i>i</i></sub> 𝟙[<i>a</i> ∈ ${Aens("s<sub>t</sub><sup>(i)</sup>")}]</div>
            <div class="eq" style="font-size:30px">${Aens("b<sub>t</sub>")} = {<i>a</i> | <i>P</i>(<i>a</i> ensured | <i>b<sub>t</sub></i>) ≥ <i>τ</i>}</div></div>
          <div class="card grow"><ul class="list small">
            <li>The belief is rebuilt each cycle from the world model: one particle holds the estimated scene, the others are drawn with the measurement noise and the estimated intentions</li>
            <li>The guarantee becomes probabilistic, and <i class="m">τ</i> an explicit design parameter, 0.9 in the experiments</li></ul></div>
        </div></div>` },

    { id: "v-pomcp-b", type: "video", sec: "c3", c: ["C3"], ref: "§5.3.6", time: 55,
      title: "The ODD-constrained Monte Carlo search",
      notes: "Each simulation draws one particle and follows ensured actions up to the horizon. Simulation after simulation, the tree grows toward the most promising ensured actions. Only the best ensured action is executed, the belief is rebuilt and the search starts again.",
      video: { src: A + "pomcp.mp4", parts: [[30.6, "Monte Carlo search: one simulation at a time"], [46.0, "Many simulations: the tree grows where it matters"], [59.37, "Execute the best ensured action, rebuild the belief, search again"]] } },

    { id: "pomcp", sec: "c3", c: ["C3"], kicker: "Resolution through Monte Carlo planning", ref: "§5.3.5 – §5.3.6", time: 50,
      title: "ODD-constrained POMCP: the MCE filters selection, expansion and rollout",
      notes: "POMCP with the capability filter at the three stages where actions are chosen. The final action is the best ensured action at the root. For the ODD-MDP, intentions enter through a tactical risk term; in the ODD-POMDP, the particles carry them.",
      backups: ["b-pomcp", "b-cost"],
      html: `<div class="g4">
          ${[["Selection", "UCB1 among the ensured actions of the node", 1], ["Expansion", "new nodes only for ensured actions", 1], ["Rollout", "random policy drawn from the ensured actions", 1], ["Backpropagation", "the return updates values and visit counts", 0]]
            .map(([t, d, f], j) => `<div class="card col" style="gap:10px"><div class="row" style="align-items:center;gap:12px"><div class="num-badge" style="width:44px;height:44px;font-size:21px">${j + 1}</div><h3 style="margin:0">${t}</h3></div>
              <p class="small">${d}</p>${f ? '<span class="pill ok" style="align-self:flex-start;margin-top:auto">MCE filter</span>' : ""}</div>`).join("")}
        </div>
        <div class="row grow">
          <div class="card col grow" style="justify-content:center"><div class="eq" style="font-size:30px"><i>a</i> = argmax<sub><i>a</i> ∈ ${Aens("b<sub>h</sub>")}</sub> [ <i>Q</i>(<i>h</i>, <i>a</i>) + <i>c</i> √( ln <i>N</i>(<i>h</i>) / <i>N</i>(<i>h</i>, <i>a</i>) ) ]</div>
            <div class="eq" style="font-size:30px"><i>G</i> = Σ<sub><i>k</i>=0</sub><sup><i>H</i></sup> <i>γ</i><sup><i>k</i></sup> <i>R</i>(<i>s<sub>k</sub></i>, <i>a<sub>k</sub></i>), &nbsp; <i>Q</i>(<i>h</i>, <i>a</i>) ← <i>Q</i>(<i>h</i>, <i>a</i>) + (<i>G</i> − <i>Q</i>(<i>h</i>, <i>a</i>)) / <i>N</i>(<i>h</i>, <i>a</i>)</div>
            <div class="eq" style="font-size:30px"><i>a<sub>t</sub></i> = argmax<sub><i>a</i> ∈ ${Aens("b<sub>t</sub>")}</sub> <i>Q</i>(<i>h</i><sub>0</sub>, <i>a</i>)</div>
            <p class="small mute">The tree is built over sequences of actions, each node holding the particles propagated along its sequence. Replanned every 200 to 300 ms.</p></div>
          <div class="card amber col" style="flex:0.75 1 0"><h3>Intentions in the ODD-MDP</h3><p class="small">A tactical risk term brings them into the reward:</p><div class="eq" style="font-size:31px"><i>R<sub>i</sub></i><sup>LC</sup> = <i>P<sub>i</sub></i><sup>LC</sup> · <i>R<sub>i</sub></i><sup>hyp</sup></div><p class="small">In the ODD-POMDP, the particles carry them.</p></div>
        </div>` },

    { id: "bridge-c3", type: "bridge", sec: "c3", dark: true, kicker: "From the method to its validation", time: 25,
      title: "Does it hold, in simulation and on a real vehicle?",
      notes: "Capability precedes choice is now formalized: the MCE assesses the maneuvers, and the ODD-MDP and the ODD-POMDP choose among the ensured ones. So far, the animations have illustrated each step on one situation. Chapter 6 evaluates the whole: in IPG CarMaker, over hundreds of runs, and with the same planner, unchanged, on a Mégane E-Tech prototype.",
      html: `<div class="bridge"><div class="k">From the method to its validation</div>
        <div class="q">Does it hold, in simulation and on a real vehicle?</div>
        <ul class="chk"><li class="y"><b>Capability</b> with the MCE, <b>choice</b> with the ODD-MDP and the ODD-POMDP</li>
          <li class="n">So far, each step illustrated on a single situation, with the animations</li>
          <li class="to">Evaluate them in IPG CarMaker, over hundreds of runs, then with the same planner, unchanged, on a Mégane E-Tech prototype</li></ul>
        <a class="next" data-go="sec-c4" href="#/sec-c4"><span class="cbadge solid">C4</span> Validation, in simulation and on a real vehicle →</a></div>` },

    // ================================================================ 6. C4 · validation in simulation and on the vehicle (part III, chapter 6): setup §6.2, nominal §6.3, fail-operational §6.4, uncertainty §6.5
    { id: "sec-c4", type: "section", sec: "c4", dark: true, title: "C4 · Does it run on a real vehicle?", time: 10 },

    { id: "setup", sec: "c4", c: ["C4"], kicker: "Experimental platform", ref: "§6.2", time: 50,
      title: "The same planner, from simulation to a real prototype",
      notes: "Three loops that progressively replace simulated elements by real ones. The results that follow come from the software-in-the-loop, except the overtaking on the prototype, which is the vehicle-in-the-loop. In both, ODD-aptive runs unchanged.",
      html: `<div class="row grow">
        <div class="card col" style="flex:1.2 1 0"><h4>From software-in-the-loop to vehicle-in-the-loop</h4>${fig("v_cycle.png", "Validation loops")}
          <p class="small">Vehicle-in-the-loop: a Mégane E-Tech prototype on a test track. Its RTK position is replicated in CarMaker, the virtual traffic is perceived as if it were real, and the real ADAS features execute the requests.</p></div>
        <div class="col grow">
          <div class="card tight stat"><span class="v" style="font-size:40px">IPG CarMaker</span><span class="l">software-in-the-loop: road, traffic, conditions and vehicle dynamics</span></div>
          <div class="card tight stat"><span class="v" style="font-size:40px">ROS node</span><span class="l">ODD-aptive sends a target lane and a set speed to the ADAS features</span></div>
          <div class="card tight stat"><span class="v" style="font-size:40px">5 s · 3.5 s</span><span class="l">one lane change · one keep-lane or ±10 km/h step</span></div>
          <div class="card tight stat"><span class="v" style="font-size:40px">200–300 ms</span><span class="l">replanning period; only the first maneuver is executed</span></div>
        </div></div>` },

    { id: "nominal-lc", sec: "c4", c: ["C2", "C4"], kicker: "Nominal tactical behavior", ref: "§6.3.1", time: 50,
      title: "Nominal lane change: safe gaps, and a plan revised every 200 ms",
      notes: "Before any degradation, the planner must do what any tactical planner does. The horizon covers four maneuvers, but the tree is rebuilt every 200 ms, so a plan is never followed blindly.",
      html: `<div class="row grow">
        <div class="col" style="flex:1.1 1 0">
          <div class="card tight">${fig("lane_change_scenario.jpg", "Lane change with approaching traffic", 200)}</div>
          <div class="card grow"><ul class="list small">
            <li>10 speed combinations: approaching vehicle 130 to 140 km/h, slower vehicle 72 to 86 km/h, or ego at 110 km/h</li>
            <li>Merges ahead when the gap allows, otherwise lets the faster vehicle pass</li>
            <li>The return is in the plan more than 10 s before it is executed</li>
            <li>Aborted before crossing the line in 2 of the 10 combinations, when updated predictions show the merge is unsafe</li>
            <li>Overtaking completed without collision in every run</li></ul></div>
        </div>
        <div class="card col tight" style="flex:0.55 1 0"><h4>Merge ahead, 130 km/h</h4>${fig("lc_sequence_1.png", "Merge ahead")}</div>
        <div class="card col tight" style="flex:0.55 1 0"><h4>Abort, then behind, 135 km/h</h4>${fig("lc_sequence_2.png", "Abort then merge behind")}</div>
        </div>` },

    { id: "v-vil", type: "video", sec: "c4", c: ["C4"], ref: "§6.3.2", time: 95,
      title: "Long-term overtaking on the prototype vehicle",
      notes: "The strongest evidence of the defense: a real vehicle executing the decisions. Let the video run without talking over it for the first seconds.",
      video: { src: V + "vil.mp4", parts: [[12.0, "A real vehicle, with virtual traffic"], [21.25, "Is returning to the right lane worthwhile?"], [33.0, "The run: one overtaking sequence past the whole group"]] } },

    { id: "vil-result", sec: "c4", c: ["C4"], kicker: "Long-term overtaking on the prototype vehicle", ref: "§6.3.2", time: 50,
      title: "On the prototype, one overtaking sequence passes the whole group",
      notes: "A one-maneuver planner tends to return as soon as it passes a vehicle. ODD-aptive tells the cases apart: it returns after a single overtaking, and passes the whole group when the vehicles are close. The planner only represents the nearest vehicles, so passing the group comes from successive planning updates.",
      backups: ["b-vil"],
      html: `<div class="row grow">
        <div class="col" style="flex:1 1 0">
          <div class="card tight">${fig("overtaking_policies.jpg", "Single and multiple overtaking policies", 220)}</div>
          <div class="card grow"><ul class="list small">
            <li>Requested speed 65 km/h on a 1.5 km straight, four virtual vehicles at ≈ 35 km/h</li>
            <li>Returns ≈ 1 s after passing the first truck, alone ahead</li>
            <li>Then keeps the left lane past two cars and the second truck, back right after ≈ 77 s</li>
            <li>At 53.9 s, Keep Lane is valued 17.34 against 14.80 for a lane change right</li>
            <li>Four smooth lane changes, lateral acceleration below ≈ 1.2 m/s²</li></ul></div>
        </div>
        <div class="card col" style="flex:1 1 0"><h4>Camera and RViz views, from 15 s to 77 s</h4>${fig("overtaking_sequence.jpg", "Overtaking sequence on the prototype")}</div>
        </div>` },

    { id: "v-fog", type: "video", sec: "c4", c: ["C2", "C4"], ref: "§6.4.2", time: 135,
      title: "Scenario 1: reduced visibility",
      notes: "The hypotheses of the fog scenario, then the reference planner with a single decision step against ODD-aptive with four steps, on the same traffic.",
      video: { src: V + "fog.mp4", parts: [[12.0, "The electronic horizon announces the fog"], [18.5, "Fog reduces the perception envelope"], [29.0, "Keep Lane ensured, lane change not ensured"], [41.0, "The MRM requires the hard shoulder"], [48.5, "Keep the MRM reachable when the capabilities are degraded"], [61.5, "The simulations, and how to read the display"], [81.0, "One decision step against four, up to the fog"]] } },

    { id: "fog-a", sec: "c4", c: ["C2", "C4"], kicker: "Scenario 1: reduced visibility · configuration A", ref: "§6.4.2", time: 60,
      title: "Fog ahead: with four steps, no MRM in 100 runs out of 100",
      notes: "Configuration A. With one step, the set speed stays at 130 km/h until about 170 m before the fog and every run ends with an MRM. With four steps, the deceleration starts before the 300 m ramp: the vehicle reacts to the forecast degradation, not to the observed one. No collision in the 400 runs. The margin lowers the entry speed without a second boundary.",
      backups: ["b-margin", "b-conf"],
      html: `<div class="row grow">
        <div class="card col tight" style="flex:0.42 1 0">${fig("fog_config_a.png", "Fog scenario, configuration A")}</div>
        <div class="col grow">
          <div class="card small tight">Fog announced ≈ 2.5 km ahead, perception range from 200 m to 50 m inside. No traffic, the vehicle stays in its lane. Reference: same MCE, reward and models, <b>one step</b> (3.5 s). ODD-aptive: <b>four steps</b> (14 s).</div>
          <table class="tbl"><tr><th>Planner</th><th class="c">Runs without MRM</th><th class="c">First deceleration before the fog</th><th class="c">Speed at fog entry</th></tr>
            <tr><td>Reference, one step</td><td class="c badt"><b style="color:var(--bad)">0 / 100</b></td><td class="c">170 m (139–191)</td><td class="c">MRM at ≈ 115 km/h</td></tr>
            <tr class="hl"><td>ODD-aptive, <i class="m">m</i> = 1</td><td class="c"><b style="color:var(--ok)">100 / 100</b></td><td class="c">456 m (446–464)</td><td class="c">94.4 km/h (93.7–94.9)</td></tr>
            <tr class="hl"><td>ODD-aptive, <i class="m">m</i> = 1.2</td><td class="c"><b style="color:var(--ok)">100 / 100</b></td><td class="c">455 m (446–466)</td><td class="c">78.7 km/h (77.5–79.4)</td></tr>
            <tr class="hl"><td>ODD-aptive, <i class="m">m</i> = 1.5</td><td class="c"><b style="color:var(--ok)">100 / 100</b></td><td class="c">478 m (470–488)</td><td class="c">70.1 km/h (68.8–72.3)</td></tr></table>
          <div class="card tight grow">${fig("fog_speed_profiles.png", "Speed profiles before the fog")}</div>
        </div></div>` },

    { id: "fog-b", sec: "c4", c: ["C2", "C4"], kicker: "Scenario 1: reduced visibility · configuration B", ref: "§6.4.2", time: 60,
      title: "With traffic: more returns in time, and more overtaking, not less",
      notes: "Configuration B. ODD-aptive plans the return in every run. Its remaining failures are mostly returns blocked by a vehicle alongside in the last 300 m. And it overtakes more, so anticipation is not conservative. One run with m = 1.2 is excluded, a simulator artefact.",
      backups: ["b-outcomes", "b-conf"],
      html: `<div class="row grow">
        <div class="card col" style="flex:1.1 1 0"><h4>Lane occupied before the fog</h4>${fig("fog_lane_occupancy.png", "Lane occupancy before the fog")}</div>
        <div class="card grow"><h4>Setup</h4><ul class="list small">
          <li>Three lanes, 15 vehicles per km and lane, slower trucks on the right</li>
          <li>In the fog the rear detection is lost, so lane changes are no longer ensured</li>
          <li>The MRM uses the hard shoulder, reachable only from the right lane</li>
          <li>100 seeds for each planner</li></ul></div>
        </div>
        <table class="tbl"><tr><th>Planner</th><th class="c">Right lane at the fog</th><th class="c">Blocked by traffic</th><th class="c">Planned too late</th><th class="c">Never planned</th><th class="c">Runs with overtaking</th><th class="c">Mean speed</th></tr>
          <tr><td>Reference, one step</td><td class="c">76 / 100</td><td class="c">5</td><td class="c">10</td><td class="c">9</td><td class="c">45</td><td class="c">90.7 km/h</td></tr>
          <tr class="hl"><td>ODD-aptive, <i class="m">m</i> = 1</td><td class="c"><b>90 / 100</b></td><td class="c">7</td><td class="c">3</td><td class="c"><b>0</b></td><td class="c"><b>82</b></td><td class="c">96.1 km/h</td></tr>
          <tr class="hl"><td>ODD-aptive, <i class="m">m</i> = 1.2</td><td class="c"><b>92 / 99</b></td><td class="c">6</td><td class="c">1</td><td class="c"><b>0</b></td><td class="c">76</td><td class="c">94.3 km/h</td></tr></table>` },

    { id: "v-exit", type: "video", sec: "c4", c: ["C2", "C4"], ref: "§6.4.3", time: 140,
      title: "Scenario 2: preparing a highway exit",
      notes: "The hypotheses of the exit scenario, then a run of ODD-aptive: it keeps overtaking after the announcement and prepares the exit during the last kilometre.",
      video: { src: V + "exit.mp4", parts: [[12.0, "The electronic horizon announces the exit"], [19.0, "Slower traffic invites overtaking"], [27.75, "The exit is a route objective, not a rule"], [38.5, "Level 2: the driver remains the fallback"], [51.5, "Keep overtaking, then return in time"], [63.5, "The simulations, and how to read the display"], [80.75, "A run of ODD-aptive up to the exit"]] } },

    { id: "exit", sec: "c4", c: ["C2", "C4"], kicker: "Scenario 2: preparing a highway exit", ref: "§6.4.3", time: 50,
      title: "Highway exit: taken in all 100 runs, while still overtaking",
      notes: "The vehicle keeps overtaking after the announcement and prepares the exit during the last kilometre, with no rule imposing a lane at a given distance. The preparation emerges from the exploration of predicted states and from the reward.",
      backups: ["b-exit", "b-conf"],
      html: `<div class="row grow">
        <div class="card col tight" style="flex:0.7 1 0">${fig("exit_scenario.png", "Highway exit scenario")}</div>
        <div class="col grow">
          <div class="card small">Exit announced 2 km before it, 12 vehicles per km and lane, half of the right lane trucks. The exit is a <b>route objective</b> in the reward, not a rule.</div>
          <div class="card tight grow">${fig("exit_lane_occupancy.png", "Lane occupancy before the exit")}</div>
          <div class="g4">
            <div class="card tight stat"><span class="v ok" style="font-size:30px">100 / 100</span><span class="l">exits taken</span></div>
            <div class="card tight stat"><span class="v" style="font-size:30px">40</span><span class="l">overtaking sequences start after the announcement</span></div>
            <div class="card tight stat"><span class="v" style="font-size:30px">1230 → 618 m</span><span class="l">median first exit-driven decision, then final return</span></div>
            <div class="card tight stat"><span class="v" style="font-size:30px">84 → 103 km/h</span><span class="l">mean speed, without overtaking, then with two or more</span></div>
          </div>
        </div></div>` },

    { id: "congestion", sec: "c4", c: ["C2", "C4"], kicker: "Scenario 2: preparing a highway exit", ref: "§6.4.3", time: 50,
      title: "Announced congestion is a capability limit: the return comes ≈ 400 m earlier",
      notes: "The planner only models the nearest vehicles, so it cannot see the congestion before reaching it. The announced density is the only way to know that the lane changes will become harder. We frame it as a capability limit.",
      html: `<div class="row">
        <div class="card grow small">Over the last 1500 m, the density rises from 12 to 20 vehicles per km and lane. The electronic horizon announces it.</div>
        <div class="card grow small">The interaction skill keeps a lane change ensured only below a maximum density. With the announced density, the MCE sees the limit in the predicted states.</div>
        <div class="card grow small">Same 20 seeds, with and without the announced density.</div></div>
        <div class="card tight grow">${fig("congestion.png", "Returns with and without the announced density")}</div>
        <div class="g4">
          <div class="card tight stat"><span class="v" style="font-size:40px">471 → 876 m</span><span class="l">median final return to the right lane, without then with the density</span></div>
          <div class="card tight stat"><span class="v" style="font-size:40px">94 → 218 m</span><span class="l">latest return before the exit</span></div>
          <div class="card tight stat"><span class="v ok" style="font-size:40px">20 / 20</span><span class="l">exits taken by both variants</span></div>
          <div class="card tight stat"><span class="v" style="font-size:40px">83.4 → 85.0</span><span class="l">km/h mean speed until the exit, no loss of progress</span></div>
        </div>` },

    { id: "r-noisy", sec: "c4", c: ["C3", "C4"], kicker: "Results under uncertainty · surrounding vehicles", ref: "§6.5.1", time: 50,
      title: "Noisy perception: the belief avoids rejecting a safe gap",
      notes: "With noise, the ODD-MDP is outside the right lane at the fog entry in 13 runs, the ODD-POMDP in 6. No collision in any run. The gain comes from evaluating each lane change over several hypotheses.",
      html: `<div class="row grow">
        <div class="card col" style="flex:1.25 1 0">${fig("noisy_frames.png", "Noisy perception frames, ODD-MDP and ODD-POMDP")}</div>
        <div class="col grow">
          <div class="card small">The car behind drives at 102 km/h but is observed at 108 km/h. The <b>ODD-MDP</b> takes it as exact, judges the lane change dangerous and loses the gap. The <b>ODD-POMDP</b> spreads its particles around the observation and changes lane 430 m before the fog.</div>
          <div class="card tight stat"><span class="v" style="font-size:42px">13 → 6</span><span class="l">runs outside the right lane at the fog entry, MDP then POMDP</span></div>
          <div class="card tight stat"><span class="v ok" style="font-size:42px">85 → 94</span><span class="l">runs in the right lane and operable</span></div>
          <div class="card tight stat"><span class="v" style="font-size:42px">236 → 367 m</span><span class="l">mean start of the return before the fog</span></div>
          <p class="xs mute" style="margin:0">Ten vehicles in the right lane with 25 to 55 m gaps, fog 1000 m ahead, correlated noise on distance and speed. Same 100 seeds for both planners.</p>
        </div></div>` },

    { id: "r-forecast-tau", sec: "c4", c: ["C3", "C4"], kicker: "Results under uncertainty · visibility forecast", ref: "§6.5.2", time: 50,
      title: "Visibility forecast: τ turns a probability into a decision boundary",
      notes: "Top: share of hypotheses for which Keep Lane is ensured, in the plane of speed and forecast visibility. The threshold tau turns this probability into a boundary. Bottom: the higher tau, the earlier and smoother the slowdown.",
      html: `<div class="row grow">
        <div class="col" style="flex:1.2 1 0">
          <div class="card tight grow">${fig("capability_plane.png", "Share of hypotheses where Keep Lane is ensured")}</div>
          <div class="card tight grow">${fig("admissible_speed.png", "Admissible speed for several thresholds")}</div>
        </div>
        <div class="col grow">
          <div class="card small">32 hypotheses on where the fog starts (σ = 80 m) and on its minimum visibility (σ = 15 %). The visibility measured on board corrects them as the vehicle approaches.</div>
          <div class="card tight stat"><span class="v" style="font-size:42px">75 → 92 m</span><span class="l">visibility needed to keep the lane at 120 km/h, exact forecast then <i class="m">τ</i> = 0.9</span></div>
          <div class="card tight stat"><span class="v" style="font-size:42px">95 → 165 m</span><span class="l">the slowdown starts earlier before the announced fog</span></div>
          <div class="card tight stat"><span class="v" style="font-size:42px"><i class="m">τ</i> = 0.9</span><span class="l">chosen threshold. <i class="m">τ</i> = 1 is too conservative, about 55 km/h for the worst hypothesis</span></div>
        </div></div>` },

    { id: "r-forecast", sec: "c4", c: ["C3", "C4"], kicker: "Results under uncertainty · visibility forecast", ref: "§6.5.2", time: 50,
      title: "Forecast errors: the ODD-POMDP passes the fog in 19 of 20 runs",
      notes: "The fog starts up to 150 m before or after the announced point. When it is denser than announced, the ODD-MDP arrives too fast and loses Keep Lane. The ODD-POMDP slows down progressively and passes every dense case. The cost is one precautionary MRM in a lighter fog.",
      backups: ["b-conf"],
      html: `<div class="row grow">
        <div class="col grow">
          <table class="tbl"><tr><th>Real fog</th><th>Planner</th><th class="c">Passed</th><th class="c">MRM</th></tr>
            <tr><td rowspan="2"><b>All 20 seeds</b></td><td>ODD-MDP</td><td class="c">10</td><td class="c">10</td></tr>
            <tr class="hl"><td>ODD-POMDP</td><td class="c"><b>19</b></td><td class="c">1</td></tr>
            <tr class="sep"><td rowspan="2"><b>Denser (11)</b></td><td>ODD-MDP</td><td class="c">1</td><td class="c">10</td></tr>
            <tr class="hl"><td>ODD-POMDP</td><td class="c"><b>11</b></td><td class="c">0</td></tr>
            <tr class="sep"><td rowspan="2"><b>Lighter (9)</b></td><td>ODD-MDP</td><td class="c">9</td><td class="c">0</td></tr>
            <tr class="hl"><td>ODD-POMDP</td><td class="c">8</td><td class="c">1</td></tr></table>
          <div class="g2">
            <div class="card tight stat"><span class="v bad" style="font-size:40px">+27.5 km/h</span><span class="l">largest excess over the admissible speed for the ODD-MDP, above it in 10 runs</span></div>
            <div class="card tight stat"><span class="v ok" style="font-size:40px">0 runs</span><span class="l">where the ODD-POMDP is faster than the admissible speed. No collision in the 40 runs</span></div>
          </div>
        </div>
        <div class="card col" style="flex:0.95 1 0">${fig("forecast_run.png", "Seed 8: real fog after the announced point")}
          <p class="xs mute">Seed 8: real fog 115 m after the announced point, 45.5 m of visibility (78 km/h admissible). The ODD-POMDP enters at 73 km/h. The ODD-MDP enters at 92 km/h and requests the MRM 22 m inside.</p></div>
        </div>` },

    { id: "v-intentions", type: "video", sec: "c4", c: ["C3", "C4"], ref: "§6.5.3", time: 95,
      title: "Uncertain tactical intentions",
      notes: "An intention cannot be measured: it is estimated from the kinematics. The particles hold the possible maneuvers, and each future is evaluated with its consequences. Two use cases: a cut-in, and a vehicle entering the highway.",
      video: { src: V + "intentions.mp4", parts: [[12.0, "An intention cannot be measured"], [19.75, "The tactical state of each vehicle"], [29.25, "The belief: a set of particles"], [38.75, "Each future is evaluated with its consequences"], [52.5, "The simulations, and how to read the display"], [69.75, "A cut-in, and a vehicle entering the highway"]] } },

    { id: "r-cutin", sec: "c4", c: ["C3", "C4"], kicker: "Results under uncertainty · tactical intentions", ref: "§6.5.3", time: 45,
      title: "Cut-in: the ODD-POMDP reacts before the car moves",
      notes: "Reaction time measured from the start of the lateral motion of the car. The ODD-POMDP evaluates separately the futures with and without the cut-in, which explains its earlier reaction. Illustrative run only.",
      html: `<p class="small" style="margin:0">Ego at 130 km/h in the middle lane. A car behind a truck in the right lane cuts in. Every planner receives the same estimated intention, with <i class="m">P</i> ≈ 0.35 to 0.39.</p>
        <div class="card tight col" style="gap:8px"><h4>ODD-MDP with tactical risk</h4><div class="g3">${fig("cutin_mdp_a.png", "ODD-MDP, a", 210)}${fig("cutin_mdp_b.png", "ODD-MDP, b", 210)}${fig("cutin_mdp_c.png", "ODD-MDP, c", 210)}</div></div>
        <div class="card tight col" style="gap:8px"><h4>ODD-POMDP</h4><div class="g3">${fig("cutin_pomdp_a.png", "ODD-POMDP, a", 210)}${fig("cutin_pomdp_b.png", "ODD-POMDP, b", 210)}${fig("cutin_pomdp_c.png", "ODD-POMDP, c", 210)}</div></div>
        <div class="g3">
          <div class="card tight stat"><span class="v bad" style="font-size:40px">+2.4 s</span><span class="l">ODD-MDP without tactical risk: reacts after the car moves, ACC brakes to 102 km/h</span></div>
          <div class="card tight stat"><span class="v" style="font-size:40px;color:var(--deg)">+0.8 s</span><span class="l">ODD-MDP with tactical risk: changes lane after the car moves, ACC brakes to 106 km/h</span></div>
          <div class="card tight stat"><span class="v ok" style="font-size:40px">−2.8 s</span><span class="l">ODD-POMDP: changes lane before the car moves and passes it at 130 km/h</span></div>
        </div>` },

    // ================================================================ 7. conclusion (chapter 7)
    { id: "sec-concl", type: "section", sec: "concl", dark: true, title: "Conclusion and perspectives", time: 10 },

    { id: "evidence", sec: "concl", kicker: "General conclusion", ref: "§7.1", time: 60,
      title: "Each contribution, and the evidence behind it",
      notes: "To conclude, the four contributions and the evidence for each. Every line links to the slide that shows it.",
      html: `<table class="tbl" style="font-size:22px"><tr><th style="width:300px">Contribution</th><th>What it makes possible</th><th>Evidence</th></tr>
          <tr><td><span class="num-badge c1" style="display:inline-grid;width:40px;height:40px;font-size:18px;vertical-align:middle;margin-right:10px">C1</span><b>Maneuver Capability Estimator</b></td><td>Ensured maneuvers in the current and predicted states, each loss traced to a change of context</td><td>${go("fog-a", "Deceleration 455 to 478 m before the fog, instead of 170 m")}</td></tr>
          <tr><td><span class="num-badge c2" style="display:inline-grid;width:40px;height:40px;font-size:18px;vertical-align:middle;margin-right:10px">C2</span><b>ODD-MDP</b></td><td>Decisions only among ensured maneuvers over 14 to 20 s, with a reachable MRM</td><td>${go("fog-a", "100 of 100 runs without MRM in fog, against 0 with one step")}. ${go("exit", "Exit taken in 100 of 100 runs")}</td></tr>
          <tr><td><span class="num-badge c3" style="display:inline-grid;width:40px;height:40px;font-size:18px;vertical-align:middle;margin-right:10px">C3</span><b>ODD-POMDP</b></td><td>The same principle under uncertainty, with a probabilistic guarantee <i class="m">τ</i></td><td>${go("r-forecast", "Forecast errors: fog passed in 19 of 20 runs, against 10")}. ${go("r-noisy", "Noisy perception: 94 against 85 operable")}</td></tr>
          <tr><td><span class="num-badge c4" style="display:inline-grid;width:40px;height:40px;font-size:18px;vertical-align:middle;margin-right:10px">C4</span><b>Validation</b></td><td>Integration into an industrial prototyping architecture</td><td>${go("vil-result", "Vehicle-in-the-loop on a Mégane E-Tech: one overtaking sequence past a whole group")}</td></tr></table>
        <div class="takeaway" style="margin-top:auto"><b>Capability precedes choice:</b> anticipation changes the decisions and keeps the vehicle fail-operational, without making it overly conservative.</div>` },

    { id: "perspectives", sec: "concl", kicker: "Future directions", ref: "§7.1 – §7.2", time: 75,
      title: "Limitations, and where the work goes next",
      notes: "The main limitation: the planner acts at the last admissible instant, for instance when it returns to the right lane just before the fog. Monitoring the maneuver during its execution is the first perspective that addresses it.",
      html: `<div class="row grow">
        <div class="card bad grow"><h3>Limitations</h3><ul class="list small">
          <li>A maneuver is ensured when its skills hold at its start, so the planner acts at the last admissible instant</li>
          <li>Results obtained with modeled dynamics, perception and traffic, and simple traffic predictions</li>
          <li>Act skills assumed fulfilled, and future conditions given by the electronic horizon</li>
          <li>Vehicle-in-the-loop gives a first confirmation. Tests with real traffic and degraded conditions are ongoing</li></ul></div>
        <div class="card ok grow"><h3>Perspectives</h3><ol class="nums small">
          <li>Extend the domain and the skills: urban roads, monitoring of braking, steering and power through Act skills</li>
          <li>Optimize the maneuver parameters, such as the set speed or the lane change duration, as continuous variables</li>
          <li>Monitor the maneuver during its execution, to replan or abort it as soon as a condition changes</li>
          <li>Learn from data where the vehicle is capable, with introspective approaches</li>
          <li>Richer prediction of the surrounding traffic and of its interactions with the ego vehicle</li></ol></div>
        </div>` },

    { id: "publications", sec: "concl", kicker: "Publications", time: 15,
      title: "Publications",
      notes: "The publications of the thesis.",
      html: `<div class="col grow" style="justify-content:center;gap:26px">
        ${[["Journal", "Context-Aware and Reliable Long-Term Decision-Making for Safe Intelligent Vehicles: A Survey", "IEEE Transactions on Intelligent Vehicles, 10(12), pp. 5288–5307, 2025", "Chapters 2–3"],
           ["Conference", "ODD-Based Long-Term Decision-Making for Intelligent Vehicles", "IEEE Intelligent Vehicles Symposium (IV), pp. 1215–1221, Cluj-Napoca, Romania, 2025", "C2 · Chapter 5"],
           ["Conference", "Assessing the Decisional Capability for an ODD-Compliant Automatic Lane Change System via Sense-Think-Act Paradigm", "12th IFAC Symposium on Intelligent Autonomous Vehicles (IAV), IFAC-PapersOnLine 59(3), pp. 162–167, Phoenix, USA, 2025", "C1 · Chapter 4"]]
          .map(([k, t, v, c]) => `<div class="card row" style="align-items:center;gap:28px"><span class="pill ${k === "Journal" ? "" : "line"}" style="min-width:150px;justify-content:center">${k}</span>
            <div class="grow"><div style="font-weight:700;color:var(--navy);font-size:26px;line-height:1.3">${t}</div><div class="small mute">R. Cardenas, L. Adouane, C. Zinoune, M.-A. Benloucif · ${v}</div></div><span class="pill gray">${c}</span></div>`).join("")}
        </div>` },

    { id: "thanks", type: "thanks", sec: "concl", dark: true, title: "Thank you", time: 0,
      notes: "Thank you. I am ready for your questions.",
      html: `<video class="bg" muted playsinline preload="none" data-src="${V}fog.mp4" data-start="81" aria-hidden="true"></video><div class="stand"><div class="big">Thank you</div><div class="rule"></div><div class="sub">Questions and discussion</div>
        <div class="links"><a data-go="contrib">Contributions</a><a data-go="evidence">Evidence</a><a data-go="bindex">Appendix</a></div></div>` },
  ];

  // ================================================================ appendix
  const backups = [
    { id: "bindex", type: "bindex", sec: "backup", title: "Appendix", kicker: "For the questions" },

    { id: "b-cost", sec: "backup", kicker: "Appendix", title: "Computational cost of one planning cycle",
      html: `<div class="g4">
          <div class="card stat"><span class="v">366</span><span class="l">states: median tree of the ODD-MDP, four steps (p95 437, max 535)</span></div>
          <div class="card stat"><span class="v">25 ms</span><span class="l">median build and solve of the ODD-MDP (p95 38.8 ms, max 107 ms)</span></div>
          <div class="card stat"><span class="v">≈ 220–242 ms</span><span class="l">median ODD-POMDP cycle, 16 particles, at most 400 simulations</span></div>
          <div class="card stat"><span class="v">0.3 s</span><span class="l">time budget of the ODD-POMDP cycle</span></div></div>
        <div class="takeaway">Both planners run within the replanning period of 200 to 300 ms.</div>` },

    { id: "b-mrm", sec: "backup", kicker: "Appendix", title: "Three notions of MRM, and how they relate",
      html: `<div class="g2 grow">
          <div class="card ok"><h3>Ensured MRM</h3><div class="eq">MRM ∈ ${Aens()}</div><p>Its skills are fulfilled in <i class="m">s</i>, so <i class="m">s</i> is a safe state (Eq. 5.35).</p></div>
          <div class="card accent"><h3>Reachable MRM</h3><div class="eq">𝟙<sub>MRM</sub>(<i>s</i>) = 1</div><p>An MRM is reachable from <i class="m">s</i>. Used by the fallback term after the time threshold (Eq. 5.32).</p></div>
          <div class="card bad"><h3>Required MRM</h3><div class="eq">${Uens()} = ∅</div><p>No maneuver is ensured: loss of operability, a fallback is required (chapter 4).</p></div>
          <div class="card amber"><h3>Fail-operational</h3><div class="eq">∀<i>k</i> ∈ {0, …, <i>H</i>}, <i>s<sub>k</sub></i> ∈ <i>S</i><sub>safe</sub></div><p>Pursued jointly by the filter and the reward (Eq. 5.36), not imposed as a hard constraint.</p></div>
        </div>` },

    { id: "b-fallback", sec: "backup", kicker: "Appendix", title: "Fallback term, its time threshold and the horizon",
      html: `<div class="card eqbox"><div class="eq"><i>R</i><sub>time</sub>(<i>s</i>) = −[<i>t</i><sub>pred</sub>(<i>s</i>) − <i>T</i><sub>thr</sub>]<sup>+</sup> (1 − 𝟙<sub>MRM</sub>(<i>s</i>))</div></div>
        <div class="g4">
          <div class="card stat"><span class="v" style="font-size:40px">Threshold</span><span class="l">future time from which an MRM must remain reachable</span></div>
          <div class="card stat"><span class="v" style="font-size:40px">15 s · 10 s</span><span class="l">example of chapter 5: horizon, then threshold</span></div>
          <div class="card stat"><span class="v" style="font-size:40px">14–20 s</span><span class="l">horizon of four maneuvers in chapter 6</span></div>
          <div class="card stat"><span class="v" style="font-size:40px">20 s</span><span class="l">time budget to reach a minimal risk condition, Level 3</span></div></div>
        <div class="card grow"><ul class="list">
          <li>Before the threshold the term is zero: the planner may pass through states where the MRM is momentarily not reachable</li>
          <li>After it, every second without a reachable MRM is penalized, with the largest weight after collisions</li>
          <li>Safe states (Eq. 5.36) are pursued through the filter and this reward</li></ul></div>` },

    { id: "b-transition", sec: "backup", kicker: "Appendix", title: "Transition model: one predicted successor per action",
      html: `<div class="row grow"><div class="col grow">
          <div class="card eqbox"><div class="eq"><i>ŝ</i>′ = <i>f</i>(<i>s</i>, <i>a</i>)</div><div class="eq"><i>P</i>(<i>s</i>′|<i>s</i>, <i>a</i>) = 1 for the predicted successor</div></div>
          <div class="card grow"><ul class="list">
            <li>Surrounding vehicles: constant acceleration, they keep their lane, no interaction</li>
            <li>Ego vehicle: kinematics of the maneuver, ACC behind a leader</li>
            <li>Operational domain: not predicted, read from the electronic horizon</li>
            <li>Uncertainty on states, intentions and forecasts is handled by the ${go("pomdp-sources", "ODD-POMDP")}</li></ul></div></div>
        <div class="card col grow">${fig("state_frame.jpg", "State frame")}</div></div>` },

    { id: "b-vi", sec: "backup", kicker: "Appendix", title: "Value iteration on the tree of ensured states",
      html: `<div class="row grow"><div class="card grow"><ul class="list">
          <li>The tree is built first: root, ensured actions, predicted successors, up to four steps</li>
          <li>The reward is evaluated on the successor state</li>
          <li>On a finite tree, value iteration converges to the backward induction from the leaves</li>
          <li>The policy is the best ensured action at the root, and only that action is executed</li></ul></div>
        <div class="card col grow">${fig("tree.png", "Tree of ensured states")}</div></div>` },

    { id: "b-explain", sec: "backup", kicker: "Appendix", title: "Explaining a decision: the plan against keep lane, term by term",
      notes: "Not in the manuscript. Because the planner is model-based, a decision can be explained. The reward is a weighted sum of named terms and the tree is explicit, so every value splits term by term. The reference is the nominal policy, keep the lane and the set speed, rolled out in the same model over the same horizon: the explanation answers the question a person asks, why this rather than carrying on. Short term, the first action against keep lane. Long term, the whole plan against the nominal plan. The term that gains most is the main reason; the terms that lose are the trade-off. Two levels, as in the thesis: if keep lane is no longer ensured, the explanation is the capability, and the MCE names the skill lost and the context; if it is still ensured, the explanation is the choice, given by the terms. The bars are schematic, not measured.",
      html: `<div class="row grow xpl">
        <div class="col" style="flex:1 1 0">
          <div class="card tight"><h4>Why it can be explained</h4><ul class="list small">
            <li><b>Explicit model:</b> the tree of ensured states is built, and can be stored, at every cycle</li>
            <li><b>Named reward terms:</b> every value splits term by term, along the planned sequence</li></ul>
            <div class="eq"><i>Q</i>(<i>s</i><sub>0</sub>, <i>a</i>) = Σ<sub><i>k</i></sub> <i>W<sub>k</sub></i> <i>Q<sub>k</sub></i>(<i>s</i><sub>0</sub>, <i>a</i>), &nbsp; <i>Q<sub>k</sub></i>(<i>s</i><sub>0</sub>, <i>a</i>) = Σ<sub><i>t</i>=0</sub><sup><i>H</i></sup> <i>γ<sup>t</sup></i> <i>R<sub>k</sub></i>(<i>s<sub>t</sub></i>, <i>a<sub>t</sub></i>)</div></div>
          <div class="card tight"><h4>Reference: the nominal policy</h4>
            <div class="eq"><i>π</i><sub>nom</sub>(<i>s</i>) = (KL, <i>θ</i> = 0), &nbsp; <i>Q<sub>k</sub></i><sup>nom</sup>(<i>s</i><sub>0</sub>) = Σ<sub><i>t</i></sub> <i>γ<sup>t</sup></i> <i>R<sub>k</sub></i>(<i>s<sub>t</sub></i><sup>nom</sup>, <i>a</i><sub>nom</sub>)</div>
            <ul class="list small">
            <li>Keep the lane and the set speed: what the vehicle does if nothing calls for a change</li>
            <li>The question a person asks: <b>why this, rather than carrying on?</b></li>
            <li>Rolled out in the same model, over the same horizon: same predictions, same terms</li></ul></div>
          <div class="card tight grow"><h4>Two levels, as in the thesis</h4><ul class="list small">
            <li><span class="pill ok">Capability</span> Keep lane no longer ensured over the horizon: the MCE names the skill lost and the context that caused it (${go("skills", "C1")})</li>
            <li><span class="pill">Choice</span> Keep lane still ensured: the terms say what the plan gains and what it pays (${go("reward", "C2")})</li></ul></div>
        </div>
        <div class="col" style="flex:1.08 1 0">
          <div class="card tight"><h4>Short term and long term</h4>
            <div class="eqrow"><div class="eq"><i>δ<sub>k</sub></i> = <i>W<sub>k</sub></i> [ <i>R<sub>k</sub></i>(<i>s</i><sub>0</sub>, <i>a</i>*) − <i>R<sub>k</sub></i>(<i>s</i><sub>0</sub>, <i>a</i><sub>nom</sub>) ]</div><span><b>short term:</b> the first action, now</span></div>
            <div class="eqrow"><div class="eq"><i>Δ<sub>k</sub></i> = <i>W<sub>k</sub></i> [ <i>Q<sub>k</sub></i>(<i>s</i><sub>0</sub>, <i>a</i>*) − <i>Q<sub>k</sub></i><sup>nom</sup>(<i>s</i><sub>0</sub>) ]</div><span><b>long term:</b> the whole plan, over the horizon</span></div>
            <div class="eqrow"><div class="eq"><i>k</i>* = argmax<sub><i>k</i></sub> <i>Δ<sub>k</sub></i> &nbsp;·&nbsp; { <i>k</i> : <i>Δ<sub>k</sub></i> &lt; 0 }</div><span>the <b>main reason</b>, and the <b>trade-off</b>: what the decision pays</span></div>
            <p class="xs mute" style="margin:4px 0 0">Σ<sub><i class="m">k</i></sub> <i class="m">Δ<sub>k</sub></i> = <i class="m">Q</i>(<i class="m">s</i><sub>0</sub>, <i class="m">a</i>*) − <i class="m">Q</i><sup>nom</sup>(<i class="m">s</i><sub>0</sub>) ≥ 0 whenever keep lane stays ensured, since the nominal plan is one branch of the tree</p></div>
          <div class="card tight grow"><h4>Reading of scenario 1, with traffic (${go("fog-b", "fog")}) · schematic</h4>
            <div class="xbars">
              <span class="lb main">Fallback <i class="m">R</i><sub>time</sub></span><span class="ng"></span><span class="ps"><i style="width:92%"></i></span>
              <span class="lb">Operability <i class="m">R</i><sub>op</sub></span><span class="ng"></span><span class="ps"><i style="width:38%"></i></span>
              <span class="lb">Risk <i class="m">R</i><sub>risk</sub></span><span class="ng"></span><span class="ps"><i style="width:6%"></i></span>
              <span class="lb">Lane change cost</span><span class="ng"><i style="width:16%"></i></span><span class="ps"></span>
              <span class="lb">Progress <i class="m">R</i><sub>speed</sub></span><span class="ng"><i style="width:44%"></i></span><span class="ps"></span>
              <span></span><span class="ax">pays</span><span class="ax r">gains</span></div>
            <div class="xsay">“I return to the right lane before the fog <b>because the hard shoulder must stay reachable</b> there. It costs speed behind the trucks, and one lane change.”</div>
            <p class="xs mute" style="margin:0">Bars <i class="m">Δ<sub>k</sub></i> drawn to illustrate the reading, not measured values</p></div>
        </div></div>` },

    { id: "b-reward", sec: "backup", kicker: "Appendix", title: "Reward terms in detail",
      html: `<table class="tbl"><tr><th style="width:260px">Term</th><th>Definition</th></tr>
          <tr><td><b>Collision</b></td><td>−1 if a collision occurs during the predicted execution or at the resulting state</td></tr>
          <tr><td><b>Risk</b></td><td>worst vehicle of the ego lane, mixing time to collision (1 to 10 s) and time headway (0.5 to 2 s)</td></tr>
          <tr><td><b>Legal</b></td><td>relative excess over the speed limit</td></tr>
          <tr><td><b>Speed</b></td><td>ego speed over the maximum speed considered, in [0, 1]</td></tr>
          <tr><td><b>Route</b></td><td>lane index, growing as the distance to the next itinerary event decreases</td></tr>
          <tr class="hl"><td><b>Operability</b></td><td>share of the actions lost, weighted by the margin of each ensured action</td></tr>
          <tr class="hl"><td><b>Fallback</b></td><td>time beyond the threshold without a reachable MRM</td></tr>
          <tr><td><b>Minor terms</b></td><td>lane change cost, and a penalty for overtaking on the right</td></tr></table>
        <p class="small mute">Weights: collision much larger than fallback, then operability, risk, legal and speed.</p>` },

    { id: "b-pomcp", sec: "backup", kicker: "Appendix", title: "ODD-constrained POMCP in practice",
      html: `<div class="g4">
          <div class="card stat"><span class="v">16</span><span class="l">particles in the noisy perception batch</span></div>
          <div class="card stat"><span class="v">32</span><span class="l">hypotheses on the fog in the forecast batch</span></div>
          <div class="card stat"><span class="v">≤ 400</span><span class="l">simulations per planning cycle</span></div>
          <div class="card stat"><span class="v"><i class="m">τ</i> = 0.9</span><span class="l">confidence threshold in all experiments</span></div></div>
        <div class="card grow"><ul class="list">
          <li>UCB1 selection, expansion and random rollout restricted to the ensured actions of the node</li>
          <li>Final action: best ensured action at the root</li>
          <li>Belief rebuilt at every cycle from the world model, no second filtering</li>
          <li>Intentions estimated by a Gaussian naive Bayes classifier on position and speed</li></ul></div>` },

    { id: "b-margin", sec: "backup", kicker: "Appendix", title: "Strategic margin: three values in configuration A",
      html: `<div class="row grow"><div class="card col" style="flex:0.8 1 0">${fig("exploration_plane.png", "Explored states for three margins")}</div>
        <div class="card grow"><ul class="list">
          <li>Entry speed in the fog: 94.4, 78.7 and 70.1 km/h for <i class="m">m</i> = 1, 1.2 and 1.5</li>
          <li>First deceleration 455 to 478 m before the fog for all three values</li>
          <li>With <i class="m">m</i> = 1.5 the preferred speed, ≈ 56 km/h, is not reached: the margin is a preference, not a second boundary</li>
          <li>At 620 m only <i class="m">m</i> = 1.5 already plans a deceleration. At 460 m, Keep Lane would leave the ensured region for <i class="m">m</i> = 1 and 1.2</li></ul>
          <p class="small mute" style="margin-top:16px">Explored states in the plane of speed and perception range, at four moments and for three margins.</p></div></div>` },

    { id: "b-rss", sec: "backup", kicker: "Appendix", title: "Sense skill parameters for the lane change",
      html: `<div class="row grow"><div class="card col grow">${fig("ranges.png", "Required perception ranges")}<p class="small mute">RSS worst case about 300 m at 130 km/h. Both vehicles at 100 km/h: about 56 m.</p></div>
        <table class="tbl" style="flex:0.7 1 0;align-self:flex-start"><tr><th>Parameter</th><th class="c">Value</th></tr>
          <tr><td>Response time, front zones</td><td class="c">0.5 s</td></tr><tr><td>Response time, rear zone</td><td class="c">1 s</td></tr>
          <tr><td>Maximum acceleration</td><td class="c">2 m/s²</td></tr><tr><td>Maximum braking</td><td class="c">7.5 m/s²</td></tr>
          <tr><td>Minimum braking</td><td class="c">2 m/s²</td></tr><tr><td>Time headway</td><td class="c">2 s</td></tr>
          <tr><td>Ratio R</td><td class="c">0.8</td></tr><tr><td>Traffic speed</td><td class="c">110 km/h ± 10 %</td></tr></table></div>` },

    { id: "b-outcomes", sec: "backup", kicker: "Appendix", title: "Configuration B: outcome classes",
      html: `<div class="card tight grow">${fig("outcomes.png", "Outcome classes in configuration B")}</div>
        <div class="card"><div class="g3 small"><span>(a) right lane, operable</span><span>(b) right lane but too fast, MRM</span><span>(c) return blocked by traffic</span><span>(d) return planned too late</span><span>(e) return never planned</span></div>
          <p class="small mute" style="margin-top:10px">Median last return 67 m before the fog with <i class="m">m</i> = 1, 93 m with <i class="m">m</i> = 1.2. One run with <i class="m">m</i> = 1.2 excluded: a truck reported with a wrong distance by the simulator.</p></div>` },

    { id: "b-exit", sec: "backup", kicker: "Appendix", title: "Highway exit: preparation and compliance",
      html: `<div class="row grow"><div class="card col tight" style="flex:0.6 1 0"><h4>Preparation</h4>${fig("exit_preparation.png", "Preparation of the exit")}</div>
          <div class="card col tight grow"><h4>Overtaking</h4>${fig("exit_overtakings.png", "Overtakings per run")}</div></div>
        <div class="card col tight grow"><h4>Rule compliance</h4>${fig("exit_compliance.png", "Overtaking on the right and time headway")}</div>` },

    { id: "b-learning", sec: "backup", kicker: "Appendix", title: "Why model-based, and not learned end to end",
      html: `<div class="row grow">
          <div class="card grow"><h3>Learning-based decision-making</h3><ul class="list">
            <li>Scales well and handles unseen situations</li>
            <li>Remains a black box, with no safety guarantee for critical decisions</li>
            <li>Depends on data quality, needs many training episodes, and suffers from the sim-to-real gap</li>
            <li>Its horizon covers the surrounding traffic, not the capabilities of the vehicle itself</li></ul></div>
          <div class="card navy grow"><h3>In ODD-aptive</h3><ul class="list">
            <li>Each skill is a requirement on the operational domain: decisions are traceable</li>
            <li>Each decision can be explained against keep lane, term by term (${go("b-explain", "appendix")})</li>
            <li>The filter excludes non-ensured maneuvers by construction</li>
            <li>Learning fits where the skills rely on trained components: learn where the vehicle is capable, and detect when it is no longer (introspective approaches)</li></ul></div></div>` },

    { id: "b-conf", sec: "backup", kicker: "Appendix", title: "Statistical confidence of the main proportions",
      html: `<table class="tbl" style="font-size:20px"><tr><th>Experiment</th><th>Outcome</th><th>Planner</th><th class="c">Observed</th><th class="c">95 % interval</th></tr>
          <tr><td rowspan="2"><b>Fog, configuration A</b></td><td rowspan="2">Runs without MRM</td><td>Reference</td><td class="c">0 / 100</td><td class="c">0 – 4 %</td></tr>
          <tr class="hl"><td>ODD-aptive, <i class="m">m</i> = 1</td><td class="c">100 / 100</td><td class="c">96 – 100 %</td></tr>
          <tr class="sep"><td rowspan="3"><b>Fog, configuration B</b></td><td rowspan="3">Right lane at the fog</td><td>Reference</td><td class="c">76 / 100</td><td class="c">66 – 84 %</td></tr>
          <tr class="hl"><td>ODD-aptive, <i class="m">m</i> = 1</td><td class="c">90 / 100</td><td class="c">82 – 95 %</td></tr>
          <tr class="hl"><td>ODD-aptive, <i class="m">m</i> = 1.2</td><td class="c">92 / 99</td><td class="c">86 – 97 %</td></tr>
          <tr class="sep"><td><b>Highway exit</b></td><td>Exits taken</td><td>ODD-aptive</td><td class="c">100 / 100</td><td class="c">96 – 100 %</td></tr>
          <tr class="sep"><td rowspan="2"><b>Noisy perception</b></td><td rowspan="2">Right lane and operable</td><td>ODD-MDP</td><td class="c">85 / 100</td><td class="c">76 – 91 %</td></tr>
          <tr class="hl"><td>ODD-POMDP</td><td class="c">94 / 100</td><td class="c">87 – 98 %</td></tr>
          <tr class="sep"><td rowspan="2"><b>Forecast errors</b></td><td rowspan="2">Fog passed</td><td>ODD-MDP</td><td class="c">10 / 20</td><td class="c">27 – 73 %</td></tr>
          <tr class="hl"><td>ODD-POMDP</td><td class="c">19 / 20</td><td class="c">75 – 100 %</td></tr></table>
        <p class="small mute" style="margin:0">Exact Clopper–Pearson intervals. Both planners run on the same seeds, so a paired test would be sharper.</p>` },

    { id: "b-takeover", sec: "backup", kicker: "Appendix", title: "Driver takeover and automation levels",
      html: `<div class="card grow"><ul class="list">
          <li><b>Level 2:</b> fail-operational decisions can reduce unplanned disengagements when the context shifts</li>
          <li><b>Level 3:</b> the system must issue a timely request to intervene, 12 to 15 s ahead, and drivers are often unaware of the system limits</li>
          <li><b>Above Level 3:</b> the system reaches a minimal risk condition by itself</li>
          <li>In ODD-aptive, the fallback is a guarantee held in reserve rather than the default behavior. Depending on the level, it is an MRM or a timely takeover request</li>
          <li>Scenario 1 uses a time budget of 20 s to reach a minimal risk condition, consistent with Level 3</li></ul></div>` },

    { id: "b-notation", sec: "backup", kicker: "Appendix", title: "Notation used in the presentation",
      html: `<table class="tbl"><tr><th>Symbol</th><th>Meaning</th><th>Symbol</th><th>Meaning</th></tr>
          <tr><td class="eq" style="font-size:24px">OD, <i>X</i><sub>ODD</sub></td><td>operational domain, ODD space</td><td class="eq" style="font-size:24px"><i>H</i></td><td>planning horizon (steps)</td></tr>
          <tr><td class="eq" style="font-size:24px"><i>U</i>, ${Uens()}</td><td>maneuvers, ensured maneuvers</td><td class="eq" style="font-size:24px"><i>τ</i></td><td>confidence threshold</td></tr>
          <tr><td class="eq" style="font-size:24px"><i>A</i>, ${Aens()}</td><td>actions, ensured actions</td><td class="eq" style="font-size:24px"><i>b<sub>t</sub></i></td><td>belief (particles)</td></tr>
          <tr><td class="eq" style="font-size:24px"><i>f<sub>k</sub></i></td><td>skill <i class="m">k</i> fulfilled (0 or 1)</td><td class="eq" style="font-size:24px"><i>m<sub>k</sub></i></td><td>strategic margin</td></tr>
          <tr><td class="eq" style="font-size:24px">𝒦(<i>u</i>)</td><td>skills required by <i class="m">u</i></td><td class="eq" style="font-size:24px"><i>ρ</i></td><td>traffic density</td></tr>
          <tr><td class="eq" style="font-size:24px"><i>R</i>, <i>W</i></td><td>reward terms and weights</td><td class="eq" style="font-size:24px"><i>T</i><sub>thr</sub></td><td>fallback threshold</td></tr></table>` },

    { id: "b-vil", sec: "backup", kicker: "Appendix", title: "Vehicle-in-the-loop: plans and execution",
      html: `<div class="row grow"><div class="card col" style="flex:1.4 1 0"><h4>Four-maneuver plan at each update</h4>${fig("vil_planned_actions.png", "Planned actions")}</div>
          <div class="card col grow"><h4>Execution</h4>${fig("vil_speed.png", "Speed and lateral acceleration")}</div></div>
        <div class="card"><ul class="list small">
          <li>Both left lane changes appear in step 2 a few seconds before they become step 1</li>
          <li>Intermediate returns appear in step 2 around 50, 61 and 66 s, but never reach step 1</li>
          <li>Speed almost constant at ≈ 60 km/h</li></ul></div>` },
  ];

  // appendix index: one link per appendix slide
  backups[0].html = `<div class="body"><div class="bindex">${backups.slice(1).map((b, j) =>
    `<a data-go="${b.id}"><b>A${j + 1}</b><span>${b.title}</span></a>`).join("")}</div></div>`;

  window.TALK = {
    footer: "Rhandy Cardenas  ·  Fail-operational decision-making for intelligent vehicles",
    sections, slides, backups,
  };
})();
