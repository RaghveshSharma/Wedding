// Wedding Date - First event (Haldi on Feb 11, 2026)
const weddingDate = new Date('2026-02-11T13:00:00').getTime();

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Open Invitation Animation
function openInvitation() {
    const coverPage = document.getElementById('coverPage');
    const mainContent = document.getElementById('mainContent');
    
    coverPage.style.transform = 'scale(0.8)';
    coverPage.style.opacity = '0';
    
    setTimeout(() => {
        coverPage.style.display = 'none';
        mainContent.classList.add('active');
        createPetals();
        createConfetti();
    }, 800);
}

// Create Falling Petals/Hearts
function createPetal() {
    const petals = ['🌸', '🌺', '🌹', '❤️', '💕', '💖', '💗', '🌷', '🏵️', '💍'];
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 5 + 8) + 's';
    petal.style.animationDelay = Math.random() * 5 + 's';
    petal.style.fontSize = (Math.random() * 15 + 15) + 'px';
    
    document.getElementById('petalsContainer').appendChild(petal);
    
    setTimeout(() => {
        petal.remove();
    }, 13000);
}

// Create petals periodically
function createPetals() {
    setInterval(createPetal, 1500);
    // Create initial batch
    for (let i = 0; i < 5; i++) {
        setTimeout(createPetal, i * 300);
    }
}

// Confetti Burst Effect
function createConfetti() {
    const colors = ['#ff6b9d', '#ff85a3', '#ffd700', '#ff1744', '#c41e3a'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '10000';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        document.body.appendChild(confetti);
        
        const fallDuration = Math.random() * 3 + 2;
        const fallDistance = Math.random() * 100 + 100;
        const rotation = Math.random() * 360;
        
        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${fallDistance}vh) rotate(${rotation}deg)`, opacity: 0 }
        ], {
            duration: fallDuration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => {
            confetti.remove();
        }, fallDuration * 1000);
    }
}

// Reveal elements on scroll
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (elementTop < windowHeight - revealPoint) {
            setTimeout(() => {
                element.classList.add('show');
            }, index * 100);
        }
    });
}

// Scroll events
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Add touch feedback for mobile
const interactiveElements = document.querySelectorAll('.open-invitation, .directions-btn, .event-item, .gallery-card, .venue-card');

interactiveElements.forEach(element => {
    element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    element.addEventListener('touchend', function() {
        this.style.transform = '';
    });
});

// Smooth scroll for any internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to cover page
window.addEventListener('scroll', () => {
    const coverPage = document.getElementById('coverPage');
    if (coverPage && coverPage.style.display !== 'none') {
        const scrolled = window.pageYOffset;
        coverPage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add ripple effect on click for buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    const rect = button.getBoundingClientRect();
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.classList.add('ripple-effect');
    
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    
    const existingRipple = button.querySelector('.ripple-effect');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add click handlers for ripple effect
const buttons = document.querySelectorAll('.open-invitation, .directions-btn');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Preload images for smoother experience
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const preloadImg = new Image();
            preloadImg.src = src;
        }
    });
}

window.addEventListener('load', preloadImages);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Track user interaction for analytics (optional)
let hasInteracted = false;
document.addEventListener('click', () => {
    if (!hasInteracted) {
        hasInteracted = true;
        console.log('User interacted with invitation');
    }
});

// Add swipe gesture for mobile (optional enhancement)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left
        console.log('Swiped left');
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right
        console.log('Swiped right');
    }
}

// Performance optimization - Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add Easter egg - Konami code
let konamiCode = [];
const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-secretCode.length);
    
    if (konamiCode.join('') === secretCode.join('')) {
        createConfetti();
        setTimeout(createConfetti, 1000);
        setTimeout(createConfetti, 2000);
    }
});

// Vibrate on button clicks (mobile only)
if ('vibrate' in navigator) {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            navigator.vibrate(50);
        });
    });
}

// Prevent zoom on double tap (mobile)
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add shake animation on countdown when time is running low
function checkCountdownUrgency() {
    const days = parseInt(document.getElementById('days').textContent);
    const countdownCard = document.querySelector('.countdown-card');
    
    if (days <= 7 && countdownCard) {
        countdownCard.style.animation = 'shake 0.5s ease-in-out infinite';
    }
}

setInterval(checkCountdownUrgency, 60000); // Check every minute

// Console message
console.log('%c💕 Kratika & Sushim Wedding Invitation 💕', 'color: #ff6b9d; font-size: 20px; font-weight: bold; font-family: "Dancing Script", cursive;');
console.log('%cMade with love ❤️ | February 11-14, 2026', 'color: #8b1538; font-size: 14px;');
console.log('%cJalwa Resort, Narmadapuram & Indore', 'color: #c41e3a; font-size: 12px;');

// Auto-scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});
