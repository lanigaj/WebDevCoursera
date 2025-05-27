// Toggle navigation menu visibility
function toggleMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.getElementById("main-menu");
  navMenu.classList.toggle("active");
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !expanded);
}

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.getElementById("main-menu");

  hamburger.addEventListener("click", toggleMenu);

  hamburger.addEventListener("keypress", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      toggleMenu();
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        // Close menu on mobile after click
        if (window.innerWidth <= 768) {
          navMenu.classList.remove("active");
          hamburger.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // Filter Projects by Category
  function filterProjects(category) {
    const projects = document.querySelectorAll('#projects article');
    projects.forEach(project => {
      if (category === 'all' || project.dataset.category === category) {
        project.style.display = '';
      } else {
        project.style.display = 'none';
      }
    });
  }

  // Lightbox Effect for Project Images
  function createLightbox() {
    // Create modal elements
    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.8)';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = 1000;

    const img = document.createElement('img');
    img.style.maxWidth = '90vw';
    img.style.maxHeight = '80vh';
    img.alt = '';
    modal.appendChild(img);

    // Close modal on click
    modal.addEventListener('click', () => {
      modal.style.display = 'none';
      img.src = '';
      img.alt = '';
    });

    document.body.appendChild(modal);

    // Add click listeners to project images
    document.querySelectorAll('#projects img').forEach(image => {
      image.style.cursor = 'pointer';
      image.addEventListener('click', (e) => {
        img.src = image.src;
        img.alt = image.alt;
        modal.style.display = 'flex';
      });
    });
  }

  // Example: Add filter buttons dynamically (customize as needed)
  const filterContainer = document.createElement('div');
  filterContainer.id = 'project-filters';
  filterContainer.style.textAlign = 'center';
  filterContainer.style.marginBottom = '1.5rem';

  ['all', 'web', 'react', 'node'].forEach(category => {
    const btn = document.createElement('button');
    btn.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    btn.setAttribute('data-category', category);
    btn.style.margin = '0 0.5rem';
    btn.addEventListener('click', () => filterProjects(category));
    filterContainer.appendChild(btn);
  });

  const projectsSection = document.getElementById('projects');
  if (projectsSection) {
    projectsSection.insertBefore(filterContainer, projectsSection.firstChild);
  }

  // Assign example categories to articles (customize as needed)
  const articles = document.querySelectorAll('#projects article');
  if (articles[0]) articles[0].dataset.category = 'web';
  if (articles[1]) articles[1].dataset.category = 'react';

  // Initialize lightbox
  createLightbox();

  // Contact Form Validation and Real-Time Feedback
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    const nameInput = contactForm.querySelector('#name');
    const emailInput = contactForm.querySelector('#email');
    const messageInput = contactForm.querySelector('#message');

    // Helper to show error message
    function showError(input, message) {
      let error = input.parentElement.querySelector('.error-message');
      if (!error) {
        error = document.createElement('span');
        error.className = 'error-message';
        error.style.color = '#d32f2f';
        error.style.fontSize = '0.95em';
        error.style.display = 'block';
        error.style.marginTop = '0.2em';
        input.parentElement.appendChild(error);
      }
      error.textContent = message;
      input.setAttribute('aria-invalid', 'true');
    }

    // Helper to clear error message
    function clearError(input) {
      let error = input.parentElement.querySelector('.error-message');
      if (error) error.textContent = '';
      input.removeAttribute('aria-invalid');
    }

    // Email validation regex
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Real-time validation
    nameInput.addEventListener('input', function () {
      if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required.');
      } else {
        clearError(nameInput);
      }
    });

    emailInput.addEventListener('input', function () {
      if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required.');
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address.');
      } else {
        clearError(emailInput);
      }
    });

    messageInput.addEventListener('input', function () {
      if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required.');
      } else {
        clearError(messageInput);
      }
    });

    // On form submit
    contactForm.addEventListener('submit', function (e) {
      let valid = true;

      if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required.');
        valid = false;
      }
      if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required.');
        valid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address.');
        valid = false;
      }
      if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required.');
        valid = false;
      }

      if (!valid) {
        e.preventDefault();
      } else {
        // Optional: Show a success message (replace form, show alert, etc.)
        e.preventDefault();
        contactForm.reset();
        [nameInput, emailInput, messageInput].forEach(clearError);
        alert('Thank you for your message! We will get back to you soon.');
      }
    });
  }
});
