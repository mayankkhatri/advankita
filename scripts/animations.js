//!  Service Page Image Swap

document.addEventListener("DOMContentLoaded", function () {
  const shapeImageContainers = document.querySelectorAll(".shape-images");

  // Function to randomly swap a variable number of images with a fade effect
  function swapImages(imagesToSwap) {
    imagesToSwap.forEach(([img1, img2]) => {
      img1.style.opacity = "0";
      img2.style.opacity = "0";
    });

    setTimeout(() => {
      imagesToSwap.forEach(([img1, img2]) => {
        const tempSrc = img1.src;
        img1.src = img2.src;
        img2.src = tempSrc;

        img1.style.opacity = "1";
        img2.style.opacity = "1";
      });
    }, 1000); // Wait for the fade-out effect before swapping
  }

  // Function to pick a random number of images to swap from different groups
  function randomSwap() {
    const group1 = Array.from(
      shapeImageContainers[0].querySelectorAll(".rectangle-img, .circle-img")
    );
    const group2 = Array.from(
      shapeImageContainers[1].querySelectorAll(".rectangle-img, .circle-img")
    );

    const numSwaps =
      Math.floor(Math.random() * Math.min(group1.length, group2.length)) + 1; // Random number of swaps between 1 and min(group1.length, group2.length)

    const imagesToSwap = [];

    for (let i = 0; i < numSwaps; i++) {
      const index1 = Math.floor(Math.random() * group1.length);
      const index2 = Math.floor(Math.random() * group2.length);

      imagesToSwap.push([
        group1[index1].querySelector("img"),
        group2[index2].querySelector("img"),
      ]);
    }

    swapImages(imagesToSwap);
  }

  // Start swapping images every 2 seconds
  setInterval(randomSwap, 5000);
});

//! Service Page image swap

//? Stats increase animation
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

//? Stats increase animation

//!Whatsapp button
document.getElementById("whatsappIcon").addEventListener("click", function () {
  document.getElementById("chatPopup").style.display = "block";
});

document.getElementById("closeBtn").addEventListener("click", function () {
  document.getElementById("chatPopup").style.display = "none";
});

// !Whatsapp button
