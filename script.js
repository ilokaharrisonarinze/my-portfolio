document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const toggleIcon = navToggle ? navToggle.querySelector('i') : null;

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isOpen);
            if (toggleIcon) {
                toggleIcon.className = isOpen ? 'ri-close-line' : 'ri-menu-line';
            }
        });

        // Close mobile nav when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
                if (toggleIcon) toggleIcon.className = 'ri-menu-line';
            });
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                if (toggleIcon) toggleIcon.className = 'ri-menu-line';
            }
        });
    }

    // Fullscreen Toggle
    const fullscreenBtn = document.querySelector('.fullscreen');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        });
    }
});
