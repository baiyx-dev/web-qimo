const historyTrack = document.getElementById("historyTrack");
const historyShell = document.querySelector(".history-shell");
const slides = [...document.querySelectorAll(".history-slide")];
const dots = [...document.querySelectorAll(".history-dot")];
const prevButton = document.getElementById("historyPrev");
const nextButton = document.getElementById("historyNext");

let activeIndex = 0;
let isAnimating = false;
let shellHovered = false;

function setActiveSlide(nextIndex) {
  const clampedIndex = Math.max(0, Math.min(nextIndex, slides.length - 1));
  if (clampedIndex === activeIndex || isAnimating || window.innerWidth <= 900) return;

  isAnimating = true;
  activeIndex = clampedIndex;
  historyTrack.style.transform = `translateX(-${activeIndex * 100}vw)`;

  slides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === activeIndex);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === activeIndex);
  });

  window.setTimeout(() => {
    isAnimating = false;
  }, 950);
}

historyShell?.addEventListener("mouseenter", () => {
  shellHovered = true;
});

historyShell?.addEventListener("mouseleave", () => {
  shellHovered = false;
});

window.addEventListener(
  "wheel",
  (event) => {
    if (window.innerWidth <= 900 || !shellHovered) return;
    if (isAnimating) {
      event.preventDefault();
      return;
    }

    const shellRect = historyShell.getBoundingClientRect();
    const shellInView = shellRect.top <= 0 && shellRect.bottom >= window.innerHeight * 0.35;
    if (!shellInView) return;

    const canGoNext = event.deltaY > 20 && activeIndex < slides.length - 1;
    const canGoPrev = event.deltaY < -20 && activeIndex > 0;
    if (!canGoNext && !canGoPrev) return;

    event.preventDefault();
    if (canGoNext) setActiveSlide(activeIndex + 1);
    if (canGoPrev) setActiveSlide(activeIndex - 1);
  },
  { passive: false }
);

window.addEventListener("keydown", (event) => {
  if (window.innerWidth <= 900) return;
  if (event.key === "ArrowRight") setActiveSlide(activeIndex + 1);
  if (event.key === "ArrowLeft") setActiveSlide(activeIndex - 1);
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const nextIndex = Number(dot.dataset.index);
    setActiveSlide(nextIndex);
  });
});

prevButton?.addEventListener("click", () => setActiveSlide(activeIndex - 1));
nextButton?.addEventListener("click", () => setActiveSlide(activeIndex + 1));
