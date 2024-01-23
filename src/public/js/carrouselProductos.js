const camisetas = [
    { nombre: 'Camiseta Inter', precio: '$6000' },
    {nombre: 'Camiseta Manchester City', precio: '$15000'},
    {nombre: 'Camiseta Boca Juniors', precio: '$20000'}
  ];

  let currentSlide = 0;
  const totalSlides = document.querySelectorAll('.carrusel-item').length;

  function showSlide(index) {
    const slides = document.querySelectorAll('.carrusel-item');
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });

    const nombreCamiseta = document.getElementById('nombreCamiseta');
    const precioCamiseta = document.getElementById('precioCamiseta');
    nombreCamiseta.textContent = camisetas[index].nombre;
    precioCamiseta.textContent = camisetas[index].precio;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
  });