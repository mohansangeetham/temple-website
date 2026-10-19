// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const menuOverlay = document.getElementById('menuOverlay');
const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    menuOverlay.classList.add('active');
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
});

menuOverlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
});

mobileDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdownMenu = toggle.nextElementSibling;
        dropdownMenu.classList.toggle('active');
        
        const icon = toggle.querySelector('i');
        if (icon.classList.contains('fa-chevron-down')) {
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });
});

// Image Slider
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[n].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// Donation Modal
const donateBtn = document.getElementById('donateBtn');
const donationModal = document.getElementById('donationModal');
const closeModal = document.getElementById('closeModal');
const closeModalBtn = document.getElementById('closeModalBtn');

['donateBtn', 'donateBtn2', 'donateLink'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            donationModal.style.display = 'flex';
        });
    }
});

// Donation amount & payment options
// For card/net banking set this to your payment gateway link (e.g. a Razorpay Payment Link).
const CARD_PAYMENT_URL = '';
const UPI_ID = 'omsrivenkatamba@upi';
const customAmount = document.getElementById('customAmount');
const donationMsg = document.getElementById('donationMsg');

document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        customAmount.value = btn.dataset.amount;
        document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        donationMsg.textContent = '';
    });
});
customAmount.addEventListener('input', () => {
    document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
});

function getAmount() {
    const amt = parseFloat(customAmount.value);
    if (!amt || amt <= 0) {
        donationMsg.textContent = 'Please select or enter a donation amount.';
        return null;
    }
    return amt;
}

document.getElementById('payUpiBtn').addEventListener('click', () => {
    const amt = getAmount();
    if (!amt) return;
    window.location.href = 'upi://pay?pa=' + encodeURIComponent(UPI_ID) +
        '&pn=' + encodeURIComponent('Srivenkatamba Temple') +
        '&am=' + amt.toFixed(2) + '&cu=INR&tn=' + encodeURIComponent('Temple Donation');
    donationMsg.textContent = 'On desktop, please scan the QR code below with any UPI app.';
});

document.getElementById('payCardBtn').addEventListener('click', () => {
    const amt = getAmount();
    if (!amt) return;
    if (CARD_PAYMENT_URL) {
        window.open(CARD_PAYMENT_URL + (CARD_PAYMENT_URL.includes('?') ? '&' : '?') + 'amount=' + amt, '_blank', 'noopener');
    } else {
        donationMsg.textContent = 'Online card payment is coming soon. Please use UPI or bank transfer.';
    }
});

document.getElementById('payBankBtn').addEventListener('click', () => {
    if (!getAmount()) return;
    document.getElementById('donationDetails').scrollIntoView({ behavior: 'smooth' });
});

closeModal.addEventListener('click', () => {
    donationModal.style.display = 'none';
});

closeModalBtn.addEventListener('click', () => {
    donationModal.style.display = 'none';
});

// Close modal when clicking outside
donationModal.addEventListener('click', (e) => {
    if (e.target === donationModal) {
        donationModal.style.display = 'none';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            e.preventDefault();

            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');

            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Submission with Formspree
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Prepare form data
        const formData = new FormData(this);
        
        try {
            // Send to Formspree
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success - show message
                formMessage.style.display = 'block';
                const successDiv = document.createElement('div');
                successDiv.style.cssText = 'padding: 15px; border-radius: 5px; background: #d4edda; color: #155724; border: 1px solid #c3e6cb;';
                const icon = document.createElement('i');
                icon.className = 'fas fa-check-circle';
                icon.style.cssText = 'margin-right: 10px; color: #28a745;';
                const bold = document.createElement('strong');
                bold.textContent = '✅ Message Sent Successfully!';
                successDiv.appendChild(icon);
                successDiv.appendChild(bold);
                successDiv.appendChild(document.createElement('br'));
                const thankYou = document.createTextNode('Thank you ' + name + '! We will contact you soon at ' + (phone || email));
                successDiv.appendChild(thankYou);
                formMessage.innerHTML = '';
                formMessage.appendChild(successDiv);
                
                // Scroll to show message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Show success alert
                alert(`✅ MESSAGE SENT SUCCESSFULLY!\n\n📨 Email sent to: omsrivenkatamba@gmail.com\n📱 SMS sent to: +91 8309 545 660\n\nThank you ${name}! The temple committee will contact you soon.`);
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    this.reset();
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                }, 3000);
                
                // Log for debugging
                console.log('✅ Form submitted successfully to Formspree!');
                console.log('📨 Email sent to: omsrivenkatamba@gmail.com');
                console.log('📱 SMS notification to: +91 8309 545 660');
                console.log('📝 Message details:', { name, email, phone, subject, message });
                
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            // Error handling
            formMessage.style.display = 'block';
            formMessage.innerHTML = `
                <div style="padding: 15px; border-radius: 5px; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;">
                    <i class="fas fa-exclamation-circle" style="margin-right: 10px; color: #dc3545;"></i>
                    <strong>❌ Error Sending Message!</strong><br>
                    Please try again or contact us directly:<br>
                    📞 +91 8309 545 660<br>
                    ✉️ omsrivenkatamba@gmail.com
                </div>
            `;
            
            console.error('❌ Form submission error:', error);
            
        } finally {
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Initialize the page based on URL hash
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.getElementById(hash.substring(1));
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }, 500);
        }
    }
});

// Add hover effect to committee cards
document.querySelectorAll('.committee-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    });
});

// Form validation styling
const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
formInputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.style.borderColor = '#28a745';
            this.style.boxShadow = '0 0 0 2px rgba(40, 167, 69, 0.1)';
        } else {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        }
    });
    
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && this.value.trim() === '') {
            this.style.borderColor = '#dc3545';
            this.style.boxShadow = '0 0 0 2px rgba(220, 53, 69, 0.1)';
        }
    });
});
