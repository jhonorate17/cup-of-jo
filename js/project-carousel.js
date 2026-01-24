document.addEventListener("DOMContentLoaded", () => {
  const images = window.projectImages;
  const mainImg = document.getElementById("project-main-img");
  const dotsContainer = document.querySelector(".carousel-dots");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (!images || !mainImg || !dotsContainer) return;

  let currentIndex = 0;

  // create dots
  images.forEach((_, idx) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (idx === 0) dot.classList.add("active");
    dot.dataset.index = idx;
    dotsContainer.appendChild(dot);

    dot.addEventListener("click", () => {
      currentIndex = idx;
      updateCarousel();
    });
  });

  const dots = dotsContainer.querySelectorAll(".dot");

  function updateCarousel() {
    mainImg.src = images[currentIndex];
    dots.forEach(d => d.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  // arrow navigation
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  });

  // keyboard navigation
  document.addEventListener("keydown", e => {
    if(e.key === "ArrowLeft") prevBtn.click();
    else if(e.key === "ArrowRight") nextBtn.click();
  });
});
