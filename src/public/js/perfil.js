document.addEventListener("DOMContentLoaded", function() {
    var perfilBtn = document.getElementById("perfilBtn");
    var perfilMenu = document.getElementById("perfilMenu");
  
    perfilBtn.addEventListener("click", function() {
      perfilMenu.style.display = (perfilMenu.style.display === "block") ? "none" : "block";
    });
  
    // Cierra el menú si se hace clic en cualquier lugar fuera de él
    document.addEventListener("click", function(event) {
      if (!perfilBtn.contains(event.target) && !perfilMenu.contains(event.target)) {
        perfilMenu.style.display = "none";
      }
    });
  });