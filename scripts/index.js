document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenu = document.getElementById('mobile-menu');
  const navbar = document.getElementById('navbar');
  
  mobileMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    navbar.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a nav link
  const navLinks = navbar.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      navbar.classList.remove('active');
    });
  });
  
  // Hero Slider
  let currentSlide = 0;
  const heroSlides = document.querySelectorAll('.hero-slide');
  const sliderDots = document.querySelectorAll('.slider-dot');
  
  if (heroSlides.length > 0) {
    // Auto slide change
    setInterval(nextSlide, 7000);
    
    // Dot navigation
    sliderDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        changeSlide(index);
      });
    });
  }
  
  function nextSlide() {
    changeSlide((currentSlide + 1) % heroSlides.length);
  }
  
  function changeSlide(index) {
    heroSlides[currentSlide].classList.remove('active');
    sliderDots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    heroSlides[currentSlide].classList.add('active');
    sliderDots[currentSlide].classList.add('active');
  }
  
  // Service Modal
  const serviceCards = document.querySelectorAll('.service-card');
  const serviceModal = document.getElementById('serviceModal');
  const closeModal = document.querySelector('.close-modal');
  const serviceDetails = document.querySelectorAll('.service-details');
  
  if (serviceCards.length > 0) {
    serviceCards.forEach(card => {
      card.addEventListener('click', function() {
        const serviceId = this.getAttribute('data-service');
        openServiceModal(serviceId);
      });
    });
  }
  
  // Service links in footer
  const serviceLinks = document.querySelectorAll('.footer-links a[data-service]');
  if (serviceLinks.length > 0) {
    serviceLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const serviceId = this.getAttribute('data-service');
        openServiceModal(serviceId);
      });
    });
  }
  
  if (closeModal) {
    closeModal.addEventListener('click', closeServiceModal);
    
    // Close modal when clicking outside content
    serviceModal.addEventListener('click', function(e) {
      if (e.target === serviceModal) {
        closeServiceModal();
      }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && serviceModal.style.display === 'flex') {
        closeServiceModal();
      }
    });
    
    // Add event listeners to all "Request Quote" buttons in service details
    const quoteButtons = document.querySelectorAll('.service-details .btn-primary');
    quoteButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        // Close the modal before navigating
        closeServiceModal();
      });
    });
  }
  
  function openServiceModal(serviceId) {
    // Reset all service details
    serviceDetails.forEach(detail => {
      detail.classList.remove('active');
    });
    
    // Show the selected service details
    const selectedService = document.getElementById(serviceId);
    if (selectedService) {
      selectedService.classList.add('active');
      serviceModal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  }
  
  function closeServiceModal() {
    serviceModal.style.display = 'none';
    document.body.style.overflow = ''; // Enable scrolling
  }
  
  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentTestimonial = 0;
  
  if (testimonialSlides.length > 0) {
    // Next testimonial button
    nextBtn.addEventListener('click', function() {
      changeTestimonial((currentTestimonial + 1) % testimonialSlides.length);
    });
    
    // Previous testimonial button
    prevBtn.addEventListener('click', function() {
      changeTestimonial((currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length);
    });
    
    // Dot navigation
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        changeTestimonial(index);
      });
    });
    
    // Auto rotate testimonials
    setInterval(function() {
      changeTestimonial((currentTestimonial + 1) % testimonialSlides.length);
    }, 10000);
  }
  
  function changeTestimonial(index) {
    testimonialSlides[currentTestimonial].classList.remove('active');
    testimonialDots[currentTestimonial].classList.remove('active');
    
    currentTestimonial = index;
    
    testimonialSlides[currentTestimonial].classList.add('active');
    testimonialDots[currentTestimonial].classList.add('active');
  }
  
  // Counter Animation for About Section
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statNumbers.length > 0) {
    const countersObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const targetValue = parseInt(counter.getAttribute('data-count'));
          let count = 0;
          const duration = 2000; // ms
          const interval = duration / targetValue;
          
          const counterInterval = setInterval(() => {
            count++;
            counter.textContent = count;
            
            if (count >= targetValue) {
              clearInterval(counterInterval);
            }
          }, interval);
          
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(counter => {
      countersObserver.observe(counter);
    });
  }
  
  // Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const setupMapsLink = () => {
    const mapLinks = document.querySelectorAll('.maps-link');
    
    mapLinks.forEach(link => {
      const address = link.getAttribute('data-address');
      if (!address) return;
      
      const encodedAddress = encodeURIComponent(address);
      
      // Detect iOS device
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      
      if (isIOS) {
        // Apple Maps URL
        link.href = `maps://maps.apple.com/?address=${encodedAddress}&dirflg=d`;
      } else {
        // Google Maps URL (default for non-iOS)
        link.href = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
      }
    });
  };

  setupMapsLink();
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Form validation functions
  function validatePhone(phone) {
    // Basic US phone validation (accepts formats like: (123) 456-7890, 123-456-7890, 1234567890)
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;
    return phoneRegex.test(phone);
  }
  
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function validateForm(form) {
    let isValid = true;
    
    // Clear previous error messages
    form.querySelectorAll('.validation-error').forEach(el => el.remove());
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    
    // Get form elements
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const phoneInput = form.querySelector('#phone');
    const messageInput = form.querySelector('#message');
    
    // Validate name (required)
    if (nameInput && !nameInput.value.trim()) {
      addErrorMessage(nameInput, 'Please enter your name');
      isValid = false;
    }
    
    // Validate email (required and format)
    if (emailInput) {
      if (!emailInput.value.trim()) {
        addErrorMessage(emailInput, 'Please enter your email address');
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        addErrorMessage(emailInput, 'Please enter a valid email address');
        isValid = false;
      }
    }
    
    // Validate phone (if provided, check format)
    if (phoneInput && phoneInput.value.trim() && !validatePhone(phoneInput.value.trim())) {
      addErrorMessage(phoneInput, 'Please enter a valid phone number');
      isValid = false;
    }
    
    // Validate message (required)
    if (messageInput && !messageInput.value.trim()) {
      addErrorMessage(messageInput, 'Please enter your message');
      isValid = false;
    }
    
    return isValid;
  }
  
  function addErrorMessage(element, message) {
    // Create an error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'validation-error';
    errorElement.textContent = message;
    
    // Insert it after the form element
    element.parentNode.insertBefore(errorElement, element.nextSibling);
    
    // Add error class to the element
    element.classList.add('input-error');
    
    // Remove error state on input
    element.addEventListener('input', function() {
      element.classList.remove('input-error');
      const error = element.parentNode.querySelector('.validation-error');
      if (error) error.remove();
    });
  }
  
  // Handle Contact Form
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Add honeypot field
    const honeypotField = document.createElement('div');
    honeypotField.className = 'form-group website-field';
    honeypotField.innerHTML = `
      <label for="_gotcha">Website</label>
      <input type="text" id="_gotcha" name="_gotcha" class="form-control">
    `;
    contactForm.appendChild(honeypotField);
    
    // Add privacy policy checkbox
    const privacyField = document.createElement('div');
    privacyField.className = 'form-group checkbox-group';
    privacyField.innerHTML = `
      <input type="checkbox" id="privacy-consent" name="privacy-consent" class="privacy-checkbox" required>
      <label for="privacy-consent">I have read and agree to the <a href="privacy-policy.html" target="_blank">Privacy Policy</a>.</label>
    `;
    
    // Insert before the submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    contactForm.insertBefore(privacyField, submitBtn);
    
    // Add name attributes to all form fields
    contactForm.querySelectorAll('input, textarea, select').forEach(input => {
      if (!input.hasAttribute('name') && input.id) {
        input.setAttribute('name', input.id);
      }
    });
    
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Validate form
      if (!validateForm(contactForm)) {
        return false;
      }
      
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Get form data
      const formData = new FormData(contactForm);
      
      // Add formatted data to make the email more readable
      const serviceValue = document.getElementById('service').value || 'Not specified';
      const messageValue = document.getElementById('message').value || '';
      
      formData.append('formatted-message', 
        `New Contact Form Submission:\n\n` +
        `Name: ${document.getElementById('name').value}\n` +
        `Email: ${document.getElementById('email').value}\n` +
        `Phone: ${document.getElementById('phone').value}\n` +
        `Service Interested In: ${serviceValue}\n\n` +
        `Message:\n${messageValue}`
      );
      
      // Use Formspree to handle the form submission
      fetch('https://formspree.io/f/xyzenayg', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        // Handle success
        contactForm.reset();
        
        // Show success message
        const formMessage = document.createElement('div');
        formMessage.className = 'form-message success';
        formMessage.innerHTML = '<p>Thank you! Your message has been sent successfully.</p>';
        
        contactForm.appendChild(formMessage);
        
        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        // Remove the success message after 5 seconds
        setTimeout(() => {
          formMessage.remove();
        }, 5000);
      })
      .catch(error => {
        console.error('Error:', error);
        
        // Show error message
        const formMessage = document.createElement('div');
        formMessage.className = 'form-message error';
        formMessage.innerHTML = '<p>Sorry, there was a problem sending your message. Please try again later.</p>';
        
        contactForm.appendChild(formMessage);
        
        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        // Remove the error message after 5 seconds
        setTimeout(() => {
          formMessage.remove();
        }, 5000);
      });
    });
  }
  
  // Handle Newsletter Form
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    // Add honeypot field
    const honeypotField = document.createElement('div');
    honeypotField.className = 'website-field';
    honeypotField.innerHTML = `<input type="text" id="_gotcha_newsletter" name="_gotcha" class="form-control">`;
    newsletterForm.appendChild(honeypotField);
    
    // Ensure the email field has a name attribute
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (emailInput && !emailInput.hasAttribute('name')) {
      emailInput.setAttribute('name', 'email');
    }
    
    newsletterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const submitBtn = this.querySelector('button');
      
      // Clear previous errors
      this.querySelectorAll('.validation-error').forEach(el => el.remove());
      
      // Validate email
      if (!emailInput.value.trim()) {
        addErrorMessage(emailInput, 'Please enter your email address');
        return false;
      } else if (!validateEmail(emailInput.value.trim())) {
        addErrorMessage(emailInput, 'Please enter a valid email address');
        return false;
      }
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Subscribing...';
      
      // Get form data
      const formData = new FormData(newsletterForm);
      
      // Use Formspree to handle the form submission
      fetch('https://formspree.io/f/movekzqj', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        // Handle success
        newsletterForm.reset();
        
        // Show success message
        const successMessage = document.createElement('p');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for subscribing!';
        successMessage.style.color = 'white';
        successMessage.style.marginTop = '10px';
        
        newsletterForm.appendChild(successMessage);
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Subscribe';
        
        // Remove the success message after 3 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 3000);
      })
      .catch(error => {
        console.error('Error:', error);
        
        // Show error message
        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Sorry, there was a problem. Please try again.';
        errorMessage.style.color = '#e53e3e';
        errorMessage.style.marginTop = '10px';
        
        newsletterForm.appendChild(errorMessage);
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Subscribe';
        
        // Remove the error message after 3 seconds
        setTimeout(() => {
          errorMessage.remove();
        }, 3000);
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Service Slideshows
  initServiceSlideshows();
  
// Service Slideshows - Improved for dynamic dot generation
function initServiceSlideshows() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    const slideshow = card.querySelector('.service-slideshow');
    if (!slideshow) return; // Skip if no slideshow
    
    const slides = slideshow.querySelectorAll('.service-slide');
    if (slides.length <= 1) return; // Skip if only one slide
    
    // Clear any existing dots first
    const dotsContainer = card.querySelector('.service-slideshow-nav');
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      
      // Create dots based on the number of slides
      slides.forEach((slide, index) => {
        const dot = document.createElement('span');
        dot.className = index === 0 ? 'service-slide-dot active' : 'service-slide-dot';
        dot.setAttribute('data-index', index);
        dotsContainer.appendChild(dot);
      });
    }
    
    // Get newly created dots
    const dots = card.querySelectorAll('.service-slide-dot');
    
    // Set up automatic slideshow
    let slideInterval;
    startSlideshow();
    
    function startSlideshow() {
      // Clear any existing interval first
      if (slideInterval) {
        clearInterval(slideInterval);
      }
      
      slideInterval = setInterval(() => {
        nextServiceSlide(slideshow);
      }, 5000); // Change slide every 5 seconds
    }
    
    // Stop slideshow on hover or when modal is open
    card.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    // Resume slideshow when mouse leaves
    card.addEventListener('mouseleave', () => {
      startSlideshow();
    });
    
    // Add click events to dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering service modal
        changeServiceSlide(slideshow, index);
      });
    });
    
    // Make sure slideshow pauses when service modal is open
    card.addEventListener('click', () => {
      clearInterval(slideInterval);
    });
    
    // Listen for modal close to restart slideshow
    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        // Only restart if we're not hovering over card
        if (!card.matches(':hover')) {
          startSlideshow();
        }
      });
    }
  });
}

function nextServiceSlide(slideshow) {
  const slides = slideshow.querySelectorAll('.service-slide');
  const card = slideshow.closest('.service-card');
  const dots = card.querySelectorAll('.service-slide-dot');
  
  let currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active'));
  let nextIndex = (currentIndex + 1) % slides.length;
  
  changeServiceSlide(slideshow, nextIndex);
}

function changeServiceSlide(slideshow, index) {
  const slides = slideshow.querySelectorAll('.service-slide');
  const card = slideshow.closest('.service-card');
  const dots = card.querySelectorAll('.service-slide-dot');
  
  // Remove active class from all slides and dots
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Add active class to the desired slide and dot
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}
});