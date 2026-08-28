/* ============================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   Interactivity, Animations & Micro-Interactions
   ============================================ */

/**
 * MOBILE MENU TOGGLE
 * Handles hamburger menu open/close on mobile devices
 */
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

/**
 * SMOOTH SCROLL NAVIGATION
 * Intercepts navigation links and smoothly scrolls to sections
 */
document.querySelectorAll('a[data-scroll]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculate offset for sticky navbar
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            // Smooth scroll with animation
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * SCROLL REVEAL ANIMATIONS
 * Uses Intersection Observer API to trigger animations when elements enter viewport
 * This demonstrates modern, performant scroll-triggered animations
 */
function initScrollReveal() {
    // Create an Intersection Observer
    const observerOptions = {
        threshold: 0.1,      // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px'  // Start animation 50px before element comes into view
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            // When element enters viewport, add 'active' class to trigger animation
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing after animation triggers
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all project cards, skill items, achievement items, and info items
    const elementsToObserve = document.querySelectorAll(
        '.project-card, .skill-item, .achievement-item, .info-item, .about-card, .journey-graphic, .identity-card, .hobbies-card'
    );

    elementsToObserve.forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
}

// Initialize scroll reveal animations when page loads
initScrollReveal();

/**
 * PROJECT MODAL / LIGHTBOX
 * Shows detailed project information in a modal when project card is clicked
 */
function initProjectModal() {
    const projectButtons = document.querySelectorAll('.project-btn');
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');

    // Project details data
    const projectDetails = {
        portfolio: {
            title: 'Technical & Creative Portfolio 2026',
            description: 'My college submission portfolio showcasing my journey from 2017 to 2026, converting my achievements into a digital portfolio.',
            problem: 'Create a structured portfolio for B.Tech 1st Year submission that effectively communicates my unique journey and achievements.',
            features: [
                'Interactive Timeline: Visual journey from 2017 to 2026',
                'Achievements Showcase: TV Award and Published Work',
                'Skills Section: Programming, Web Development, Creative Skills',
                'Responsive Design: Mobile, Tablet, and Desktop views',
                'Smooth Animations: Scroll reveals and hover effects'
            ],
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Intersection Observer API'],
            links: '#'
        }
    };

    // Open modal on project button click
    projectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-modal');
            const details = projectDetails[projectId];

            if (details) {
                displayProjectModal(details);
                modal.classList.add('show');
                // Prevent body scroll when modal is open
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal on close button click
    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    function displayProjectModal(details) {
        const modalBody = modal.querySelector('.modal-body');
        
        // Build HTML for modal content
        const html = `
            <div class="modal-project">
                <h2>${details.title}</h2>
                <p class="modal-description">${details.description}</p>
                
                <div class="modal-section">
                    <h3>Problem Statement</h3>
                    <p>${details.problem}</p>
                </div>
                
                <div class="modal-section">
                    <h3>Technologies Used</h3>
                    <div class="modal-tech">
                        ${details.tech.map(tech => `<span class="modal-tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        
        modalBody.innerHTML = html;
    }

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Initialize project modal
initProjectModal();

/**
 * CONTACT FORM HANDLING
 * Validates form input, provides feedback, and shows success message
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    form.addEventListener('submit', function(e) {
        // Prevent default form submission
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate inputs
        if (!validateForm(name, email, message)) {
            return;
        }

        // Show success feedback
        showSuccessMessage();

        // Reset form
        form.reset();

        // Optional: In a real application, you would send this data to a server
        // console.log('Form Data:', { name, email, message });
    });

    function validateForm(name, email, message) {
        // Email regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validation checks
        if (name.length < 2) {
            showToastMessage('Please enter a valid name', 'error');
            return false;
        }

        if (!emailPattern.test(email)) {
            showToastMessage('Please enter a valid email address', 'error');
            return false;
        }

        if (message.length < 10) {
            showToastMessage('Message must be at least 10 characters long', 'error');
            return false;
        }

        return true;
    }

    function showSuccessMessage() {
        showToastMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
    }

    function showToastMessage(message, type) {
        const toastMessage = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('.toast-icon');
        
        toastMessage.textContent = message;
        
        // Update toast styling based on type
        if (type === 'error') {
            toastIcon.textContent = '⚠';
            toast.style.backgroundColor = 'var(--accent-secondary)';
        } else {
            toastIcon.textContent = '✓';
            toast.style.backgroundColor = 'var(--accent-primary)';
        }

        // Show toast
        toast.classList.add('show');

        // Auto-dismiss after 3.5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }
}

// Initialize contact form
initContactForm();

/**
 * FORM INPUT FOCUS ANIMATION
 * Animates the underline on form input focus
 */
function initFormAnimations() {
    const formInputs = document.querySelectorAll('.form-input');

    formInputs.forEach(input => {
        // Add focus class for styling
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Add filled class if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// Initialize form animations
initFormAnimations();

/**
 * THROTTLE FUNCTION
 * Limits how often a function can be called (useful for scroll and resize events)
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * ACTIVE NAVIGATION LINK
 * Highlights the current section in the navigation
 */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[data-section]');
    const navLinks = document.querySelectorAll('.nav-link[data-scroll]');

    // Use throttled scroll event for better performance
    window.addEventListener('scroll', throttle(function() {
        let current = '';

        // Find which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const navHeight = document.querySelector('.navbar').offsetHeight;

            if (scrollY >= sectionTop - navHeight - 100) {
                current = section.getAttribute('data-section');
            }
        });

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + current) {
                link.classList.add('active');
            }
        });
    }, 100));
}

// Initialize active nav link highlighting
initActiveNavLink();

/**
 * CURSOR HOVER EFFECTS (Optional Enhancement)
 * Adds a subtle glow effect when hovering over interactive elements
 */
function initCursorEffects() {
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
}

// Initialize cursor effects
initCursorEffects();

/**
 * STAGGER ANIMATION FOR SKILLS
 * Creates a cascading effect when skills are revealed on scroll
 */
function initSkillStaggerAnimation() {
    const skillCategories = document.querySelectorAll('.skill-category');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay to each skill category
                entry.target.style.animationDelay = (index * 0.1) + 's';
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    skillCategories.forEach(category => {
        category.classList.add('scroll-reveal');
        observer.observe(category);
    });
}

// Initialize skill stagger animation
initSkillStaggerAnimation();



/**
 * HERO ROBOT COPILOT - TYPING EFFECT & EXIT ANIMATION
 * Shows a robot that types a welcome message and then exits the screen
 */
function initHeroRobotCopilot() {
    const heroRobot = document.getElementById('heroRobotCopilot');
    const typingText = document.getElementById('robotTypingText');
    const heroHaze = document.getElementById('heroHazeOverlay');
    
    if (!heroRobot || !typingText) return;

    const welcomeMessage = "Welcome to Samadrita's Portfolio!";
    let charIndex = 0;
    let typingInterval;

    // Start typing after robot enters (animation delay is 2s)
    setTimeout(() => {
        startTyping();
    }, 3000);

    function startTyping() {
        typingInterval = setInterval(() => {
            if (charIndex < welcomeMessage.length) {
                typingText.textContent += welcomeMessage.charAt(charIndex);
                charIndex++;
            } else {
                // Finished typing - clear interval and trigger exit
                clearInterval(typingInterval);
                setTimeout(() => {
                    heroRobot.classList.add('exiting');
                    if (heroHaze) {
                        heroHaze.classList.add('haze-hidden');
                        heroHaze.addEventListener('transitionend', function() {
                            heroHaze.style.display = 'none';
                        }, { once: true });
                    }
                }, 1000);
            }
        }, 80); // Typing speed: 80ms per character
    }
}

// Initialize hero robot copilot
initHeroRobotCopilot();

/**
 * RIPPLE EFFECT ON BUTTON CLICK (Nice to have micro-interaction)
 * Creates a ripple effect when buttons are clicked
 */
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .project-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            // Remove previous ripple if exists
            const previousRipple = this.querySelector('.ripple');
            if (previousRipple) {
                previousRipple.remove();
            }

            this.appendChild(ripple);
        });
    });
}

// Initialize ripple effect
initRippleEffect();

/**
 * ADD RIPPLE STYLES DYNAMICALLY
 * Since ripple effect is created dynamically, we need to add its CSS
 */
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .btn-primary .ripple {
            background: rgba(0, 0, 0, 0.3);
        }

        .btn-secondary .ripple {
            background: rgba(0, 212, 255, 0.3);
        }
    `;
    document.head.appendChild(style);
}

addRippleStyles();

/**
 * LOADING ANIMATION / PAGE LOAD
 * Stagger animations for hero elements when page loads
 */
function initPageLoadAnimation() {
    // Elements will animate on page load due to CSS animation delays
    // This function ensures smooth rendering and optimal performance
    
    // Trigger reflow to ensure animations start
    document.querySelectorAll('.hero-word').forEach(element => {
        element.offsetHeight;
    });
    // Add letter-by-letter animation effect to hero words
    addLetterAnimation();
    
    // Initialize AI particle system
    initAIParticles();
}

/**
 * PROFILE IMAGE FALLBACK
 * Shows a clean placeholder when the personal image is not available yet.
 */
function initProfileImageFallback() {
    const image = document.querySelector('[data-profile-image]');
    const frame = document.querySelector('.portrait-frame');
    if (!image || !frame) return;

    const showImage = () => frame.classList.add('has-image');
    const showPlaceholder = () => {
        frame.classList.remove('has-image');
        image.style.display = 'none';
    };

    image.addEventListener('load', showImage, { once: true });
    image.addEventListener('error', showPlaceholder, { once: true });
    if (image.complete) {
        image.naturalWidth > 0 ? showImage() : showPlaceholder();
    }
}

initProfileImageFallback();

/**
 * LETTER ANIMATION
 * Animates individual letters within hero words for enhanced visual effect
 */
function addLetterAnimation() {
    const heroWords = document.querySelectorAll('.hero-word');
    
    heroWords.forEach((word, wordIndex) => {
        const text = word.textContent;
        word.innerHTML = '';
        
        // Create span for each letter
        text.split('').forEach((letter, letterIndex) => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter;
            letterSpan.style.display = 'inline-block';
            letterSpan.style.animation = `letterBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards`;
            // Stagger each letter within the word
            letterSpan.style.animationDelay = `${0.1 * wordIndex + 0.05 * letterIndex}s`;
            word.appendChild(letterSpan);
        });
    });

    // Add letter bounce animation to stylesheet
    addLetterBounceStyles();
}

/**
 * ADD LETTER BOUNCE ANIMATION STYLES
 * Dynamically adds CSS for letter-by-letter animation
 */
function addLetterBounceStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes letterBounce {
            0% {
                opacity: 0;
                transform: translateY(20px) scale(0.5);
            }
            50% {
                transform: translateY(-5px) scale(1.1);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .hero-word:hover span {
            animation: letterPulse 0.4s ease-out !important;
        }

        @keyframes letterPulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
                text-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
            }
            100% {
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * AI PARTICLE SYSTEM
 * Creates interactive floating particles that respond to mouse movement
 */
function initAIParticles() {
    const particleContainer = document.getElementById('aiParticles');
    if (!particleContainer) return;

    const particleCount = 50;
    const particles = [];
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particleContainer.appendChild(particle);

        particles.push({
            element: particle,
            x: Math.random() * hero.offsetWidth,
            y: Math.random() * hero.offsetHeight,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            life: Math.random() * 100 + 50
        });

        particle.style.width = particles[i].size + 'px';
        particle.style.height = particles[i].size + 'px';
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // Track mouse movement
    document.addEventListener('mousemove', throttle(function(e) {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const heroRect = hero.getBoundingClientRect();
        mouseX = e.clientX - heroRect.left;
        mouseY = e.clientY - heroRect.top;
    }, 50));

    // Animation loop
    function animateParticles() {
        particles.forEach((particle, index) => {
            // Move particle
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            const width = hero.offsetWidth;
            const height = hero.offsetHeight;

            if (particle.x < 0 || particle.x > width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > height) particle.vy *= -1;

            particle.x = Math.max(0, Math.min(width, particle.x));
            particle.y = Math.max(0, Math.min(height, particle.y));

            // Attraction to mouse
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
                const force = (1 - distance / 200) * 0.5;
                particle.vx += (dx / distance) * force * 0.1;
                particle.vy += (dy / distance) * force * 0.1;
            }

            // Apply friction
            particle.vx *= 0.98;
            particle.vy *= 0.98;

            // Limit speed
            const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (speed > 3) {
                particle.vx = (particle.vx / speed) * 3;
                particle.vy = (particle.vy / speed) * 3;
            }

            // Update opacity based on life
            particle.life--;
            particle.element.style.opacity = Math.max(0.3, Math.min(1, particle.life / 20));

            // Reset particle if dead
            if (particle.life <= 0) {
                particle.x = Math.random() * width;
                particle.y = Math.random() * height;
                particle.life = Math.random() * 100 + 50;
            }

            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Handle window resize
    window.addEventListener('resize', function() {
        particles.forEach(particle => {
            particle.x = Math.random() * hero.offsetWidth;
            particle.y = Math.random() * hero.offsetHeight;
        });
    });
}

/**
 * ACHIEVEMENT CARTOON AI COPILOT AGENT
 * Interactive pointer-tracking, eye movement, and dialog reactions.
 */
function initAchievementAgent() {
    const section = document.querySelector('.achievements');
    const agent = section?.querySelector('.ai-watch-agent');
    if (!section || !agent || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const pupils = agent.querySelectorAll('.eye-pupil');
    const dialogSpan = agent.querySelector('.agent-dialog span');
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrame;

    const phrases = [
        'AI Copilot ⚡',
        'Achievements 🏆',
        'Verified Work ✨',
        'Creative CSE 🎨',
        'TV Award 2017 📺',
        'Published 2026 📖',
        'AWS & AI Certs 🚀'
    ];
    let phraseIndex = 0;

    function updateAgent() {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        agent.style.setProperty('--agent-x', `${currentX.toFixed(2)}px`);
        agent.style.setProperty('--agent-y', `${currentY.toFixed(2)}px`);
        
        pupils.forEach(pupil => {
            pupil.style.transform = `translate(${(currentX / 10).toFixed(2)}px, ${(currentY / 10).toFixed(2)}px)`;
        });
        
        animationFrame = requestAnimationFrame(updateAgent);
    }

    section.addEventListener('pointermove', event => {
        const bounds = section.getBoundingClientRect();
        const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
        const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
        targetX = horizontal * 26;
        targetY = vertical * 16;
        agent.style.setProperty('--agent-tilt', `${(horizontal * 10).toFixed(2)}deg`);
    });

    section.addEventListener('pointerleave', () => {
        targetX = 0;
        targetY = 0;
        agent.style.setProperty('--agent-tilt', '0deg');
    });

    // Cycle friendly messages on click
    agent.addEventListener('click', () => {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        if (dialogSpan) {
            dialogSpan.textContent = phrases[phraseIndex];
            dialogSpan.style.animation = 'none';
            dialogSpan.offsetHeight; // Trigger reflow
            dialogSpan.style.animation = 'letterBounce 0.4s ease-out';
        }
    });

    animationFrame = requestAnimationFrame(updateAgent);
    window.addEventListener('beforeunload', () => cancelAnimationFrame(animationFrame), { once: true });
}

initAchievementAgent();


// Initialize page load animation
window.addEventListener('load', initPageLoadAnimation);

/**
 * ACCESSIBILITY: KEYBOARD NAVIGATION
 * Ensures all interactive elements are keyboard accessible
 */
function initKeyboardNavigation() {
    // All interactive elements should be reachable via Tab key
    // This is handled by HTML semantics (buttons, links, form inputs)
    
    // Add keyboard support for project cards (Enter to open)
    const projectButtons = document.querySelectorAll('.project-btn');
    projectButtons.forEach(button => {
        button.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.click();
            }
        });
    });
}

// Initialize keyboard navigation
initKeyboardNavigation();

/**
 * PERFORMANCE OPTIMIZATION: Image Lazy Loading
 * (Optional) For when images are added to the portfolio
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-lazy]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.lazy;
                    img.removeAttribute('data-lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading (will work when images are added)
initLazyLoading();

/**
 * CONSOLE MESSAGE
 * Easter egg for developers viewing the portfolio
 */
console.log('%c✨ Welcome to Samadrita\'s Portfolio! ✨', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with Vanilla HTML, CSS, and JavaScript', 'color: #8338ec; font-size: 12px;');
console.log('%cAll code is clean, commented, and educational. Feel free to explore! 🚀', 'color: #00d4ff; font-size: 12px;');

// ============================================
// ADDITIONAL MICRO-INTERACTIONS
// ============================================

/**
 * SKILL ITEM ANIMATION
 * Extra polish: animates skill icons on hover
 */
function enhanceSkillItems() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const icon = item.querySelector('.skill-icon');
        
        item.addEventListener('mouseenter', function() {
            // Add pulse animation to icon
            icon.style.animation = 'pulse 0.6s ease-out';
        });
        
        item.addEventListener('animationend', function() {
            icon.style.animation = '';
        });
    });
}

// Add pulse animation styles
function addPulseAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

addPulseAnimation();
enhanceSkillItems();

/**
 * TOAST MODAL STYLING HELPER
 * Additional CSS for modal elements
 */
function addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .modal-project h2 {
            color: var(--accent-primary);
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }

        .modal-description {
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }

        .modal-section {
            margin-bottom: 1.5rem;
        }

        .modal-section h3 {
            color: var(--accent-secondary);
            margin-bottom: 0.8rem;
            font-size: 1.1rem;
        }

        .modal-section p {
            color: var(--text-secondary);
            margin-bottom: 0.5rem;
            line-height: 1.6;
        }

        .modal-section ul {
            list-style: none;
            padding-left: 1rem;
        }

        .modal-section li {
            color: var(--text-secondary);
            margin-bottom: 0.5rem;
            position: relative;
            padding-left: 1rem;
        }

        .modal-section li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--accent-primary);
            font-weight: bold;
        }

        .modal-tech {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }

        .modal-tech-tag {
            background: var(--accent-primary);
            color: var(--bg-primary);
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
}

addModalStyles();

/**
 * 3D COSMIC ACHIEVEMENTS PARALLAX & MOVEMENT CONTROLLER
 * Adds dynamic 3D depth, parallax shifts, and tilt reaction to celestial paintings.
 */
function initCosmicParallax() {
    const achievementsSec = document.querySelector('.achievements');
    const celestialObjects = achievementsSec?.querySelectorAll('.celestial-canvas');
    if (!achievementsSec || !celestialObjects.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let currX = 0;
    let currY = 0;
    let isHovering = false;

    achievementsSec.addEventListener('mousemove', (e) => {
        const rect = achievementsSec.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        isHovering = true;
    });

    achievementsSec.addEventListener('mouseleave', () => {
        mouseX = 0;
        mouseY = 0;
        isHovering = false;
    });

    function animateCosmos() {
        currX += (mouseX - currX) * 0.06;
        currY += (mouseY - currY) * 0.06;

        celestialObjects.forEach(obj => {
            const depth = parseFloat(obj.dataset.depth || '0.2');
            const moveX = (currX * 45 * depth).toFixed(2);
            const moveY = (currY * 45 * depth).toFixed(2);
            const rotateZ = (currX * 8 * depth).toFixed(2);
            obj.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${rotateZ}deg)`;
        });

        requestAnimationFrame(animateCosmos);
    }

    animateCosmos();
}

initCosmicParallax();

/**
 * FUTURISTIC AI WORKSPACE INTERACTION - SKILLS SECTION
 * Handles mouse proximity reaction, magnetic displacement/repulsion,
 * dynamic neon glow boost, and 3D parallax depth for background code and command boxes.
 */
function initSkillsWorkspaceInteraction() {
    const skillsSec = document.getElementById('skills');
    if (!skillsSec) return;

    const floatingItems = skillsSec.querySelectorAll('.workspace-code, .workspace-command');
    if (!floatingItems.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Item state objects for smooth lerp physics
    const itemStates = Array.from(floatingItems).map(el => {
        const depth = parseFloat(el.dataset.depth || '0.25');
        const computedStyle = window.getComputedStyle(el);
        const baseOpacity = parseFloat(computedStyle.getPropertyValue('--base-opacity') || '0.38');
        return {
            el,
            depth,
            baseOpacity,
            // current values
            currRepelX: 0,
            currRepelY: 0,
            currParallaxX: 0,
            currParallaxY: 0,
            currTilt: 0,
            currGlow: 0.22,
            currOpacity: baseOpacity,
            // target values
            targetRepelX: 0,
            targetRepelY: 0,
            targetParallaxX: 0,
            targetParallaxY: 0,
            targetTilt: 0,
            targetGlow: 0.22,
            targetOpacity: baseOpacity
        };
    });

    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;
    let bounds = skillsSec.getBoundingClientRect();

    function updateBounds() {
        bounds = skillsSec.getBoundingClientRect();
    }

    window.addEventListener('resize', throttle(updateBounds, 200));
    window.addEventListener('scroll', throttle(updateBounds, 200));

    skillsSec.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch') return;
        updateBounds();
        mouseX = e.clientX - bounds.left;
        mouseY = e.clientY - bounds.top;
        isHovering = true;

        const normX = (mouseX / bounds.width - 0.5) * 2;
        const normY = (mouseY / bounds.height - 0.5) * 2;
        const radius = 220;

        itemStates.forEach(item => {
            const rect = item.el.getBoundingClientRect();
            const elCenterX = rect.left - bounds.left + rect.width / 2;
            const elCenterY = rect.top - bounds.top + rect.height / 2;

            const dx = mouseX - elCenterX;
            const dy = mouseY - elCenterY;
            const dist = Math.hypot(dx, dy);

            // Parallax offset
            item.targetParallaxX = normX * 36 * item.depth;
            item.targetParallaxY = normY * 28 * item.depth;

            // Proximity interaction
            if (dist < radius) {
                const factor = Math.pow(1 - dist / radius, 1.4);
                // Subtle gentle push away
                const safeDist = dist || 1;
                item.targetRepelX = -(dx / safeDist) * factor * 28;
                item.targetRepelY = -(dy / safeDist) * factor * 24;
                item.targetTilt = (dx / radius) * factor * 6;
                item.targetGlow = 0.3 + factor * 0.58;
                item.targetOpacity = Math.min(0.85, item.baseOpacity + factor * 0.4);
            } else {
                item.targetRepelX = 0;
                item.targetRepelY = 0;
                item.targetTilt = 0;
                item.targetGlow = 0.22;
                item.targetOpacity = item.baseOpacity;
            }
        });
    });

    skillsSec.addEventListener('pointerleave', () => {
        isHovering = false;
        itemStates.forEach(item => {
            item.targetRepelX = 0;
            item.targetRepelY = 0;
            item.targetParallaxX = 0;
            item.targetParallaxY = 0;
            item.targetTilt = 0;
            item.targetGlow = 0.22;
            item.targetOpacity = item.baseOpacity;
        });
    });

    function animateWorkspace() {
        itemStates.forEach(item => {
            // Lerp interpolation
            item.currRepelX += (item.targetRepelX - item.currRepelX) * 0.08;
            item.currRepelY += (item.targetRepelY - item.currRepelY) * 0.08;
            item.currParallaxX += (item.targetParallaxX - item.currParallaxX) * 0.08;
            item.currParallaxY += (item.targetParallaxY - item.currParallaxY) * 0.08;
            item.currTilt += (item.targetTilt - item.currTilt) * 0.08;
            item.currGlow += (item.targetGlow - item.currGlow) * 0.08;
            item.currOpacity += (item.targetOpacity - item.currOpacity) * 0.08;

            item.el.style.setProperty('--repel-x', `${item.currRepelX.toFixed(2)}px`);
            item.el.style.setProperty('--repel-y', `${item.currRepelY.toFixed(2)}px`);
            item.el.style.setProperty('--parallax-x', `${item.currParallaxX.toFixed(2)}px`);
            item.el.style.setProperty('--parallax-y', `${item.currParallaxY.toFixed(2)}px`);
            item.el.style.setProperty('--tilt', `${item.currTilt.toFixed(2)}deg`);
            item.el.style.setProperty('--glow-opacity', `${item.currGlow.toFixed(2)}`);
            item.el.style.setProperty('--item-opacity', `${item.currOpacity.toFixed(2)}`);
        });

        requestAnimationFrame(animateWorkspace);
    }

    animateWorkspace();
}

initSkillsWorkspaceInteraction();


/**
 * AI GIRL ROBOT CODER INTERACTIVE CONTROLLER
 * Controls pointer hover state, speech bubble ("Hi!"), 3D head/eye tracking,
 * and seamless typing return on pointer leave without audio sound.
 */
function initAIGirlRobotCoder() {
    const container = document.getElementById('aiGirlRobotContainer');
    const speechBubble = document.getElementById('robotSpeechBubble');
    const robotHead = document.getElementById('robotHead');
    const robotMouth = document.getElementById('robotMouth');
    if (!container || !speechBubble || !robotHead) return;

    let isHovered = false;

    container.addEventListener('pointerenter', () => {
        isHovered = true;
        speechBubble.classList.add('show');
    });

    container.addEventListener('pointermove', (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        if (isHovered) {
            const rotX = -mouseY * 12;
            const rotY = mouseX * 18;
            robotHead.style.transform = `translateY(-4px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        }
    });

    container.addEventListener('pointerleave', () => {
        isHovered = false;
        speechBubble.classList.remove('show');
        robotHead.style.transform = '';
    });
}

// Initialize AI Girl Robot Coder Controller
initAIGirlRobotCoder();

// ── Contact icon cards — click to reveal detail ──
(function initContactCards() {
    const cards = document.querySelectorAll('.contact-card');
    if (!cards.length) return;

    cards.forEach(card => {
        const btn = card.querySelector('.card-icon-btn');
        const detail = card.querySelector('.card-detail');
        if (!btn) return;

        btn.addEventListener('click', () => {
            const isOpen = card.classList.contains('active');

            // Close all cards first
            cards.forEach(c => {
                c.classList.remove('active');
                const b = c.querySelector('.card-icon-btn');
                const d = c.querySelector('.card-detail');
                if (b) b.setAttribute('aria-expanded', 'false');
                if (d) d.setAttribute('aria-hidden', 'true');
            });

            // If it wasn't open, open this one
            if (!isOpen) {
                card.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
                if (detail) detail.setAttribute('aria-hidden', 'false');
            }
        });
    });
})();
