document.addEventListener("DOMContentLoaded", function() {
    var perfilBtn = document.getElementById("perfilBtn");
    var perfilMenu = document.getElementById("perfilMenu");
  
    perfilBtn.addEventListener("click", function() {
      perfilMenu.style.display = (perfilMenu.style.display === "block") ? "none" : "block";
    });
  
    document.addEventListener("click", function(event) {
      if (!perfilBtn.contains(event.target) && !perfilMenu.contains(event.target)) {
        perfilMenu.style.display = "none";
      }
    });
  });

  function toggleMenu() {
    var nav = document.querySelector('nav');
    nav.classList.toggle('nav-visible');
  }