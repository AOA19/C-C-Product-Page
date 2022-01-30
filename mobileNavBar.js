const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");
const close = document.querySelector(".fas");

// Hamburger toggle function:
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  close.classList.toggle("fa-times");
  navMenu.classList.toggle("active");
});

// Function to close the hamburger menu when the links are clicked:
navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  close.classList.remove("fa-times");
  navMenu.classList.remove("active");
}
