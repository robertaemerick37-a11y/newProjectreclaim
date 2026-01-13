// ===== COMPLAINT FORM =====
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("complaintForm");
  const successSection = document.getElementById("form-success");
  const submitBtn = document.getElementById("submitBtn");

    if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loader
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    emailjs.sendForm(
      "service_r5ekkx9",
      "template_r89ar4k",
      form
    )
    .then(() => {
      form.reset();
      form.style.display = "none";
      successSection.style.display = "block";
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      alert("Failed to send complaint. Please try again.");
    })
    .finally(() => {
      // Hide loader
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    });
  });
})



// ===== NAV ACTIVE STATE =====
const navLinks = document.querySelectorAll("#menu a");
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

function setActiveFromPath() {
  if (!navLinks.length) return;
  const path = (window.location.pathname || "").split("/").pop() || "index.html";

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === path);
  });
}

document.addEventListener("DOMContentLoaded", setActiveFromPath);

// Keep clicked link blue
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    if (menu && menu.classList.contains("open")) {
      menu.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    }
  });
});

// Toggle mobile menu
if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

// Close menu with X
const menuClose = document.getElementById("menu-close");
if (menuClose && menu) {
  menuClose.addEventListener("click", () => {
    menu.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
}
// ===== DROPDOWN MENU =====
  document.addEventListener("DOMContentLoaded", () => {
    const dropBtn = document.querySelector(".dropbtn");

    dropBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dropBtn.nextElementSibling.classList.toggle("show-dropdown");
    });
  });

  
// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("section").forEach(section => {
    section.classList.add("reveal");
    observer.observe(section);
  });
});

// ===== HERO SLIDER + DASHES =====
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dashes = document.querySelectorAll(".dash");

let currentSlide = 0;

function showSlide(index) {
  if (!slides.length) return;

  slides.forEach(slide => slide.classList.remove("active"));
  dashes.forEach(dash => dash.classList.remove("active"));

  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  slides[currentSlide].classList.add("active");
  if (dashes[currentSlide]) {
    dashes[currentSlide].classList.add("active");
  }
}

// Arrow controls
if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
  prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
}

// Dash controls
dashes.forEach(dash => {
  dash.addEventListener("click", () => {
    showSlide(Number(dash.dataset.slide));
  });
});
// ===== HERO SWIPE SUPPORT (MOBILE) =====
const hero = document.getElementById("hero-slider");

if (hero) {
  let startX = 0;
  let startY = 0;

  hero.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  hero.addEventListener("touchend", function (e) {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    // Ignore vertical scroll
    if (Math.abs(diffX) < Math.abs(diffY)) return;

    if (Math.abs(diffX) > 50) {
      if (diffX < 0) {
        // Swipe LEFT
        showSlide(currentSlide + 1);
      } else {
        // Swipe RIGHT
        showSlide(currentSlide - 1);
      }
    }
  }, { passive: true });
}



// ===== HERO CTA SCROLL =====
const heroButtons = document.querySelectorAll(".hero-cta");
const complaintSection = document.getElementById("complaint-form");

heroButtons.forEach(button => {
  button.addEventListener("click", () => {
    complaintSection.scrollIntoView({ behavior: "smooth" });
  });
});

// ===== ABOUT SPLIT REVEALS =====
document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(
    ".reveal-left, .reveal-up"
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach(item => observer.observe(item));
});


// ===== SOLUTION SECTION REVEAL =====
const solutionReveal = document.querySelector(".solution-reveal");

if (solutionReveal) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.25
    }
  );

  observer.observe(solutionReveal);
}

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("scrollTopBtn");
  let lastScrollTop = 0;

  if (!btn) return;

  window.addEventListener("scroll", function () {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    // scrolling DOWN and past threshold
    if (currentScroll > lastScrollTop && currentScroll > 200) {
      btn.classList.add("show");      // ← ADD HERE
    } else {
      btn.classList.remove("show");   // ← REMOVE HERE
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  btn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

