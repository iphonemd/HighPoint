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
  
  // Form Submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';
      
      // In a real implementation, you would send the form data to your server here
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        const formMessage = document.createElement('div');
        formMessage.className = 'form-message success';
        formMessage.innerHTML = '<p>Thank you! Your message has been sent successfully.</p>';
        
        contactForm.appendChild(formMessage);
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
        
        // Remove message after 5 seconds
        setTimeout(() => {
          formMessage.remove();
        }, 5000);
      }, 1500);
    });
  }
  
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
  
  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const submitBtn = this.querySelector('button');
      
      if (emailInput.value.trim() !== '') {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Subscribing...';
        
        // Simulate form submission
        setTimeout(() => {
          this.reset();
          
          // Show success message
          const successMessage = document.createElement('p');
          successMessage.className = 'success-message';
          successMessage.textContent = 'Thank you for subscribing!';
          successMessage.style.color = 'white';
          successMessage.style.marginTop = '10px';
          
          this.appendChild(successMessage);
          
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Subscribe';
          
          setTimeout(() => {
            successMessage.remove();
          }, 3000);
        }, 1000);
      }
    });
  }
});