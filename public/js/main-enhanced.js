// Translations
const translations = {
    en: {
        'home': 'Home',
        'about': 'About',
        'experience': 'Experience',
        'skills': 'Skills',
        'projects': 'Projects',
        'education': 'Education',
        'contact': 'Contact',
        'hero-title': 'Hi, I\'m <span>Simone Diaco</span>',
        'hero-subtitle': 'Software Developer specializing in healthcare data solutions and full-stack development with a passion for creating innovative digital tools.',
        'hire-me': 'Hire Me',
        'discover': 'Discover',
        'about-me': 'About Me',
        'software-developer': 'Software Developer',
        'about-description': 'I\'m a passionate software developer with over 6 years of experience, specializing in healthcare data solutions and full-stack development. I have extensive experience with ETL processes, standardized data models (OMOP CDM), and building innovative digital tools for healthcare professionals and patients.',
        'about-description-2': 'My expertise spans across various programming languages and frameworks, allowing me to adapt to different project requirements and deliver efficient, scalable solutions. I\'m particularly interested in creating software that makes a positive impact on healthcare systems and patient outcomes.',
        'name': 'Name',
        'email': 'Email',
        'phone': 'Phone',
        'location': 'Location',
        'my-journey': 'My Journey',
        'my-abilities': 'My Abilities',
        'programming-languages': 'Programming Languages',
        'databases': 'Databases',
        'frameworks-technologies': 'Frameworks & Technologies',
        'domain-knowledge': 'Domain Knowledge',
        'design-tools': 'Design Tools',
        'operating-systems': 'Operating Systems',
        'my-work': 'My Work',
        'academic-path': 'Academic Path',
        'get-in-touch': 'Get In Touch',
        'contact-me': 'Contact Me',
        'lets-talk': 'Let\'s Talk',
        'contact-text': 'Feel free to reach out if you\'re looking for a developer, have a question, or just want to connect. I\'m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.',
        'email-me': 'Email Me',
        'call-me': 'Call Me',
        'follow-me': 'Follow Me',
        'send-message': 'Send Message',
        'your-name': 'Your Name',
        'your-email': 'Your Email',
        'subject': 'Subject',
        'message': 'Message',
        'footer-about': 'Software Developer specializing in healthcare data solutions and full-stack development. With a strong background in ETL processes, standardized data models, and building innovative digital tools.',
        'quick-links': 'Quick Links',
        'contact-info': 'Contact Info',
        'scroll-down': 'Scroll Down'
    },
    it: {
        'home': 'Home',
        'about': 'Chi Sono',
        'experience': 'Esperienza',
        'skills': 'Competenze',
        'projects': 'Progetti',
        'education': 'Formazione',
        'contact': 'Contatti',
        'hero-title': 'Ciao, sono <span>Simone Diaco</span>',
        'hero-subtitle': 'Sviluppatore Software specializzato in soluzioni dati per la sanità e sviluppo full-stack con la passione per la creazione di strumenti digitali innovativi.',
        'hire-me': 'Contattami',
        'discover': 'Scopri',
        'about-me': 'Chi Sono',
        'software-developer': 'Sviluppatore Software',
        'about-description': 'Sono uno sviluppatore software appassionato con oltre 6 anni di esperienza, specializzato in soluzioni di dati sanitari e sviluppo full-stack. Ho una vasta esperienza con processi ETL, modelli di dati standardizzati (OMOP CDM) e nella creazione di strumenti digitali innovativi per professionisti sanitari e pazienti.',
        'about-description-2': 'La mia competenza si estende a vari linguaggi di programmazione e framework, permettendomi di adattarmi a diverse esigenze di progetto e fornire soluzioni efficienti e scalabili. Sono particolarmente interessato a creare software che abbia un impatto positivo sui sistemi sanitari e sui risultati dei pazienti.',
        'name': 'Nome',
        'email': 'Email',
        'phone': 'Telefono',
        'location': 'Località',
        'my-journey': 'Il Mio Percorso',
        'my-abilities': 'Le Mie Abilità',
        'programming-languages': 'Linguaggi di Programmazione',
        'databases': 'Database',
        'frameworks-technologies': 'Framework e Tecnologie',
        'domain-knowledge': 'Conoscenze Specifiche',
        'design-tools': 'Strumenti di Design',
        'operating-systems': 'Sistemi Operativi',
        'my-work': 'I Miei Lavori',
        'academic-path': 'Percorso Accademico',
        'get-in-touch': 'Rimani in Contatto',
        'contact-me': 'Contattami',
        'lets-talk': 'Parliamo',
        'contact-text': 'Sentiti libero di contattarmi se stai cercando uno sviluppatore, hai una domanda o semplicemente vuoi connetterti. Sono sempre aperto a discutere nuovi progetti, idee creative o opportunità per far parte della tua visione.',
        'email-me': 'Email',
        'call-me': 'Telefono',
        'follow-me': 'Seguimi',
        'send-message': 'Invia Messaggio',
        'your-name': 'Il tuo Nome',
        'your-email': 'La tua Email',
        'subject': 'Oggetto',
        'message': 'Messaggio',
        'footer-about': 'Sviluppatore Software specializzato in soluzioni dati per la sanità e sviluppo full-stack. Con una solida esperienza in processi ETL, modelli di dati standardizzati e creazione di strumenti digitali innovativi.',
        'quick-links': 'Link Rapidi',
        'contact-info': 'Informazioni di Contatto',
        'scroll-down': 'Scorri Giù'
    }
};

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Custom cursor
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    if (window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        // Add hover effect to links and buttons
        const links = document.querySelectorAll('a, button, .skill-item, .project-card');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1.5)`;
                cursor.style.border = '2px solid var(--secondary-color)';
                cursorDot.style.backgroundColor = 'var(--secondary-color)';
            });
            
            link.addEventListener('mouseleave', () => {
                cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) scale(1)`;
                cursor.style.border = '2px solid var(--primary-light)';
                cursorDot.style.backgroundColor = 'var(--primary-light)';
            });
        });
    } else {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
    }
});

// Initialize 3D card tilt effect
function initializeTiltEffect() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xRotation = ((y - rect.height / 2) / rect.height) * 10;
            const yRotation = ((rect.width / 2 - x) / rect.width) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
            
            // Move content up slightly for 3D effect
            const cardContent = card.querySelector('.card-content');
            if (cardContent) {
                cardContent.style.transform = 'translateZ(20px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            
            // Reset content position
            const cardContent = card.querySelector('.card-content');
            if (cardContent) {
                cardContent.style.transform = 'translateZ(0)';
            }
        });
    });
}

// Mobile menu toggle
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Update active nav link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

// Header scroll effect
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavOnScroll();
    });
}

// Update active navigation link based on scroll position
function updateActiveNavOnScroll() {
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
}

// Experience tab functionality
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-pane');
    const tabIndicator = document.querySelector('.tab-indicator');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const activePane = document.getElementById(tabId);
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            activePane.classList.add('active');
            
            // Update tab indicator position
            updateTabIndicator();
        });
    });
}

function updateTabIndicator() {
    const activeTab = document.querySelector('.tab-btn.active');
    const tabIndicator = document.querySelector('.tab-indicator');
    
    if (activeTab && tabIndicator) {
        tabIndicator.style.width = `${activeTab.offsetWidth}px`;
        tabIndicator.style.left = `${activeTab.offsetLeft}px`;
    }
}

// Scroll reveal effect
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.section-title, .about-content, .skills-container, .project-card, .timeline-item, .contact-content');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Particles.js initialization
function initializeParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#8b5cf6'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#8b5cf6',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Language switcher
function initializeLanguageSwitcher() {
    const langButtons = document.querySelectorAll('[data-lang]');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            
            // Update active button
            langButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelectorAll(`[data-lang="${lang}"]`).forEach(btn => {
                btn.classList.add('active');
            });
            
            // Save language preference
            localStorage.setItem('preferredLanguage', lang);
        });
    });
    
    // Set initial language
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLang);
    
    // Set active button
    document.querySelectorAll(`[data-lang="${savedLang}"]`).forEach(btn => {
        btn.classList.add('active');
    });
}

// Set language
function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (key === 'hero-title') {
                element.innerHTML = translations[lang][key];
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Send data to server
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success message
                    formStatus.innerHTML = 'Your message has been sent successfully!';
                    formStatus.style.color = 'var(--secondary-color)';
                    formStatus.style.padding = '10px';
                    formStatus.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                    formStatus.style.borderRadius = '5px';
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    // Show error message
                    formStatus.innerHTML = 'There was an error sending your message. Please try again.';
                    formStatus.style.color = '#ef4444';
                    formStatus.style.padding = '10px';
                    formStatus.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                    formStatus.style.borderRadius = '5px';
                }
                
                // Reset button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // Clear status message after 5 seconds
                setTimeout(() => {
                    formStatus.innerHTML = '';
                    formStatus.style.padding = '0';
                    formStatus.style.backgroundColor = 'transparent';
                }, 5000);
            })
            .catch(error => {
                // Show error message
                formStatus.innerHTML = 'There was an error sending your message. Please try again.';
                formStatus.style.color = '#ef4444';
                formStatus.style.padding = '10px';
                formStatus.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                formStatus.style.borderRadius = '5px';
                
                // Reset button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                console.error('Error:', error);
            });
        });
    }
}

// Initialize all functions on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI interactions
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeScrollEffects();
    initializeTabs();
    updateTabIndicator();
    initializeScrollReveal();
    initializeParticles();
    initializeLanguageSwitcher();
    initializeContactForm();
    initializeTiltEffect();
    
    // Adjust tab indicator on window resize
    window.addEventListener('resize', updateTabIndicator);
});
