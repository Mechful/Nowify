let cfg = {};
let rootEl = null;
let textEl = null;
let currentTrack = null;

function init(config) {
  cfg = config || {};
  const app = document.getElementById("app");
  if (!app) return;
  app.innerHTML = '<div class="tl-wrap"><div class="tl-text" id="tl-text"></div></div>';
  rootEl = app.querySelector(".tl-wrap");
  textEl = document.getElementById("tl-text");
  applyStyle();
}

function applyStyle() {
  if (!textEl) return;
  textEl.style.fontSize = (cfg.textlineFontSize || 28) + "px";
  textEl.style.color = cfg.textlineColor || "#ffffff";
}

function render(track) {
  if (!rootEl) return;
  currentTrack = track || {};
  const title = currentTrack.title || "";
  const artist = currentTrack.artist || "";
  if (title && artist) {
    textEl.textContent = title + " \u2014 " + artist;
  } else {
    textEl.textContent = title || artist || "";
  }
  applyStyle();
}

function destroy() {
  const app = document.getElementById("app");
  app?.querySelector(".tl-wrap")?.remove();
  cfg = {};
  rootEl = null;
  textEl = null;
  currentTrack = null;
}

export { init, render, destroy };
