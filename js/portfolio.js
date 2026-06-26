(function () {
  const filters = document.querySelectorAll(".pf-filter");
  const items = document.querySelectorAll(".pf-item");
  const empty = document.getElementById("pfEmptyState");

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Active tab
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const cat = btn.dataset.filter;
      let visible = 0;

      items.forEach((item) => {
        const match = cat === "all" || item.dataset.category === cat;
        if (match) {
          item.classList.remove("pf-hidden");
          visible++;
        } else {
          item.classList.add("pf-hidden");
        }
      });

      empty.classList.toggle("hidden", visible > 0);
      empty.classList.toggle("flex", visible === 0);
    });
  });
})();
