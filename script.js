// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCxEa5yW7gijztoEbWsas8IMFtHp9W-sws",
    authDomain: "portfolio-ec139.firebaseapp.com",
    projectId: "portfolio-ec139",
    storageBucket: "portfolio-ec139.firebasestorage.app",
    messagingSenderId: "965855418234",
    appId: "1:965855418234:web:2ecf6e2b53553e8c7668c3",
    measurementId: "G-7B78Q6TB3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const portfolioDropdown = document.querySelector('.portfolio-dropdown');

    // Dark Theme Toggle
    const darkThemeLink = Array.from(document.querySelectorAll('.dropdown-content a')).find(a => a.textContent.trim() === 'Dark Theme');
    if (darkThemeLink) {
        darkThemeLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.toggle('dark-theme');
            // Optionally, save preference
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
    // On load, set theme from localStorage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    if (portfolioDropdown) {
        portfolioDropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    }
    
    // Sticky Header
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '15px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterBtns.length > 0 && projectItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                projectItems.forEach(item => {
                    const categories = item.getAttribute('data-category').split(/\s+/);
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Testimonial Slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialTrack && testimonials.length > 0 && dots.length > 0) {
        let currentIndex = 0;
        
        // Function to update slider
        function updateSlider() {
            testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });
        
        // Event listeners for prev/next buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex === 0) ? testimonials.length - 1 : currentIndex - 1;
                updateSlider();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
                updateSlider();
            });
        }
        
        // Auto slide - only if we have more than one testimonial
        if (testimonials.length > 1) {
            setInterval(() => {
                currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
                updateSlider();
            }, 5000);
        }
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Disable submit button to prevent multiple submissions
            const submitBtn = contactForm.querySelector('button[type="submit"], input[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            console.log('Form submitted:', { name, email, subject, message });

            // Import Firestore functions at the top of your file:
            // import { getFirestore, doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";
            const db = getFirestore(app);

            try {
                // Create a unique document name using current date and time
                const now = new Date();
                const docName = now.toISOString().replace(/[:.]/g, '-');
                // Reference to "message" collection and new doc under it
                // Use collection() and addDoc() for easier permissions
                const messagesCol = collection(db, "message");

                await addDoc(messagesCol, {
                    name,
                    email,
                    subject,
                    message,
                    timestamp: now
                });

                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } catch (error) {
                console.error("Error adding document: ", error);
                alert('There was an error submitting your message. Please try again later.');
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }
    const newsletterForm = document.getElementById('newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = newsletterForm.querySelector('button[type="submit"], input[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;

            const email = newsletterForm.querySelector('input[type="email"]').value;

            const db = getFirestore(app);

            try {
                const now = new Date();
                const newsletterCol = collection(db, "newsletterid");

                await addDoc(newsletterCol, {
                    email,
                    timestamp: now
                });

                alert('Thank you for subscribing to the newsletter!');
                newsletterForm.reset();
            } catch (error) {
                console.error("Error adding newsletter email: ", error);
                alert('There was an error subscribing. Please try again later.');
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's the portfolios dropdown or if href is just "#"
            if (href !== '#portfolios' && href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navLinks && navLinks.classList.contains('active') && hamburger) {
                        hamburger.classList.remove('active');
                        navLinks.classList.remove('active');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.skill-item, .project-item, .testimonial-content, .about-image, .about-text');
    
    if (animateElements.length > 0) {
        const animateOnScroll = () => {
            animateElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Set initial styles for animation
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Run animation on load and scroll
        window.addEventListener('load', animateOnScroll);
        window.addEventListener('scroll', animateOnScroll);
    }
});


let lastScrollY = window.scrollY;
let preventPullToRefresh = false;
let touchStartY = 0;

window.addEventListener('touchstart', function(e) {
    lastScrollY = window.scrollY;
    touchStartY = e.touches ? e.touches[0].clientY : 0;
    preventPullToRefresh = (lastScrollY === 0);
}, { passive: false });

window.addEventListener('touchmove', function(e) {
    const currentY = e.touches ? e.touches[0].clientY : 0;
    // Only prevent if at the top and user is pulling down
    if (preventPullToRefresh && window.scrollY === 0 && currentY - touchStartY > 0) {
        e.preventDefault();
    }
}, { passive: false });