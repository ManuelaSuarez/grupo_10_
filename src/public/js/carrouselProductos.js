// const camisetas = [
//     { nombre: 'Camiseta Inter', precio: '$6000' },
//     {nombre: 'Camiseta Manchester City', precio: '$15000'},
//     {nombre: 'Camiseta Boca Juniors', precio: '$20000'}
//   ];

//   let currentSlide = 0;
//   const totalSlides = document.querySelectorAll('.carrusel-item').length;

//   function showSlide(index) {
//     const slides = document.querySelectorAll('.carrusel-item');
//     slides.forEach((slide, i) => {
//       slide.style.display = i === index ? 'block' : 'none';
//     });

//     const nombreCamiseta = document.getElementById('nombreCamiseta');
//     const precioCamiseta = document.getElementById('precioCamiseta');
//     nombreCamiseta.textContent = camisetas[index].nombre;
//     precioCamiseta.textContent = camisetas[index].precio;
//   }

//   function nextSlide() {
//     currentSlide = (currentSlide + 1) % totalSlides;
//     showSlide(currentSlide);
//   }

//   function prevSlide() {
//     currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
//     showSlide(currentSlide);
//   }

//   document.addEventListener('DOMContentLoaded', () => {
//     showSlide(currentSlide);
//   });

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}