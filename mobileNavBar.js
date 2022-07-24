const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

// Hamburger toggle function:
hamburger.addEventListener("click", () => {
  const visible = navMenu.getAttribute("data-visible");
  if (visible === "false") {
    navMenu.setAttribute("data-visible", true);
    hamburger.setAttribute("aria-expanded", true);
  } else {
    navMenu.setAttribute("data-visible", false);
    hamburger.setAttribute("aria-expanded", false);
  }
});

// Function to close the hamburger menu when the links are clicked:
navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  navMenu.setAttribute("data-visible", false);
  hamburger.setAttribute("aria-expanded", false);
}
