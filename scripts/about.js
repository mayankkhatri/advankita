//!Whatsapp button
document.getElementById("whatsappIcon").addEventListener("click", function () {
  document.getElementById("chatPopup").style.display = "block";
});

document.getElementById("closeBtn").addEventListener("click", function () {
  document.getElementById("chatPopup").style.display = "none";
});

// !Whatsapp button
// !reviews

document.querySelectorAll(".review-card").forEach((card) => {
  card.addEventListener("click", () => {
    window.open(card.getAttribute("data-url"), "_blank");
  });
});

document.querySelector(".write-review-btn").addEventListener("click", () => {
  window.open("https://maps.app.goo.gl/4FpiePVCM15imKKF7", "_blank");
});
