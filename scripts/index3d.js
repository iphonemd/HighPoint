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

// 3D Tilt Effect for Service Cards and Titles
document.querySelectorAll('.service-card').forEach(card => {
    const title = card.querySelector('.tilt-effect');
    const cardContent = card.querySelector('.service-content');
    
    // Define max tilt rotation (in degrees)
    const maxCardTiltX = 8;
    const maxCardTiltY = 8;
    const maxTitleTiltX = 15;
    const maxTitleTiltY = 15;
    
    // Define max text shadow distance
    const maxShadowDistance = 5;
    
    // Define max 'pop out' distance (in pixels)
    const maxTitlePopOut = 40;
    
    // Store the initial positions
    let initialX = 0;
    let initialY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Ease factor (smaller = smoother/slower transitions)
    const easeFactor = 0.1;
    
    // Animation frame reference
    let animationFrameId = null;
    
    // Handle mouse move on the service card
    card.addEventListener('mousemove', (e) => {
        // Get the dimensions of the card
        const cardRect = card.getBoundingClientRect();
        
        // Get the mouse position relative to the card
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        
        // Calculate the percentage of the mouse position within the card
        const percentX = x / cardRect.width;
        const percentY = y / cardRect.height;
        
        // Update target positions
        initialX = percentX;
        initialY = percentY;
        
        // Start animation if not already running
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(animateCard);
        }
    });
    
    // Smooth animation function
    const animateCard = () => {
        // Calculate the smooth position with easing
        currentX += (initialX - currentX) * easeFactor;
        currentY += (initialY - currentY) * easeFactor;
        
        // Calculate card tilt based on smoothed position
        // Subtracting 0.5 to get a range from -0.5 to 0.5
        const cardTiltX = (currentY - 0.5) * maxCardTiltX * 2;
        const cardTiltY = (0.5 - currentX) * maxCardTiltY * 2;
        
        // Calculate title tilt (more pronounced than card)
        const titleTiltX = (currentY - 0.5) * maxTitleTiltX * 2;
        const titleTiltY = (0.5 - currentX) * maxTitleTiltY * 2;
        
        // Calculate shadow distance based on tilt
        const shadowX = (cardTiltY / maxCardTiltY) * maxShadowDistance;
        const shadowY = (cardTiltX / maxCardTiltX) * maxShadowDistance;
        
        // Calculate z translation to create a pop-out effect for title
        // The text pops out more when mouse is closer to the center
        const centerDistanceX = Math.abs(currentX - 0.5) * 2; // Distance from center (0 to 1)
        const centerDistanceY = Math.abs(currentY - 0.5) * 2; // Distance from center (0 to 1)
        const centerDistance = Math.sqrt(centerDistanceX**2 + centerDistanceY**2); // Combined distance (0 to √2)
        const titlePopOut = maxTitlePopOut * (1 - centerDistance / Math.sqrt(2)); // More pop-out closer to center
        
        // Calculate movement effect - slight shift based on mouse position
        const moveX = (currentX - 0.5) * 15; // -7.5px to 7.5px
        const moveY = (currentY - 0.5) * 15; // -7.5px to 7.5px
        
        // Calculate glare effect
        const glareOpacity = 0.1 + (1 - centerDistance) * 0.1; // 0.1 to 0.2
        const glareX = currentX * 100; // 0% to 100%
        const glareY = currentY * 100; // 0% to 100%
        
        // Apply the 3D transformations to card
        card.style.transform = `
            perspective(1000px)
            rotateX(${cardTiltX}deg) 
            rotateY(${cardTiltY}deg)
            translateZ(10px)
            translateX(${moveX}px)
            translateY(${moveY}px)
        `;
        
        // Apply card shadow for enhanced 3D effect
        card.style.boxShadow = `
            ${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.2),
            0 10px 20px rgba(0, 0, 0, 0.1)
        `;
        
        // Apply the 3D transformations to title
        title.style.transform = `
            perspective(1000px)
            rotateX(${titleTiltX}deg)
            rotateY(${titleTiltY}deg)
            translateZ(${titlePopOut}px)
        `;
        
        // Apply text shadow for enhanced 3D effect
        title.style.textShadow = `
            ${shadowX}px ${shadowY}px 2px rgba(0, 0, 0, 0.3)
        `;
        
        // Add light reflection/glare effect
        cardContent.style.background = `
            linear-gradient(
                ${glareX}deg, 
                rgba(255, 255, 255, 0) 0%, 
                rgba(255, 255, 255, ${glareOpacity}) 80%
            )
        `;
        
        // Continue animation if still moving
        const isStillMoving = Math.abs(initialX - currentX) > 0.001 || Math.abs(initialY - currentY) > 0.001;
        
        if (isStillMoving) {
            animationFrameId = requestAnimationFrame(animateCard);
        } else {
            animationFrameId = null;
        }
    };
    
    // Reset styles when mouse leaves the card
    card.addEventListener('mouseleave', () => {
        // Set target to center (0.5, 0.5)
        initialX = 0.5;
        initialY = 0.5;
        
        // Start animation to return to center if not already running
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(animateCard);
        }
        
        // Set a timeout to completely reset styles after animation completes
        setTimeout(() => {
            if (!card.matches(':hover')) {
                card.style.transform = 'none';
                card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                title.style.transform = 'none';
                title.style.textShadow = 'none';
                cardContent.style.background = 'none';
            }
        }, 1000);
    });
});

// Add initial animation to service cards when they come into view
const observeCards = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing the card once it's been animated
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
};

// Run the observer when the page is loaded
window.addEventListener('load', observeCards);