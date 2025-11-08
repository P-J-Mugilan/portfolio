/**
 * P J Mugilan Portfolio - Optimized JavaScript Functionality
 * Performance-focused, SEO-friendly, and accessible interactions
 * @version 1.0.0
 */

// Performance monitoring
const performanceMetrics = {
    startTime: performance.now(),
    domReadyTime: 0,
    loadTime: 0
};

// Wait for DOM to be fully loaded with performance tracking
document.addEventListener('DOMContentLoaded', function() {
    performanceMetrics.domReadyTime = performance.now();
    
    // Initialize all functionality with error handling
    try {
        initPerformanceMonitoring();
        initNavigation();
        initSmoothScrolling();
        initScrollAnimations();
        initFloatingSocial();
        initResumeDownload();
        initCopyrightYear();
        initAccessibilityFeatures();
        
        console.log('🚀 Portfolio initialized successfully!');
        console.log(`📊 DOM Ready: ${(performanceMetrics.domReadyTime - performanceMetrics.startTime).toFixed(2)}ms`);
    } catch (error) {
        console.error('❌ Portfolio initialization failed:', error);
    }
});

// Track full page load
window.addEventListener('load', function() {
    performanceMetrics.loadTime = performance.now();
    console.log(`📊 Full Load: ${(performanceMetrics.loadTime - performanceMetrics.startTime).toFixed(2)}ms`);
});

/**
 * Initialize performance monitoring and error tracking
 */
function initPerformanceMonitoring() {
    // Report Web Vitals (simplified)
    const reportWebVital = (metric) => {
        console.log('📊 Performance Metric:', metric.name, Math.round(metric.value));
    };
    
    // Observe Largest Contentful Paint (LCP)
    const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        reportWebVital({
            name: 'LCP',
            value: lastEntry.renderTime || lastEntry.loadTime
        });
    });
    
    observer.observe({entryTypes: ['largest-contentful-paint']});
    
    // Error boundary for JavaScript errors
    window.addEventListener('error', (event) => {
        console.error('🚨 JavaScript Error:', event.error);
        // In production, you might send this to an error tracking service
    });
}

/**
 * Initialize mobile navigation with enhanced accessibility
 */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) {
        console.warn('⚠️ Navigation elements not found');
        return;
    }
    
    // Mobile menu toggle with ARIA attributes
    hamburger.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        // Toggle menu state
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        this.setAttribute('aria-expanded', !isExpanded);
        
        // Update accessibility labels
        this.setAttribute('aria-label', 
            isExpanded ? 'Open navigation menu' : 'Close navigation menu'
        );
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open navigation menu');
        });
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.focus(); // Return focus to hamburger button
        }
    });
    
    // Enhanced navbar background on scroll with requestAnimationFrame
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        // Throttle scroll events for performance
        if (!scrollTimeout) {
            scrollTimeout = requestAnimationFrame(() => {
                const navbar = document.getElementById('navbar');
                const shouldBlur = window.scrollY > 100;
                
                navbar.style.backgroundColor = shouldBlur 
                    ? 'rgba(255, 255, 255, 0.95)' 
                    : 'var(--white)';
                navbar.style.backdropFilter = shouldBlur ? 'blur(10px)' : 'none';
                
                scrollTimeout = null;
            });
        }
    });
    
    // Trap focus in mobile menu for accessibility
    initFocusTrap(navLinks, hamburger);
}

// Experience section animation
const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Observe experience items
document.querySelectorAll('.experience-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    experienceObserver.observe(item);
});


/**
 * Initialize smooth scrolling with enhanced user experience
 */
function initSmoothScrolling() {
    // Use modern scroll behavior with polyfill for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Load smooth scroll polyfill if needed
        console.log('📜 Loading smooth scroll polyfill');
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Calculate scroll position with offset for fixed header
                const headerHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Smooth scroll with performance optimization
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload (progressive enhancement)
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
                
                // Focus management for accessibility
                setTimeout(() => {
                    if (targetElement.hasAttribute('tabindex')) {
                        targetElement.focus();
                    }
                }, 1000);
            }
        });
    });
    
    // Enhanced Hire Me button functionality
    const hireMeButton = document.querySelector('.btn.primary[href="#contact"]');
    if (hireMeButton) {
        hireMeButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

/**
 * Initialize scroll animations with Intersection Observer
 */
function initScrollAnimations() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: show all elements immediately
        document.querySelectorAll('.skill-category, .project-card, .education-item, .certification-item, .experience-item')
            .forEach(el => el.classList.add('animate-in'));
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Optional: unobserve after animation to improve performance
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation with error handling
    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .education-item, .certification-item, .experience-item'
    );
    
    if (animatedElements.length === 0) {
        console.warn('⚠️ No animatable elements found');
        return;
    }
    
    animatedElements.forEach(el => {
        if (el) observer.observe(el);
    });
}

/**
 * Initialize floating social media icons with enhanced interactions
 */
function initFloatingSocial() {
    const floatingSocial = document.querySelector('.floating-social');
    const socialLinks = document.querySelectorAll('.floating-social-link');
    
    if (!floatingSocial || socialLinks.length === 0) {
        console.warn('⚠️ Floating social icons not found');
        return;
    }
    
    // Add animation delay to each link for staggered effect
    socialLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        
        // Enhanced click analytics (optional)
        link.addEventListener('click', function() {
            console.log(`🔗 Social link clicked: ${this.getAttribute('aria-label')}`);
            // In production, you might send this to analytics
        });
    });
    
    // Smart hide/show on scroll with performance optimization
    let lastScrollTop = 0;
    let scrollDirectionTimeout;
    
    window.addEventListener('scroll', () => {
        // Throttle scroll events
        if (!scrollDirectionTimeout) {
            scrollDirectionTimeout = requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const isScrollingDown = scrollTop > lastScrollTop && scrollTop > 100;
                
                // Only update if state changed
                if (isScrollingDown !== floatingSocial.classList.contains('hidden')) {
                    if (isScrollingDown) {
                        floatingSocial.style.transform = 'translateX(100px)';
                        floatingSocial.style.opacity = '0';
                        floatingSocial.classList.add('hidden');
                    } else {
                        floatingSocial.style.transform = 'translateX(0)';
                        floatingSocial.style.opacity = '1';
                        floatingSocial.classList.remove('hidden');
                    }
                }
                
                lastScrollTop = scrollTop;
                scrollDirectionTimeout = null;
            });
        }
    });
    
    // Add keyboard navigation for social icons
    floatingSocial.addEventListener('keydown', (e) => {
        const links = Array.from(socialLinks);
        const currentIndex = links.indexOf(document.activeElement);
        
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                if (currentIndex > 0) links[currentIndex - 1].focus();
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (currentIndex < links.length - 1) links[currentIndex + 1].focus();
                break;
            case 'Home':
                e.preventDefault();
                links[0].focus();
                break;
            case 'End':
                e.preventDefault();
                links[links.length - 1].focus();
                break;
        }
    });
}

/**
 * Initialize resume download functionality
 */
function initResumeDownload() {
    const resumeBtn = document.getElementById('resume-btn');
    
    if (!resumeBtn) {
        console.warn('⚠️ Resume button not found');
        return;
    }
    
    resumeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Enhanced download experience
        const resumeUrl = 'assets/resume.pdf'; // Update with your actual resume path
        
        // Check if file exists (basic implementation)
        fetch(resumeUrl, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    // File exists - proceed with download
                    const link = document.createElement('a');
                    link.href = resumeUrl;
                    link.download = 'P-J-Mugilan-Resume.pdf';
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    showNotification('📄 Resume downloaded successfully!', 'success');
                } else {
                    // File doesn't exist - show fallback message
                    showNotification('📄 Resume download will be available soon. Please contact me directly.', 'info');
                }
            })
            .catch(() => {
                // Network error or other issue
                showNotification('❌ Unable to download resume. Please try again later or contact me directly.', 'error');
            });
    });
}

/**
 * Update copyright year automatically
 */
function initCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer p');
    
    if (yearElement) {
        yearElement.textContent = yearElement.textContent.replace(/\d{4}/, currentYear.toString());
    }
}

/**
 * Initialize additional accessibility features
 */
function initAccessibilityFeatures() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Handle reduced motion preferences
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
        document.documentElement.classList.add('reduced-motion');
    }
    
    // Listen for reduced motion changes
    reducedMotion.addEventListener('change', (e) => {
        if (e.matches) {
            document.documentElement.classList.add('reduced-motion');
        } else {
            document.documentElement.classList.remove('reduced-motion');
        }
    });
}

/**
 * Focus trap for mobile navigation (accessibility)
 */
function initFocusTrap(menu, trigger) {
    const focusableElements = menu.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    menu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        } else if (e.key === 'Escape') {
            trigger.focus();
        }
    });
}

/**
 * Enhanced notification system with better UX
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };
    
    notification.innerHTML = `
        <span>${icons[type] || ''} ${message}</span>
        <button onclick="this.parentElement.remove()" aria-label="Close notification">
            &times;
        </button>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: var(--accent-purple);
                color: white;
                padding: 8px;
                border-radius: 4px;
                text-decoration: none;
                z-index: 10000;
                transition: top 0.3s;
            }
            .skip-link:focus {
                top: 6px;
            }
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
            .notification {
                position: fixed;
                top: 100px;
                right: 30px;
                background: var(--white);
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                border-left: 4px solid var(--accent-green);
                z-index: 1001;
                animation: slideIn 0.3s ease;
                max-width: 400px;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .notification.success {
                border-left-color: var(--accent-green);
            }
            .notification.error {
                border-left-color: #e74c3c;
            }
            .notification.warning {
                border-left-color: #f39c12;
            }
            .notification button {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background-color 0.2s;
            }
            .notification button:hover {
                background-color: rgba(0,0,0,0.1);
            }
            @keyframes slideIn {
                from { 
                    transform: translateX(100px); 
                    opacity: 0; 
                }
                to { 
                    transform: translateX(0); 
                    opacity: 1; 
                }
            }
            @media (max-width: 768px) {
                .notification {
                    right: 20px;
                    left: 20px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
    
    // Clear timeout if user interacts with notification
    notification.addEventListener('mouseenter', () => {
        clearTimeout(autoRemove);
    });
    
    notification.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    });
}

/**
 * Utility function to check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initSmoothScrolling,
        initScrollAnimations,
        showNotification
    };
}