document.addEventListener('DOMContentLoaded', () => {
    // 1. CONSTANTS & UTILS
    const EMAIL = 'ilokaharrisonarinze@gmail.com';

    // 2. MOBILE NAVIGATION TOGGLE
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // 3. HIGHLIGHT ACTIVE NAV LINK
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .site-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 4. CREATE CONTACT MODAL & TOAST DOM ELEMENTS
    const createModalAndToast = () => {
        if (document.getElementById('contact-modal')) return;

        // Toast Container
        const toast = document.createElement('div');
        toast.id = 'portfolio-toast';
        toast.className = 'portfolio-toast';
        toast.innerHTML = `<span id="toast-message">Copied to clipboard!</span>`;

        // Contact Modal
        const modal = document.createElement('div');
        modal.id = 'contact-modal';
        modal.className = 'contact-modal-overlay';
        modal.innerHTML = `
            <div class="contact-modal-card">
                <button class="modal-close-btn" id="modal-close" aria-label="Close Modal">&times;</button>
                <div class="modal-header">
                    <div class="modal-icon"><i class="ri-mail-send-line"></i></div>
                    <h3>Get in Touch</h3>
                    <p>Choose your preferred way to contact Harrison</p>
                </div>
                
                <div class="email-display-box">
                    <span class="email-text">${EMAIL}</span>
                    <button class="copy-email-btn" id="copy-email-btn" title="Copy Email">
                        <i class="ri-file-copy-line"></i> Copy
                    </button>
                </div>

                <div class="contact-options">
                    <a href="mailto:${EMAIL}" class="contact-option-btn primary-btn">
                        <i class="ri-mail-fill"></i> Open Mail / Gmail App
                    </a>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}" target="_blank" rel="noopener" class="contact-option-btn secondary-btn">
                        <i class="ri-global-line"></i> Open Gmail Web
                    </a>
                </div>

                <div class="modal-divider"><span>OR SEND A QUICK MESSAGE</span></div>

                <form class="quick-message-form" id="quick-message-form">
                    <input type="text" id="msg-name" placeholder="Your Name" required>
                    <input type="email" id="msg-email" placeholder="Your Email" required>
                    <textarea id="msg-text" rows="3" placeholder="Your Message..." required></textarea>
                    <button type="submit" class="send-msg-btn">
                        <i class="ri-send-plane-fill"></i> Send Message
                    </button>
                </form>
            </div>
        `;

        document.body.appendChild(toast);
        document.body.appendChild(modal);

        // Inject Styles for Modal and Toast
        const style = document.createElement('style');
        style.textContent = `
            /* Toast Styling */
            .portfolio-toast {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: #0f172a;
                color: #38bdf8;
                border: 1px solid rgba(56, 189, 248, 0.3);
                padding: 12px 24px;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 500;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                z-index: 10000;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: none;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .portfolio-toast.show {
                opacity: 1;
                transform: translateY(0);
            }

            /* Modal Overlay */
            .contact-modal-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.75);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            .contact-modal-overlay.active {
                opacity: 1;
                visibility: visible;
            }

            /* Modal Card */
            .contact-modal-card {
                background: linear-gradient(145deg, #0f172a, #1e293b);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 20px;
                width: 100%;
                max-width: 440px;
                padding: 30px 24px;
                position: relative;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
                transform: scale(0.9);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                color: #fff;
                font-family: 'Poppins', sans-serif;
            }
            .contact-modal-overlay.active .contact-modal-card {
                transform: scale(1);
            }

            .modal-close-btn {
                position: absolute;
                top: 15px;
                right: 18px;
                background: transparent;
                border: none;
                color: rgba(255,255,255,0.6);
                font-size: 28px;
                cursor: pointer;
                line-height: 1;
                transition: 0.2s;
            }
            .modal-close-btn:hover {
                color: #fff;
            }

            .modal-header {
                text-align: center;
                margin-bottom: 20px;
            }
            .modal-icon {
                font-size: 32px;
                color: #38bdf8;
                margin-bottom: 6px;
            }
            .modal-header h3 {
                font-size: 22px;
                font-weight: 700;
                margin-bottom: 4px;
            }
            .modal-header p {
                font-size: 13px;
                color: rgba(255,255,255,0.7);
            }

            .email-display-box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: rgba(0, 0, 0, 0.35);
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 10px 14px;
                border-radius: 12px;
                margin-bottom: 16px;
            }
            .email-text {
                font-size: 13px;
                color: #38bdf8;
                font-weight: 500;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .copy-email-btn {
                background: #38bdf8;
                color: #0f172a;
                border: none;
                padding: 6px 12px;
                border-radius: 8px;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
                transition: 0.2s;
                display: flex;
                align-items: center;
                gap: 4px;
                flex-shrink: 0;
            }
            .copy-email-btn:hover {
                background: #7dd3fc;
            }

            .contact-options {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-bottom: 20px;
            }
            .contact-option-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                padding: 12px;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 600;
                text-decoration: none;
                transition: 0.2s ease;
            }
            .primary-btn {
                background: linear-gradient(135deg, #0284c7, #2563eb);
                color: #fff;
            }
            .primary-btn:hover {
                background: linear-gradient(135deg, #0369a1, #1d4ed8);
            }
            .secondary-btn {
                background: rgba(255, 255, 255, 0.08);
                color: #fff;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .secondary-btn:hover {
                background: rgba(255, 255, 255, 0.15);
            }

            .modal-divider {
                text-align: center;
                position: relative;
                margin: 18px 0;
            }
            .modal-divider::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                height: 1px;
                background: rgba(255, 255, 255, 0.1);
            }
            .modal-divider span {
                position: relative;
                background: #1e293b;
                padding: 0 10px;
                font-size: 10px;
                letter-spacing: 1px;
                color: rgba(255, 255, 255, 0.5);
            }

            .quick-message-form {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .quick-message-form input,
            .quick-message-form textarea {
                width: 100%;
                background: rgba(0, 0, 0, 0.25);
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 10px 14px;
                border-radius: 10px;
                color: #fff;
                font-size: 13px;
                outline: none;
                font-family: inherit;
                transition: 0.2s;
            }
            .quick-message-form input:focus,
            .quick-message-form textarea:focus {
                border-color: #38bdf8;
                background: rgba(0, 0, 0, 0.4);
            }
            .send-msg-btn {
                background: #10b981;
                color: #fff;
                border: none;
                padding: 12px;
                border-radius: 10px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
            }
            .send-msg-btn:hover {
                background: #059669;
            }
        `;
        document.head.appendChild(style);
    };

    createModalAndToast();

    // 5. TOAST NOTIFICATION FUNCTION
    const showToast = (msg) => {
        const toast = document.getElementById('portfolio-toast');
        const toastMsg = document.getElementById('toast-message');
        if (toast && toastMsg) {
            toastMsg.textContent = msg;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    };

    // 6. MODAL EVENT LISTENERS
    const modal = document.getElementById('contact-modal');
    const modalClose = document.getElementById('modal-close');
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const quickForm = document.getElementById('quick-message-form');

    const openContactModal = (e) => {
        if (e) e.preventDefault();
        if (modal) modal.classList.add('active');
    };

    const closeContactModal = () => {
        if (modal) modal.classList.remove('active');
    };

    if (modalClose) modalClose.addEventListener('click', closeContactModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeContactModal();
        });
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(EMAIL).then(() => {
                showToast('Email copied to clipboard!');
            }).catch(() => {
                const tempInput = document.createElement('input');
                tempInput.value = EMAIL;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                showToast('Email copied to clipboard!');
            });
        });
    }

    if (quickForm) {
        quickForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('msg-name').value;
            const email = document.getElementById('msg-email').value;
            const msg = document.getElementById('msg-text').value;

            const mailtoUri = `mailto:${EMAIL}?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(msg + '\n\nFrom: ' + name + ' (' + email + ')')}`;
            
            showToast('Opening mail composer...');
            setTimeout(() => {
                window.location.href = mailtoUri;
                closeContactModal();
                quickForm.reset();
            }, 600);
        });
    }

    // Attach Modal trigger to all Contact links & Gmail buttons
    const contactElements = document.querySelectorAll('a[href^="mailto:"], .email-link, .about-btn');
    contactElements.forEach(el => {
        el.addEventListener('click', openContactModal);
    });

    // 7. FULLSCREEN LIGHTBOX FOR HERO IMAGE
    const fullscreenBtn = document.querySelector('.fullscreen');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            const heroImg = document.querySelector('.hero-image img, .about-image img');
            const imgSrc = heroImg ? heroImg.src : 'images/profile.png';

            const lightbox = document.createElement('div');
            lightbox.className = 'contact-modal-overlay active';
            lightbox.style.zIndex = '10001';
            lightbox.innerHTML = `
                <div style="position:relative; max-width:90vw; max-height:90vh;">
                    <button id="lb-close" style="position:absolute; top:-40px; right:0; background:transparent; border:none; color:#fff; font-size:32px; cursor:pointer;">&times;</button>
                    <img src="${imgSrc}" style="max-width:100%; max-height:85vh; border-radius:16px; box-shadow:0 20px 50px rgba(0,0,0,0.8);">
                </div>
            `;
            document.body.appendChild(lightbox);

            lightbox.querySelector('#lb-close').addEventListener('click', () => {
                lightbox.remove();
            });
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) lightbox.remove();
            });
        });
    }
});
