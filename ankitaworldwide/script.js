/**
 * script.js
 * Contains intersection observer logic and SVG scroll animations 
 * for the Process section.
 */
document.addEventListener("DOMContentLoaded", () => {
  // --- Process Section Logic ---
  
  const processCards = document.querySelectorAll('.process-card');
  const svgPath = document.querySelector('.timeline-path');
  const processRight = document.querySelector('.process-right');
  const timelineSvg = document.querySelector('.timeline-svg');
  
  if (svgPath && processRight && timelineSvg) {
    // 1. Draw SVG path dynamically to fit container
    function drawDynamicPath() {
      if (window.innerWidth <= 992) return; // Mobile uses straight CSS line
      
      // Use absolute heights to position nodes properly
      const width = timelineSvg.clientWidth;
      const height = timelineSvg.clientHeight;
      
      // Find all nodes and their positions relative to the SVG container
      const nodes = document.querySelectorAll('.timeline-node');
      const svgRect = timelineSvg.getBoundingClientRect();
      
      const points = [];
      nodes.forEach(node => {
        const rect = node.getBoundingClientRect();
        // Calculate center of the node relative to the SVG
        points.push({
          x: rect.left + rect.width / 2 - svgRect.left,
          y: rect.top + rect.height / 2 - svgRect.top
        });
      });

      if (points.length < 2) return;

      // Start the path slightly above the first node
      let pathData = `M ${points[0].x} 0 `;
      pathData += `L ${points[0].x} ${points[0].y} `; // Line to first node

      // Draw bezier curves between nodes
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        
        // Control points for a smooth vertical S-curve
        const ctrlY1 = p1.y + (p2.y - p1.y) * 0.5;
        const ctrlY2 = p2.y - (p2.y - p1.y) * 0.5;
        
        pathData += `C ${p1.x} ${ctrlY1}, ${p2.x} ${ctrlY2}, ${p2.x} ${p2.y} `;
      }
      
      // Extend the path to the bottom of the container
      const lastPoint = points[points.length - 1];
      pathData += `L ${lastPoint.x} ${height}`;
      
      svgPath.setAttribute('d', pathData.trim());
      
      const length = svgPath.getTotalLength();
      svgPath.style.strokeDasharray = length;
      svgPath.style.strokeDashoffset = length; // Hide initially
    }

    // Initial draw and re-draw on resize
    setTimeout(drawDynamicPath, 100);
    window.addEventListener('resize', drawDynamicPath);

    // 2. Scroll Animation Logic
    window.addEventListener('scroll', () => {
      // Calculate scroll progress through the process section
      const rect = processRight.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Start drawing when top of section is at 75% of viewport
      const startDraw = windowHeight * 0.75;
      // Finish drawing when bottom of section is at 25% of viewport
      const endDraw = windowHeight * 0.25;
      
      // Scrolled amount past the start point
      const scrolled = startDraw - rect.top;
      const totalScroll = rect.height + startDraw - endDraw;
      
      let percentage = scrolled / totalScroll;
      percentage = Math.max(0, Math.min(1, percentage));

      if (window.innerWidth > 992) {
        // Draw the SVG line
        const length = svgPath.getTotalLength();
        if (length > 0) {
          const drawLength = length * percentage;
          svgPath.style.strokeDashoffset = length - drawLength;
        }
      }

      // Activate cards based on percentage or viewport position
      processCards.forEach((card, index) => {
        if (window.innerWidth > 992) {
          // Desktop: activate based on timeline completion percentage
          const triggerPoints = [0.15, 0.4, 0.65, 0.9];
          if (percentage >= triggerPoints[index]) {
            card.classList.add('active');
          } else {
            card.classList.remove('active');
          }
        } else {
          // Mobile: activate based on card entering viewport
          const cardRect = card.getBoundingClientRect();
          if (cardRect.top < windowHeight * 0.65 && cardRect.bottom > windowHeight * 0.1) {
            card.classList.add('active');
          } else {
            card.classList.remove('active');
          }
        }
      });
    });
  }

  // --- Testimonials Section Logic ---
  const testimonialsTrack = document.querySelector('.testimonials-track');
  const testimonialsPrevBtn = document.querySelector('.testimonials-nav-btn.prev');
  const testimonialsNextBtn = document.querySelector('.testimonials-nav-btn.next');
  const currentSlideSpan = document.querySelector('.current-slide');
  const testimonialCards = document.querySelectorAll('.testimonial-card');

  if (testimonialsTrack && testimonialsPrevBtn && testimonialsNextBtn && currentSlideSpan && testimonialCards.length > 0) {
    const getScrollAmount = () => {
      const card = testimonialsTrack.querySelector('.testimonial-card');
      const gap = parseInt(window.getComputedStyle(testimonialsTrack).gap) || 32;
      return card.offsetWidth + gap;
    };

    // Navigation buttons clicks
    testimonialsPrevBtn.addEventListener('click', () => {
      testimonialsTrack.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    testimonialsNextBtn.addEventListener('click', () => {
      testimonialsTrack.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    // Update the counter on scroll
    const updateCounter = () => {
      const scrollAmt = getScrollAmount();
      const activeIndex = Math.round(testimonialsTrack.scrollLeft / scrollAmt);
      const slideNumber = Math.min(testimonialCards.length, Math.max(1, activeIndex + 1));
      currentSlideSpan.textContent = String(slideNumber).padStart(2, '0');
    };

    testimonialsTrack.addEventListener('scroll', updateCounter);
    window.addEventListener('resize', updateCounter);
    
    // Initial call
    setTimeout(updateCounter, 100);

    // Drag-to-scroll functionality for desktop
    const testimonialsDragIndicator = document.querySelector('.testimonials-drag-indicator');
    const globalCursor = document.querySelector('.global-cursor');
    let isDown = false;
    let startX;
    let scrollLeft;

    testimonialsTrack.addEventListener('mouseenter', () => {
      if (window.innerWidth > 992 && testimonialsDragIndicator) {
        testimonialsDragIndicator.style.opacity = '1';
        testimonialsDragIndicator.style.visibility = 'visible';
        if (globalCursor) globalCursor.style.opacity = '0';
      }
    });

    testimonialsTrack.addEventListener('mousedown', (e) => {
      isDown = true;
      if (testimonialsDragIndicator) {
        testimonialsDragIndicator.style.transform = 'translate(-50%, -50%) scale(0.9)';
      }
      startX = e.pageX - testimonialsTrack.offsetLeft;
      scrollLeft = testimonialsTrack.scrollLeft;
    });

    testimonialsTrack.addEventListener('mouseleave', () => {
      isDown = false;
      if (window.innerWidth > 992 && testimonialsDragIndicator) {
        testimonialsDragIndicator.style.opacity = '0';
        testimonialsDragIndicator.style.visibility = 'hidden';
        testimonialsDragIndicator.style.transform = 'translate(-50%, -50%) scale(1)';
        if (globalCursor) globalCursor.style.opacity = '1';
      }
    });

    testimonialsTrack.addEventListener('mouseup', () => {
      isDown = false;
      if (testimonialsDragIndicator) {
        testimonialsDragIndicator.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    });

    testimonialsTrack.addEventListener('mousemove', (e) => {
      if (window.innerWidth > 992 && testimonialsDragIndicator) {
        testimonialsDragIndicator.style.left = e.clientX + 'px';
        testimonialsDragIndicator.style.top = e.clientY + 'px';
      }
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - testimonialsTrack.offsetLeft;
      const walk = (x - startX) * 2; // scroll speed multiplier
      testimonialsTrack.scrollLeft = scrollLeft - walk;
    });
  }

  // --- FAQ Accordion Logic ---
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const content = item.querySelector(".accordion-content");
      const isActive = item.classList.contains("active");

      // Close all other items
      document.querySelectorAll(".accordion-item").forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const otherContent = otherItem.querySelector(".accordion-content");
          if (otherContent) otherContent.style.maxHeight = null;
          const otherHeader = otherItem.querySelector(".accordion-header");
          if (otherHeader) otherHeader.setAttribute("aria-expanded", "false");
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove("active");
        if (content) content.style.maxHeight = null;
        header.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("active");
        if (content) content.style.maxHeight = content.scrollHeight + "px";
        header.setAttribute("aria-expanded", "true");
      }
    });
  });

  // --- Contact Form Submission Logic ---
  const consultationForm = document.getElementById("consultationForm");
  const contactFormCard = document.querySelector(".contact-form-card");
  const successDismissBtn = document.getElementById("successDismissBtn");

  if (consultationForm && contactFormCard && successDismissBtn) {
    consultationForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Show a premium loading state
      const submitBtn = consultationForm.querySelector(".contact-submit-btn");
      const submitBtnText = submitBtn.querySelector("span");
      const originalText = submitBtnText.textContent;
      submitBtnText.textContent = "Sending...";
      submitBtn.disabled = true;

      // Simulate network request duration
      setTimeout(() => {
        submitBtnText.textContent = originalText;
        submitBtn.disabled = false;

        // Reset inputs
        consultationForm.reset();

        // Trigger success fade-in panel
        contactFormCard.classList.add("submitted");
      }, 1200);
    });

    successDismissBtn.addEventListener("click", () => {
      contactFormCard.classList.remove("submitted");
    });
  }

  // --- Contact Card Scroll Reveal ---
  const contactCards = document.querySelectorAll(".contact-info-card");
  if (contactCards.length > 0) {
    const revealContactCards = () => {
      const windowHeight = window.innerHeight;
      contactCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < windowHeight * 0.85) {
          card.classList.add("active");
        } else {
          card.classList.remove("active");
        }
      });
    };
    window.addEventListener("scroll", revealContactCards);
    window.addEventListener("resize", revealContactCards);
    // Initial call
    setTimeout(revealContactCards, 100);
  }

  // --- Premium Footer Interactivity ---
  
  // 1. Mouse Coordinate Tracking for Ambient Hover Radial Glow
  const footer = document.querySelector(".premium-footer");
  if (footer) {
    footer.addEventListener("mousemove", (e) => {
      const rect = footer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      footer.style.setProperty("--mouse-x", `${x}px`);
      footer.style.setProperty("--mouse-y", `${y}px`);
    });
  }

  // 2. Scroll Progress Ring & Back to Top Button
  const progressCircle = document.getElementById("progressRingCircle");
  const backToTopBtn = document.getElementById("backToTopBtn");
  const circumference = 2 * Math.PI * 24; // 150.796

  if (progressCircle) {
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;
  }

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.min(1, Math.max(0, scrollTop / docHeight));
    
    if (progressCircle) {
      const offset = circumference - scrollPercentage * circumference;
      progressCircle.style.strokeDashoffset = offset;
    }
  };

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", updateScrollProgress);
  updateScrollProgress();

  // 3. IntersectionObserver Reveal Animation for Footer Items
  const revealElements = document.querySelectorAll(".premium-footer .scroll-reveal");
  if (revealElements.length > 0) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  }

  // 4. Newsletter Form Handler
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterStatus = document.getElementById("newsletterStatus");
  if (newsletterForm && newsletterStatus) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("newsletterEmail");
      if (emailInput && emailInput.value) {
        newsletterStatus.textContent = "Thank you for subscribing!";
        newsletterStatus.className = "newsletter-status-message success";
        emailInput.value = "";
        setTimeout(() => {
          newsletterStatus.style.opacity = "0";
        }, 3000);
        newsletterStatus.style.opacity = "1";
      }
    });
  }

  // 5. Magnetic Hover Effects for Social Buttons & Main CTA Button
  const magnetics = document.querySelectorAll(".social-ripple-btn, .footer-cta-btn");
  magnetics.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });
});
