// Wait for DOM to be fully loaded before executing any JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // -----------------------------
    // Mobile Menu Functionality
    // -----------------------------
    const mobileMenuBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
                
            // Add overlay when menu is open
            if (navLinks.classList.contains('active')) {
                // Create overlay if it doesn't exist
                if (!document.querySelector('.menu-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.className = 'menu-overlay';
                    overlay.style.position = 'fixed';
                    overlay.style.top = '0';
                    overlay.style.left = '0';
                    overlay.style.width = '100%';
                    overlay.style.height = '100%';
                    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                    overlay.style.zIndex = '999';
                    overlay.style.backdropFilter = 'blur(3px)';
                    overlay.style.opacity = '0';
                    overlay.style.transition = 'opacity 0.3s ease';
                    document.body.appendChild(overlay);
                    
                    // Fade in the overlay
                    setTimeout(() => {
                        overlay.style.opacity = '1';
                    }, 10);
                    
                    // Close menu when clicking overlay
                    overlay.addEventListener('click', function() {
                        navLinks.classList.remove('active');
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                        overlay.style.opacity = '0';
                        setTimeout(() => {
                            document.body.removeChild(overlay);
                        }, 300);
                    });
                }
            } else {
                // Remove overlay when closing menu
                const overlay = document.querySelector('.menu-overlay');
                if (overlay) {
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(overlay);
                    }, 300);
                }
            }
        });
    }

    // -----------------------------
    // Smooth Scrolling
    // -----------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Remove overlay if it exists
            const overlay = document.querySelector('.menu-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 300);
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // -----------------------------
    // Header Scroll Effect
    // -----------------------------
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // -----------------------------
    // Section Animations
    // -----------------------------
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // -----------------------------
    // Language Switcher
    // -----------------------------
    const langButtons = document.querySelectorAll('[data-lang]');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            
            // Update active button
            langButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Save preferred language to localStorage
            localStorage.setItem('preferredLanguage', lang);
        });
    });

    // Set initial language (from localStorage or default to English)
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLang);
    
    // Set active button for current language
    document.querySelectorAll(`[data-lang="${savedLang}"]`).forEach(btn => {
        btn.classList.add('active');
    });

    // -----------------------------
    // Contact Form Submission
    // -----------------------------
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Debug - Log the form data
            console.log('Submitting form with data:', formData);
            
            // Client-side validation
            let isValid = true;
            
            // Simple validation - check if fields are empty
            for (const field in formData) {
                if (!formData[field].trim()) {
                    showError(`Please enter your ${field}`);
                    isValid = false;
                    break;
                }
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (isValid && !emailRegex.test(formData.email.trim())) {
                showError('Please enter a valid email address');
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Show sending state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Create or get status message element
            let statusMessage = document.getElementById('formStatus');
            if (!statusMessage) {
                statusMessage = document.createElement('div');
                statusMessage.id = 'formStatus';
                statusMessage.style.marginTop = '20px';
                statusMessage.style.padding = '15px';
                statusMessage.style.borderRadius = '12px';
                statusMessage.style.textAlign = 'center';
                statusMessage.style.opacity = '0';
                statusMessage.style.transition = 'opacity 0.3s ease';
                contactForm.appendChild(statusMessage);
            }
            
            // Send data to server
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                console.log('Server response status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('Server response data:', data);
                
                if (data.success) {
                    // Show success message
                    statusMessage.style.backgroundColor = 'rgba(45, 255, 213, 0.1)';
                    statusMessage.style.color = 'var(--accent-2)';
                    statusMessage.textContent = data.message;
                    statusMessage.style.opacity = '1';
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    // Show error message
                    statusMessage.style.backgroundColor = 'rgba(255, 45, 117, 0.1)';
                    statusMessage.style.color = 'var(--accent-1)';
                    statusMessage.textContent = data.message;
                    statusMessage.style.opacity = '1';
                }
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                
                // Clear status message after 5 seconds
                setTimeout(() => {
                    statusMessage.style.opacity = '0';
                    setTimeout(() => {
                        statusMessage.textContent = '';
                        statusMessage.style.backgroundColor = 'transparent';
                        statusMessage.style.opacity = '1';
                    }, 300);
                }, 5000);
            })
            .catch(error => {
                console.error('Error:', error);
                statusMessage.style.backgroundColor = 'rgba(255, 45, 117, 0.1)';
                statusMessage.style.color = 'var(--accent-1)';
                statusMessage.textContent = 'There was an error sending your message. Please try again.';
                statusMessage.style.opacity = '1';
                
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            });
            
            function showError(message) {
                statusMessage.style.backgroundColor = 'rgba(255, 45, 117, 0.1)';
                statusMessage.style.color = 'var(--accent-1)';
                statusMessage.textContent = message;
                statusMessage.style.opacity = '1';
                
                setTimeout(() => {
                    statusMessage.style.opacity = '0';
                    setTimeout(() => {
                        statusMessage.textContent = '';
                        statusMessage.style.backgroundColor = 'transparent';
                        statusMessage.style.opacity = '1';
                    }, 300);
                }, 3000);
            }
        });
    }

    // -----------------------------
    // Hero Section Animations
    // -----------------------------
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText && heroImage) {
        heroText.classList.add('slide-in-left');
        heroImage.classList.add('slide-in-right');
    }
});

// -----------------------------
// Set Language Function
// -----------------------------
function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// -----------------------------
// Active Navigation on Scroll
// -----------------------------
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    // Check which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all navigation links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section's navigation link
            const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});