document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        // Close mobile nav when any link inside is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // 2. Dual-Platform Gmail / Contact Link Launcher
    const emailAddress = 'ilokaharrisonarinze@gmail.com';
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;
    const mailtoUrl = `mailto:${emailAddress}`;

    const isMobileDevice = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    };

    const handleGmailClick = (e) => {
        e.preventDefault();
        if (isMobileDevice()) {
            // On mobile, launch the native Gmail / Mail app compose screen directly
            window.location.href = mailtoUrl;
        } else {
            // On desktop computers, open Gmail web compose in a new tab
            window.open(gmailWebUrl, '_blank', 'noopener,noreferrer');
        }
    };

    // Attach to all email and contact links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"], .email-link');
    emailLinks.forEach(link => {
        link.addEventListener('click', handleGmailClick);
    });
});
