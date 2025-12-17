// Minimal helper behavior for the narrative site:
// - If an image is missing, optionally fall back to another asset.
//   Example: <img src="Assets/14.png" data-fallback="Assets/12.png">

document.addEventListener("DOMContentLoaded", () => {
  const imgs = document.querySelectorAll("img[data-fallback]");

  imgs.forEach((img) => {
    img.addEventListener("error", () => {
      const fallback = img.getAttribute("data-fallback");
      const tried = img.getAttribute("data-fallback-tried") === "true";

      if (fallback && !tried) {
        img.setAttribute("data-fallback-tried", "true");
        img.src = fallback;
      }
    });
  });

  const menuButton = document.querySelector(".menu-button");
  const menuPanel = document.querySelector("#menu-panel");

  if (menuButton && menuPanel) {
    const closeMenu = () => {
      menuPanel.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    };

    const openMenu = () => {
      menuPanel.hidden = false;
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.setAttribute("aria-label", "Close navigation menu");
    };

    const toggleMenu = () => {
      if (menuPanel.hidden) openMenu();
      else closeMenu();
    };

    menuButton.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    menuPanel.addEventListener("click", (e) => {
      e.stopPropagation();
      const target = e.target;
      if (target && target.tagName === "A") closeMenu();
    });

    document.addEventListener("click", () => {
      if (!menuPanel.hidden) closeMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menuPanel.hidden) closeMenu();
    });
  }
});

