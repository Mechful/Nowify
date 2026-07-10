let cfg = {};
let rootEl = null;
let textEl = null;
let marqueeEl = null;
let marqueeInner = null;
let currentTrack = null;
let marqueeRaf = null;

function init(config) {
  cfg = config || {};
  const app = document.getElementById("app");
  if (!app) return;
  app.innerHTML =
    '<div class="tl-wrap"><div class="tl-text" id="tl-text"></div>' +
    '<div class="tl-marquee" id="tl-marquee" style="display:none">' +
    '<div class="tl-marquee-inner" id="tl-marquee-inner">' +
    '<span class="tl-marquee-text"></span>' +
    '<span class="tl-marquee-text" aria-hidden="true"></span>' +
    "</div></div></div>";
  rootEl = app.querySelector(".tl-wrap");
  textEl = document.getElementById("tl-text");
  marqueeEl = document.getElementById("tl-marquee");
  marqueeInner = document.getElementById("tl-marquee-inner");
  applyStyle();
}

function applyStyle() {
  if (!textEl) return;
  var fontSize = (cfg.textlineFontSize || 28) + "px";
  var color = cfg.textlineColor || "#ffffff";
  textEl.style.fontSize = fontSize;
  textEl.style.color = color;
  var copies = marqueeEl ? marqueeEl.querySelectorAll(".tl-marquee-text") : [];
  for (var i = 0; i < copies.length; i++) {
    copies[i].style.fontSize = fontSize;
    copies[i].style.color = color;
  }

  var bgColor = cfg.textlineBgColor || "#000000";
  var bgOpacity = Number(cfg.textlineBgOpacity) || 0;
  if (bgOpacity > 0) {
    var r = parseInt(bgColor.slice(1, 3), 16);
    var g = parseInt(bgColor.slice(3, 5), 16);
    var b = parseInt(bgColor.slice(5, 7), 16);
    rootEl.style.background =
      "rgba(" + r + "," + g + "," + b + "," + (bgOpacity / 100) + ")";
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
  var overflows =
    cfg.textlineMarquee && textEl.scrollWidth > textEl.clientWidth;
  if (overflows) {
    textEl.style.display = "none";
    marqueeEl.style.display = "";
    marqueeEl.classList.remove("tl-marquee-rtl", "tl-marquee-ltr");
    marqueeEl.classList.add(
      cfg.textlineMarqueeDir === "ltr" ? "tl-marquee-ltr" : "tl-marquee-rtl",
    );
  } else {
    textEl.style.display = "";
    marqueeEl.style.display = "none";
  }
}

function render(track) {
  if (!rootEl) return;
  currentTrack = track || {};
  var title = currentTrack.title || "";
  var artist = currentTrack.artist || "";
  var text =
    title && artist ? title + " By " + artist : title || artist || "";
  textEl.textContent = text;
  var copies = marqueeEl ? marqueeEl.querySelectorAll(".tl-marquee-text") : [];
  for (var i = 0; i < copies.length; i++) {
    copies[i].textContent = text;
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
  marqueeEl = null;
  marqueeInner = null;
  currentTrack = null;
  marqueeRaf = null;
}

export { init, render, destroy };
