const images = document.querySelectorAll(".banner-img img");
let currentImage = 0;

function showImage(index) {
  images.forEach((img) => img.classList.remove("active"));
  images[index].classList.add("active");
}

function nextImage() {
  currentImage = (currentImage + 1) % images.length;
  showImage(currentImage);
}

function prevImage() {
  currentImage = (currentImage - 1 + images.length) % images.length;
  showImage(currentImage);
}

setInterval(nextImage, 5000);