// Seleccionamos los elementos del DOM
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("nav-links");
const menuLinks = navLinks.querySelectorAll("a"); // Seleccionamos todos los enlaces dentro del menú

// Cuando el botón del menú sea clickeado, togglear la clase 'show' en el menú
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Añadir un event listener a cada enlace para cerrar el menú cuando se haga clic
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show"); // Ocultar el menú al hacer clic en un enlace
  });
});
