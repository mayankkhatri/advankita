document.querySelectorAll(".review-card").forEach((card) => {
  card.addEventListener("click", () => {
    window.open(card.getAttribute("data-url"), "_blank");
  });
});

document.querySelector(".write-review-btn").addEventListener("click", () => {
  window.open("https://maps.app.goo.gl/4FpiePVCM15imKKF7", "_blank");
});
