/* Password gate for the thesis defense pages.
   Load it in <head>, before the page renders. Until the password is entered, the page is
   hidden and the code that waits on defenseGate.whenUnlocked() does not run.
   The site is static: this keeps casual visitors out, it is not access control. */
(function () {
  "use strict";
  var HASH = "15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225"; // SHA-256 of the password
  var KEY = "defense-unlocked";
  var root = document.documentElement;
  var waiting = [];

  function stored() {
    try { return sessionStorage.getItem(KEY) === HASH; } catch (e) { return false; }
  }
  var unlocked = stored();

  window.defenseGate = {
    whenUnlocked: function (fn) { if (unlocked) fn(); else waiting.push(fn); },
    isUnlocked: function () { return unlocked; },
  };
  if (unlocked) return;

  root.classList.add("defense-locked");
  var css = document.createElement("style");
  css.textContent =
    "html.defense-locked body > *:not(#defense-gate) { display: none !important; }" +
    "html.defense-locked, html.defense-locked body { background: #063669 !important; overflow: hidden; }" +
    "#defense-gate { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 16px; background: #063669; font-family: Montserrat, 'Segoe UI', Arial, sans-serif; }" +
    "#defense-gate form { width: 100%; max-width: 420px; background: #ffffff; border-radius: 22px; padding: 34px 32px 30px; box-shadow: 0 18px 50px rgba(0,0,0,0.25); color: #262626; }" +
    "#defense-gate .k { font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #c98a00; }" +
    "#defense-gate h1 { margin: 10px 0 6px; font-size: 24px; line-height: 1.25; color: #063669; }" +
    "#defense-gate p { margin: 0 0 20px; font-size: 14px; line-height: 1.55; color: #68707a; }" +
    "#defense-gate label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: #262626; }" +
    "#defense-gate input { width: 100%; box-sizing: border-box; font: inherit; font-size: 16px; padding: 12px 14px; border: 2px solid #c9cdd1; border-radius: 12px; outline: none; color: #262626; background: #fff; }" +
    "#defense-gate input:focus { border-color: #063669; }" +
    "#defense-gate button { margin-top: 14px; width: 100%; font: inherit; font-size: 15px; font-weight: 700; padding: 12px; border: 0; border-radius: 12px; background: #063669; color: #fff; cursor: pointer; }" +
    "#defense-gate button:hover { background: #0b4583; }" +
    "#defense-gate .err { min-height: 20px; margin-top: 10px; font-size: 13px; font-weight: 600; color: #c82828; }" +
    "#defense-gate .back { display: inline-block; margin-top: 16px; font-size: 13px; color: #063669; }" +
    "#defense-gate form.shake { animation: defense-shake 300ms ease; }" +
    "@keyframes defense-shake { 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }";
  (document.head || root).appendChild(css);

  function hex(buf) {
    return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
  }

  function open() {
    try { sessionStorage.setItem(KEY, HASH); } catch (e) { /* the gate shows again on reload */ }
    unlocked = true;
    root.classList.remove("defense-locked");
    var g = document.getElementById("defense-gate");
    if (g) g.parentNode.removeChild(g);
    css.parentNode && css.parentNode.removeChild(css);
    waiting.splice(0).forEach(function (fn) { fn(); });
  }

  function build() {
    var g = document.createElement("div");
    g.id = "defense-gate";
    g.innerHTML =
      '<form autocomplete="off" aria-labelledby="defense-gate-title">' +
      '<div class="k">PhD thesis defense</div>' +
      '<h1 id="defense-gate-title">Fail-operational decision-making for intelligent vehicles</h1>' +
      "<p>This section is private. Enter the password to continue.</p>" +
      '<label for="defense-gate-pw">Password</label>' +
      '<input id="defense-gate-pw" type="password" inputmode="numeric" autocomplete="current-password" required>' +
      '<button type="submit">Enter</button>' +
      '<div class="err" role="alert" aria-live="assertive"></div>' +
      '<a class="back" href="/">← Back to the home page</a></form>';
    document.body.appendChild(g);
    var form = g.querySelector("form"), input = g.querySelector("input"), err = g.querySelector(".err");
    input.focus();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!(window.crypto && crypto.subtle)) { err.textContent = "This browser cannot check the password here."; return; }
      crypto.subtle.digest("SHA-256", new TextEncoder().encode(input.value)).then(function (d) {
        if (hex(d) === HASH) { open(); return; }
        err.textContent = "Wrong password.";
        input.value = ""; input.focus();
        form.classList.remove("shake"); void form.offsetWidth; form.classList.add("shake");
      });
    });
    // keys typed in the gate must not reach the page behind it
    g.addEventListener("keydown", function (e) { e.stopPropagation(); });
  }

  if (document.body) build(); else document.addEventListener("DOMContentLoaded", build);
})();
