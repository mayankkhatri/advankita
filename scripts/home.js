document.addEventListener("DOMContentLoaded", function () {
  ScrollReveal().reveal(".fade-section", {
    duration: 900,
    distance: "50px",
    easing: "ease-in-out",
    origin: "bottom",
    opacity: 0,
    scale: 0.85,
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

// Services cards
// schedule btn
document.querySelectorAll(".custom-carousel-cell").forEach(function (element) {
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

// disclaimer

const disclaimerPopup = document.getElementById("disclaimer-modal");
const agreeBtn = document.getElementById("agree-btn");

// Check if user has already agreed to the disclaimer
if (sessionStorage.getItem("disclaimerAgreed")) {
  disclaimerPopup.style.display = "none";
}

agreeBtn.addEventListener("click", function () {
  sessionStorage.setItem("disclaimerAgreed", "true");
  disclaimerPopup.style.display = "none";
});

window.onload = function () {
  const modal = document.getElementById("disclaimer-modal");
  const agreeBtn = document.getElementById("agree-btn");
  const disagreeBtn = document.getElementById("disagree-btn");

  if (!sessionStorage.getItem("disclaimerAgreed")) {
    modal.style.display = "flex";
  }

  agreeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  disagreeBtn.addEventListener("click", function () {
    window.location.href = "https://www.google.com"; // Redirect to another page or URL
  });
};

// Incriment Animation
function animateValue(obj, start, end, duration, pauseDuration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      setTimeout(() => {
        startTimestamp = null;
        window.requestAnimationFrame(step);
      }, pauseDuration);
    }
  };
  window.requestAnimationFrame(step);
}

document.querySelectorAll(".incr-anim").forEach((element) => {
  const textContent = element.textContent;
  const numericValue = parseInt(textContent.replace(/[^\d]/g, ""), 10); // Extract only the numeric part
  animateValue(element, 0, numericValue, 2000, 2000);
});
