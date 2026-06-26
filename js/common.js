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

function handleContactSubmit(btn) {
  const section = btn.closest("section");
  const inputs = section.querySelectorAll("input, textarea, select");
  let valid = true;

  // Simple validation
  inputs.forEach((input) => {
    if (
      input.hasAttribute("required") ||
      input.closest(".flex")?.querySelector("span.text-red-400")
    ) {
      if (!input.value.trim()) {
        input.style.borderColor = "#ef4444";
        valid = false;
        setTimeout(() => (input.style.borderColor = ""), 2000);
      }
    }
  });

  const name = section
    .querySelector('input[placeholder="Rahul Sharma"]')
    .value.trim();
  const email = section.querySelector('input[type="email"]').value.trim();
  const message = section.querySelector("textarea").value.trim();

  if (!name || !email || !message) return;

  // WhatsApp redirect with form data
  const service = section.querySelector("select").value || "Not specified";
  const phone =
    section.querySelector('input[type="tel"]').value.trim() || "Not provided";
  const text = `Hi, I'm ${name}!\n\nService: ${service}\nPhone: ${phone}\nEmail: ${email}\n\nMessage: ${message}`;
  const url = `https://wa.me/919711879364?text=${encodeURIComponent(text)}`;

  // Button loading state
  btn.innerHTML = `<span class="flex items-center gap-2"><i class="ti ti-loader-2 animate-spin text-[14px]"></i> Sending...</span>`;
  setTimeout(() => {
    window.open(url, "_blank");
    btn.innerHTML = `<span class="flex items-center gap-2"><i class="ti ti-check text-[14px]"></i> Message sent!</span>`;
    setTimeout(() => {
      btn.innerHTML = `Send message <span class="arrow-icon w-[24px] h-[24px] rounded-full bg-white/15 flex items-center justify-center text-[12px]"><img src="./images/next.png" class="w-3" alt="" /></span>`;
    }, 3000);
  }, 800);
}
