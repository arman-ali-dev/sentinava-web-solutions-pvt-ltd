const menuBtn = document.getElementById("menuBtn");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const sidebar = document.getElementById("mobileSidebar");
const overlay = document.getElementById("mobileOverlay");

function openMenu() {
  sidebar.style.transform = "translateX(0)";
  overlay.classList.remove("opacity-0", "pointer-events-none");
  overlay.classList.add("opacity-100");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  sidebar.style.transform = "translateX(-100%)";
  overlay.classList.add("opacity-0", "pointer-events-none");
  overlay.classList.remove("opacity-100");
  document.body.style.overflow = "";
}

menuBtn.addEventListener("click", openMenu);
closeMenuBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// ── Scroll reveal ──────────────────────────────────────────
const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((el) => revealObserver.observe(el));

// ── Project Slider ─────────────────────────────────────────
(function () {
  const track = document.getElementById("projectSliderTrack");
  const wrap = document.getElementById("projectSliderWrap");
  const dotsEl = document.getElementById("sliderDots");
  const prevBtn = document.getElementById("sliderPrev");
  const nextBtn = document.getElementById("sliderNext");
  const TOTAL = 6;
  let cur = 0;

  function getSlideWidth() {
    const w = wrap.offsetWidth;
    if (w <= 640) return 85;
    if (w <= 1024) return 45;
    return 28.57;
  }

  function getVisible() {
    const w = wrap.offsetWidth;
    if (w <= 640) return 1;
    if (w <= 1024) return 2;
    return 3.5;
  }

  function maxIdx() {
    return TOTAL - Math.floor(getVisible());
  }

  function buildDots() {
    dotsEl.innerHTML = "";
    const count = maxIdx() + 1;
    for (let i = 0; i < count; i++) {
      const d = document.createElement("button");
      d.className = "slider-dot" + (i === cur ? " active" : "");
      d.setAttribute("aria-label", "Go to slide " + (i + 1));
      d.addEventListener("click", () => goTo(i));
      dotsEl.appendChild(d);
    }
  }

  function goTo(i) {
    cur = Math.max(0, Math.min(i, maxIdx()));
    track.style.transform = `translateX(-${cur * getSlideWidth()}%)`;
    dotsEl
      .querySelectorAll(".slider-dot")
      .forEach((d, j) => d.classList.toggle("active", j === cur));
    prevBtn.disabled = cur === 0;
    nextBtn.disabled = cur >= maxIdx();
  }

  prevBtn.addEventListener("click", () => goTo(cur - 1));
  nextBtn.addEventListener("click", () => goTo(cur + 1));

  // Touch swipe
  let startX = 0;
  wrap.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );
  wrap.addEventListener("touchend", (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(cur + (diff > 0 ? 1 : -1));
  });

  // Mouse drag
  let isDragging = false;
  let dragStartX = 0;
  let dragMoved = false;

  wrap.addEventListener("mousedown", (e) => {
    isDragging = true;
    dragStartX = e.clientX;
    dragMoved = false;
    track.style.transition = "none";
    wrap.style.cursor = "grabbing";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    if (Math.abs(e.clientX - dragStartX) > 5) dragMoved = true;
  });

  window.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    wrap.style.cursor = "";
    track.style.transition = "transform 0.45s cubic-bezier(0.4,0,0.2,1)";
    const diff = dragStartX - e.clientX;
    if (Math.abs(diff) > 40) goTo(cur + (diff > 0 ? 1 : -1));
    else goTo(cur);
  });

  // Prevent accidental link/image clicks after drag
  wrap.addEventListener(
    "click",
    (e) => {
      if (dragMoved) e.stopPropagation();
    },
    true,
  );

  buildDots();
  goTo(0);

  window.addEventListener("resize", () => {
    buildDots();
    goTo(Math.min(cur, maxIdx()));
  });
})();
