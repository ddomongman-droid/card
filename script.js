(function () {
  const card = document.getElementById("card");
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
      setTimeout(function () {
        toast.hidden = true;
      }, 220);
    }, 1600);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("클립보드에 복사했어요");
    } catch {
      showToast("복사에 실패했어요");
    }
  }

  document.querySelectorAll(".contact-link[data-copy]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      copyText(el.getAttribute("data-copy"));
    });
  });

  if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  card.addEventListener(
    "pointermove",
    function (e) {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      const rx = Math.max(-6, Math.min(6, -y * 12));
      const ry = Math.max(-6, Math.min(6, x * 12));
      card.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
    },
    { passive: true }
  );

  card.addEventListener("pointerleave", function () {
    card.style.transform = "";
  });
})();
