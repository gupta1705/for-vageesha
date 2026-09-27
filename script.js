// ========================================
// Compliments array
// ========================================
const compliments = [
    "You have the most beautiful soul, Vageesha 🌸",
    "Your laugh is literally the best sound ever 🎶",
    "You're way more amazing than you give yourself credit for ✨",
    "The world is so much better because you're in it 🌍💛",
    "You radiate kindness without even trying 🦋",
    "Your strength is honestly so inspiring 💪🌷",
    "Anyone who knows you is lucky to have you in their life 🍀",
    "You deserve every beautiful thing this life has to offer 🌻",
    "You're doing so well — even on the hard days 💕",
    "Never forget how special you truly are 🌟",
    "Your kindness makes everyone around you feel safe 🤍",
    "You have this amazing ability to light up any room 🕯️",
    "I hope you know how proud you should be of yourself 🏆",
    "Rest is productive too. Be gentle with yourself today 🧸",
    "You're not just surviving — you're blooming 🌺",
];

let lastComplimentIndex = -1;

// ========================================
// Floating background elements
// ========================================
function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    const emojis = ['🌸', '✨', '💛', '🌷', '🦋', '☁️', '🌙', '💫', '🌺', '🍃'];

    for (let i = 0; i < 15; i++) {
        const el = document.createElement('div');
        el.className = 'float-item';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.top = Math.random() * 100 + '%';
        el.style.animationDuration = (15 + Math.random() * 20) + 's';
        el.style.animationDelay = (Math.random() * 10) + 's';
        el.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
        container.appendChild(el);
    }
}

// ========================================
// Intersection Observer for fade-in
// ========================================
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Also animate children with delays
                const cards = entry.target.querySelectorAll('.sweet-card, .comfort-item, .reason');
                cards.forEach(card => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 100);
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ========================================
// Compliment button
// ========================================
function setupComplimentButton() {
    const btn = document.getElementById('complimentBtn');
    const display = document.getElementById('complimentDisplay');

    btn.addEventListener('click', (e) => {
        // Pick a random compliment (different from last)
        let index;
        do {
            index = Math.floor(Math.random() * compliments.length);
        } while (index === lastComplimentIndex && compliments.length > 1);
        lastComplimentIndex = index;

        // Animate display
        display.classList.remove('show');

        // Small delay for re-trigger animation
        setTimeout(() => {
            display.textContent = compliments[index];
            display.classList.add('show');
        }, 150);

        // Create mini heart burst
        createHeartBurst(e.clientX, e.clientY);
    });
}

// ========================================
// Heart burst on click
// ========================================
function createHeartBurst(x, y) {
    const hearts = ['💕', '💗', '💛', '🤍', '💖', '✨'];
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.className = 'mini-heart';
        heart.textContent = hearts[i % hearts.length];
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';

        const angle = (Math.PI * 2 / 6) * i + (Math.random() * 0.5);
        const distance = 40 + Math.random() * 60;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance - 30;

        heart.style.setProperty('--dx', dx + 'px');
        heart.style.setProperty('--dy', dy + 'px');

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1500);
    }
}

// ========================================
// Hearts rain in closing section
// ========================================
function setupHeartsRain() {
    const container = document.getElementById('heartsRain');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                spawnHearts(container);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(document.getElementById('closing'));
}

function spawnHearts(container) {
    const heartEmojis = ['💛', '🤍', '💕', '🧡', '💗'];
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = (Math.random() * 80 + 10) + '%';
            heart.style.animationDelay = (Math.random() * 2) + 's';
            heart.style.fontSize = (0.8 + Math.random() * 0.6) + 'rem';
            container.appendChild(heart);

            setTimeout(() => heart.remove(), 6000);
        }, i * 200);
    }
}

// ========================================
// Init
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    createFloatingElements();
    setupScrollAnimations();
    setupComplimentButton();
    setupHeartsRain();
});
