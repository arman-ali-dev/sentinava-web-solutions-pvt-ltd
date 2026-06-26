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

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay =
          entry.target.style.transitionDelay || "0s";
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
reveals.forEach((el) => observer.observe(el));

// btn-primary hover for CTA
const btnP = document.querySelector(".btn-primary");
if (btnP) {
  btnP.addEventListener("mouseenter", () => {
    btnP.style.background = "#1a1a18";
    btnP.style.transform = "translateY(-2px)";
    btnP.querySelector(".arrow-icon").style.transform = "rotate(18deg)";
  });
  btnP.addEventListener("mouseleave", () => {
    btnP.style.background = "#000";
    btnP.style.transform = "";
    btnP.querySelector(".arrow-icon").style.transform = "";
  });
}
