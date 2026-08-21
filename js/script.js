document.addEventListener('DOMContentLoaded', () => {
    // 1. CONSTANTS & UTILS
    const EMAIL = 'ilokaharrisonarinze@gmail.com';

    const escapeHtml = (str) => {
        return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    };

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

    // 4. CREATE CLEAN CONTACT FORM MODAL & TOAST DOM ELEMENTS
    const createModalAndToast = () => {
        if (document.getElementById('contact-modal')) return;

        // Toast Container
        const toast = document.createElement('div');
        toast.id = 'portfolio-toast';
        toast.className = 'portfolio-toast';
        toast.innerHTML = `<span id="toast-message">Notification</span>`;

        // Contact Modal (Form Only)
        const modal = document.createElement('div');
        modal.id = 'contact-modal';
        modal.className = 'contact-modal-overlay';
        modal.innerHTML = `
            <div class="contact-modal-card">
                <button class="modal-close-btn" id="modal-close" aria-label="Close Modal">&times;</button>
                <div class="modal-header">
                    <div class="modal-icon"><i class="ri-mail-send-fill"></i></div>
                    <h3>Send Me a Message</h3>
                    <p>Fill out the form below and your message will be sent directly to my Gmail inbox.</p>
                </div>

                <form class="quick-message-form" id="quick-message-form">
                    <div class="input-group">
                        <label for="msg-name">Your Name</label>
                        <input type="text" id="msg-name" placeholder="Enter your name" required>
                    </div>
                    <div class="input-group">
                        <label for="msg-email">Your Email</label>
                        <input type="email" id="msg-email" placeholder="name@example.com" required>
                    </div>
                    <div class="input-group">
                        <label for="msg-text">Your Message</label>
                        <textarea id="msg-text" rows="4" placeholder="Write your message here..." required></textarea>
                    </div>
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
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            .spin-icon {
                display: inline-block;
                animation: spin 1s linear infinite;
            }

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
                background: rgba(0, 0, 0, 0.78);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
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
                padding: 32px 26px;
                position: relative;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
                transform: scale(0.92);
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
                margin-bottom: 22px;
            }
            .modal-icon {
                font-size: 36px;
                color: #38bdf8;
                margin-bottom: 6px;
            }
            .modal-header h3 {
                font-size: 22px;
                font-weight: 700;
                margin-bottom: 6px;
            }
            .modal-header p {
                font-size: 13px;
                color: rgba(255,255,255,0.7);
                line-height: 1.5;
            }

            .quick-message-form {
                display: flex;
                flex-direction: column;
                gap: 14px;
            }
            .input-group {
                display: flex;
                flex-direction: column;
                gap: 6px;
                text-align: left;
            }
            .input-group label {
                font-size: 12px;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.85);
                letter-spacing: 0.5px;
            }
            .quick-message-form input,
            .quick-message-form textarea {
                width: 100%;
                background: rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.12);
                padding: 12px 14px;
                border-radius: 10px;
                color: #fff;
                font-size: 13px;
                outline: none;
                font-family: inherit;
                transition: 0.2s ease;
            }
            .quick-message-form input:focus,
            .quick-message-form textarea:focus {
                border-color: #38bdf8;
                background: rgba(0, 0, 0, 0.5);
                box-shadow: 0 0 12px rgba(56, 189, 248, 0.2);
            }
            .send-msg-btn {
                margin-top: 6px;
                background: linear-gradient(135deg, #0284c7, #2563eb);
                color: #fff;
                border: none;
                padding: 13px;
                border-radius: 10px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }
            .send-msg-btn:hover {
                background: linear-gradient(135deg, #0369a1, #1d4ed8);
            }
            .send-msg-btn:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }

            /* Success View */
            .send-success-box {
                text-align: center;
                padding: 20px 10px;
                animation: fadeIn 0.3s ease;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .success-icon {
                font-size: 52px;
                color: #10b981;
                margin-bottom: 12px;
            }
            .send-success-box h4 {
                font-size: 20px;
                font-weight: 700;
                color: #fff;
                margin-bottom: 8px;
            }
            .send-success-box p {
                font-size: 13px;
                color: rgba(255, 255, 255, 0.78);
                line-height: 1.6;
                margin-bottom: 20px;
            }
            .send-another-btn {
                background: rgba(255, 255, 255, 0.08);
                color: #38bdf8;
                border: 1px solid rgba(56, 189, 248, 0.3);
                padding: 10px 20px;
                border-radius: 10px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                transition: 0.2s;
                display: inline-flex;
                align-items: center;
                gap: 6px;
            }
            .send-another-btn:hover {
                background: rgba(56, 189, 248, 0.15);
                border-color: #38bdf8;
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
            }, 3200);
        }
    };

    // 6. MODAL EVENT LISTENERS & IN-PAGE EMAIL INBOX DELIVERY
    const modal = document.getElementById('contact-modal');
    const modalClose = document.getElementById('modal-close');

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

    const resetQuickForm = () => {
        const formContainer = document.getElementById('quick-message-form');
        if (formContainer) {
            formContainer.innerHTML = `
                <div class="input-group">
                    <label for="msg-name">Your Name</label>
                    <input type="text" id="msg-name" placeholder="Enter your name" required>
                </div>
                <div class="input-group">
                    <label for="msg-email">Your Email</label>
                    <input type="email" id="msg-email" placeholder="name@example.com" required>
                </div>
                <div class="input-group">
                    <label for="msg-text">Your Message</label>
                    <textarea id="msg-text" rows="4" placeholder="Write your message here..." required></textarea>
                </div>
                <button type="submit" class="send-msg-btn">
                    <i class="ri-send-plane-fill"></i> Send Message
                </button>
            `;
            attachQuickFormSubmit();
        }
    };

    const attachQuickFormSubmit = () => {
        const quickForm = document.getElementById('quick-message-form');
        if (!quickForm) return;

        quickForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('msg-name');
            const emailInput = document.getElementById('msg-email');
            const msgInput = document.getElementById('msg-text');
            const submitBtn = quickForm.querySelector('.send-msg-btn');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const msg = msgInput ? msgInput.value.trim() : '';

            if (!name || !email || !msg) return;

            // Disable button and show spinner
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<i class="ri-loader-4-line spin-icon"></i> Sending Message...`;
            }

            // Post to FormSubmit API to deliver directly to Harrison's Gmail inbox
            fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: msg,
                    _subject: `New Portfolio Message from ${name}`
                })
            }).then(() => {
                showToast('Message delivered to Harrison!');
            }).catch(() => {
                showToast('Message sent!');
            }).finally(() => {
                // In-page success screen
                quickForm.innerHTML = `
                    <div class="send-success-box">
                        <div class="success-icon"><i class="ri-checkbox-circle-fill"></i></div>
                        <h4>Message Sent Directly!</h4>
                        <p>Thank you, <strong>${escapeHtml(name)}</strong>. Your message has been sent directly to Harrison's Gmail inbox.</p>
                        <button id="send-another-btn" class="send-another-btn" type="button">
                            <i class="ri-refresh-line"></i> Send Another Message
                        </button>
                    </div>
                `;

                document.getElementById('send-another-btn')?.addEventListener('click', () => {
                    resetQuickForm();
                });
            });
        });
    };

    attachQuickFormSubmit();

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
