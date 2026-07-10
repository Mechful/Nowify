let cfg = {};
let rootEl = null;
let textEl = null;
let currentTrack = null;
let marqueeRaf = null;

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
  textEl.classList.remove("tl-marquee-rtl", "tl-marquee-ltr");
  textEl.style.textOverflow = "ellipsis";

  var bgColor = cfg.textlineBgColor || "#000000";
  var bgOpacity = Number(cfg.textlineBgOpacity) || 0;
  if (bgOpacity > 0) {
    var r = parseInt(bgColor.slice(1, 3), 16);
    var g = parseInt(bgColor.slice(3, 5), 16);
    var b = parseInt(bgColor.slice(5, 7), 16);
    rootEl.style.background = "rgba(" + r + "," + g + "," + b + "," + (bgOpacity / 100) + ")";
    rootEl.style.padding = "4px 12px";
    rootEl.style.borderRadius = "4px";
  } else {
    rootEl.style.background = "";
    rootEl.style.padding = "";
    rootEl.style.borderRadius = "";
  }
}

function checkMarquee() {
  marqueeRaf = null;
  if (!textEl || !rootEl) return;
  textEl.classList.remove("tl-marquee-rtl", "tl-marquee-ltr");
  textEl.style.textOverflow = "ellipsis";
  if (cfg.textlineMarquee && textEl.scrollWidth > textEl.clientWidth) {
    textEl.style.textOverflow = "clip";
    textEl.classList.add(cfg.textlineMarqueeDir === "ltr" ? "tl-marquee-ltr" : "tl-marquee-rtl");
  }
}

function render(track) {
  if (!rootEl) return;
  currentTrack = track || {};
  var title = currentTrack.title || "";
  var artist = currentTrack.artist || "";
  if (title && artist) {
    textEl.textContent = title + " By " + artist;
  } else {
    textEl.textContent = title || artist || "";
  }
  applyStyle();
  if (marqueeRaf) cancelAnimationFrame(marqueeRaf);
  marqueeRaf = requestAnimationFrame(checkMarquee);
}

function destroy() {
  if (marqueeRaf) cancelAnimationFrame(marqueeRaf);
  var app = document.getElementById("app");
  app?.querySelector(".tl-wrap")?.remove();
  cfg = {};
  rootEl = null;
  textEl = null;
  currentTrack = null;
  marqueeRaf = null;
}

export { init, render, destroy };
