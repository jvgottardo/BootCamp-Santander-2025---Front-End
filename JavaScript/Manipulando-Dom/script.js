  const toggleBtn = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const closedButton = document.getElementById("menu-closed");

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    closedButton.classList.toggle("closed");
  });

    closedButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    closedButton.classList.toggle("closed");
  });

  // Controle de submenu no mobile
  const submenus = document.querySelectorAll(".has-submenu > a");

  submenus.forEach(menu => {
    menu.addEventListener("click", (e) => {
      e.preventDefault(); // impede redirecionamento
      const parent = menu.parentElement;
      parent.classList.toggle("open");
    });
  });
