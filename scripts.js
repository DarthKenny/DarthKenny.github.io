document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.querySelector(".gallery");
    const prevButton = document.querySelector(".gallery-btn-prev");
    const nextButton = document.querySelector(".gallery-btn-next");

    let currentIndex = 0;
    const maxIndex = gallery.children.length - 1;

    prevButton.addEventListener("click", function() {
      currentIndex = (currentIndex === 0) ? maxIndex : currentIndex - 1;
      moveGallery();
    });

    nextButton.addEventListener("click", function() {
      currentIndex = (currentIndex === maxIndex) ? 0 : currentIndex + 1;
      moveGallery();
    });

    function moveGallery() {
      const newPosition = currentIndex * -100 + "%";
      gallery.style.transform = `translateX(${newPosition})`;
    }
  });
