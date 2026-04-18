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

donateBtn.addEventListener('click', () => {
    donationModal.style.display = 'flex';
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
        
        // Don't prevent default for actual page sections
        if (href === '#home' || href === '#about' || href === '#services' || 
            href === '#activities' || href === '#gallery' || href === '#committee' || href === '#contact') {
            e.preventDefault();
            
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
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
                formMessage.innerHTML = `
                    <div style="padding: 15px; border-radius: 5px; background: #d4edda; color: #155724; border: 1px solid #c3e6cb;">
                        <i class="fas fa-check-circle" style="margin-right: 10px; color: #28a745;"></i>
                        <strong>✅ Message Sent Successfully!</strong><br>
                        Thank you <strong>${name}</strong>! Your message has been sent to:<br>
                        ✉️ Email: <strong>omsrivenkatamba@gmail.com</strong><br>
                        📱 SMS: <strong>+91 8309 545 660</strong><br>
                        We will contact you soon at ${phone || email}.
                    </div>
                `;
                
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
