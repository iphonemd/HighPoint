 // Mobile Menu Toggle
 const mobileMenu = document.getElementById('mobile-menu');
 const navbar = document.getElementById('navbar');
 
 mobileMenu.addEventListener('click', () => {
     navbar.classList.toggle('active');
     mobileMenu.innerHTML = navbar.classList.contains('active') ? '✕' : '☰';
 });
 
 // Logo Animation
 const logo = document.querySelector('.logo');
 
 logo.addEventListener('click', () => {
     logo.classList.add('shoot');
     
     setTimeout(() => {
         logo.classList.remove('shoot');
     }, 500);
 });
 
 // Smooth Scrolling for Anchor Links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function(e) {
         e.preventDefault();
         
         const targetId = this.getAttribute('href');
         const targetElement = document.querySelector(targetId);
         
         if (targetElement) {
             window.scrollTo({
                 top: targetElement.offsetTop - 80,
                 behavior: 'smooth'
             });
             
             // Close mobile menu if open
             if (navbar.classList.contains('active')) {
                 navbar.classList.remove('active');
                 mobileMenu.innerHTML = '☰';
             }
         }
     });
 });
 
 // Form Submission
 const contactForm = document.getElementById('contactForm');
 
 contactForm.addEventListener('submit', (e) => {
     e.preventDefault();
     
     // Get form data
     const formData = {
         name: document.getElementById('name').value,
         email: document.getElementById('email').value,
         phone: document.getElementById('phone').value,
         service: document.getElementById('service').value,
         message: document.getElementById('message').value
     };
     
     // Here you would normally send the data to your server
     // For demo purposes, we'll just log it to console
     console.log('Form submitted:', formData);
     
     // Reset form
     contactForm.reset();
     
     // Show success message (you can replace this with a more elegant solution)
     alert('Thank you for your message. We will get back to you soon!');
 });