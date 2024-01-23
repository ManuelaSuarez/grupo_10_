document.addEventListener("DOMContentLoaded", function () {
    var intervalo = 3000;
    var carrusel = document.getElementById("carousel");

    var marcas = carrusel.children;

    var index = 0;

    function mostrarSiguienteMarca() {
      marcas[index].classList.remove("visible");
      index = (index + 1) % marcas.length;
      marcas[index].classList.add("visible");
    }

    marcas[index].classList.add("visible");

    setInterval(mostrarSiguienteMarca, intervalo);
  });