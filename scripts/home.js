document.addEventListener("DOMContentLoaded", function () {
  ScrollReveal().reveal(".fade-section", {
    duration: 900,
    distance: "50px",
    easing: "ease-in-out",
    origin: "bottom",
    opacity: 0,
    scale: 0.85,
    reset: true, // Animation can happen each time an element comes into view
  });
});

document.querySelectorAll(".review-card").forEach((card) => {
  card.addEventListener("click", () => {
    window.open(card.getAttribute("data-url"), "_blank");
  });
});

document.querySelector(".write-review-btn").addEventListener("click", () => {
  window.open("https://maps.app.goo.gl/4FpiePVCM15imKKF7", "_blank");
});

document.getElementById("whatsappIcon").addEventListener("click", function () {
  document.getElementById("chatPopup").style.display = "block";
});

document.getElementById("closeBtn").addEventListener("click", function () {
  document.getElementById("chatPopup").style.display = "none";
});

// contact pupup.js
document.getElementById("contact-a").addEventListener("click", function () {
  document.getElementById("popup").style.display = "flex";
});

document.querySelector("#close-btn").addEventListener("click", function () {
  document.getElementById("popup").style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("popup")) {
    document.getElementById("popup").style.display = "none";
  }
});

// schedule btn
document.querySelectorAll("#schedule-btn").forEach(function (element) {
  element.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior
    document.getElementById("popup").style.display = "flex";
  });
});

// Blog cards

// Select all carousel cells
var cells = document.querySelectorAll(".carousel-cell-blog");

// Add click event listener to each cell
cells.forEach(function (cell) {
  cell.addEventListener("click", function () {
    var link = cell.getAttribute("data-link");
    if (link) {
      window.location.href = link;
    }
  });
});
