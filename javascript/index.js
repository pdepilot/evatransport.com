// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
const mobileDropdown = document.getElementById("mobileDropdown");
const mobileDropdownToggle = document.querySelector(
  ".mobile-dropdown .dropdown-toggle"
);

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileNav.classList.toggle("active");
});

// Close mobile nav when clicking a link
document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileNav.classList.remove("active");
  });
});

// Mobile dropdown toggle
if (mobileDropdownToggle) {
  mobileDropdownToggle.addEventListener("click", (e) => {
    e.preventDefault();
    mobileDropdown.classList.toggle("active");
  });
}

// Navbar Scroll Effect
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Scroll to Top Button
  const scrollTop = document.getElementById("scrollTop");
  if (window.pageYOffset > 300) {
    scrollTop.classList.add("active");
  } else {
    scrollTop.classList.remove("active");
  }

  // Active Nav Link Based on Scroll Position
  updateActiveNavLink();
});

// Scroll to Top Functionality
const scrollTopBtn = document.getElementById("scrollTop");

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Hero Slider - Clean Auto-Sliding
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
const totalSlides = slides.length;
let slideInterval;
const slideDuration = 6000; // 6 seconds per slide
let progressInterval;
const progressBar = document.getElementById("progressBar");
const slideProgress = document.getElementById("slideProgress");

// Initialize slider
function initSlider() {
  updateSlider();
  startAutoSlide();
  startProgressBar();
}

// Update slider display
function updateSlider() {
  // Remove active class from all slides
  slides.forEach((slide) => slide.classList.remove("active"));

  // Add active class to current slide
  slides[currentSlide].classList.add("active");
}

// Go to next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
  resetProgressBar();
}

// Start auto sliding
function startAutoSlide() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, slideDuration);
}

// Start progress bar animation
function startProgressBar() {
  clearInterval(progressInterval);
  let width = 0;
  const increment = 100 / (slideDuration / 50); // 50ms intervals

  progressInterval = setInterval(() => {
    if (width >= 100) {
      width = 0;
    } else {
      width += increment;
      progressBar.style.width = width + "%";
    }
  }, 50);
}

// Reset progress bar
function resetProgressBar() {
  progressBar.style.width = "0%";
}

// Pause auto slide on hover (optional)
const sliderContainer = document.querySelector(".slider-container");
sliderContainer.addEventListener("mouseenter", () => {
  clearInterval(slideInterval);
  clearInterval(progressInterval);
  slideProgress.style.opacity = "0";
  slideProgress.style.visibility = "hidden";
});

sliderContainer.addEventListener("mouseleave", () => {
  startAutoSlide();
  startProgressBar();
  slideProgress.style.opacity = "0";
  slideProgress.style.visibility = "hidden";
});

// Initialize slider
initSlider();

// Image Modal Functionality
const fleetCards = document.querySelectorAll(".fleet-card");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

fleetCards.forEach((card) => {
  card.addEventListener("click", () => {
    const imgSrc =
      card.getAttribute("data-img") || card.querySelector("img").src;
    modalImage.src = imgSrc;
    imageModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

closeModal.addEventListener("click", () => {
  imageModal.classList.remove("active");
  document.body.style.overflow = "auto";
});

imageModal.addEventListener("click", (e) => {
  if (e.target === imageModal) {
    imageModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && imageModal.classList.contains("active")) {
    imageModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Active Nav Link Based on Scroll Position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      // Remove active class from all links
      document
        .querySelectorAll(".desktop-nav a, .mobile-nav a")
        .forEach((link) => {
          link.classList.remove("active");
        });

      // Add active class to corresponding link
      const activeLink = document.querySelector(
        `.desktop-nav a[href="#${sectionId}"], .mobile-nav a[href="#${sectionId}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });

  // Special case for home section when at top
  if (scrollPosition < 100) {
    document
      .querySelectorAll(".desktop-nav a, .mobile-nav a")
      .forEach((link) => {
        link.classList.remove("active");
      });
    document.querySelectorAll('a[href="#home"]').forEach((link) => {
      link.classList.add("active");
    });
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Only smooth scroll for on-page anchors
    if (href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        // Update active nav link
        document
          .querySelectorAll(".desktop-nav a, .mobile-nav a")
          .forEach((link) => {
            link.classList.remove("active");
          });
        this.classList.add("active");

        // Scroll to target
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});
