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
});

