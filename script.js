// Update time display (for profile page)
function updateTime() {
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        const currentTime = Date.now();
        timeElement.textContent = currentTime;
        timeElement.setAttribute('datetime', new Date(currentTime).toISOString());
    }
}

// Initialize time and update every second (for profile page)
if (document.getElementById('currentTime')) {
    updateTime();
    setInterval(updateTime, 1000);
}

// Handle avatar upload (for profile page)
const avatarUpload = document.getElementById('avatarUpload');
const avatarImage = document.getElementById('avatarImage');

if (avatarUpload && avatarImage) {
    avatarUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            // File size validation (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                avatarImage.src = event.target.result;
                avatarImage.alt = `Profile picture - ${file.name}`;
            };
            reader.onerror = function() {
                alert('Error reading file. Please try again.');
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file');
        }
    });

    // Keyboard accessibility for upload
    avatarUpload.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
}

// Navigation highlighting (runs on all pages)
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
});

// Contact form validation (only runs on contact page)
if (document.getElementById('contactForm')) {
    const form = document.getElementById('contactForm');
    const successMessage = document.querySelector('[data-testid="test-contact-success"]');
    
    // Form validation function
    function validateField(field, errorElement) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Reset error state
        errorElement.style.display = 'none';
        field.setAttribute('aria-invalid', 'false');
        field.classList.remove('invalid');
        
        // Check if field is empty
        if (!value) {
            errorMessage = `Please enter your ${field.name || field.id}`;
            isValid = false;
        } 
        // Email validation
        else if (field.type === 'email') {
            if (!isValidEmail(value)) {
                errorMessage = 'Please enter a valid email address (e.g., name@example.com)';
                isValid = false;
            }
        } 
        // Message length validation
        else if (field.id === 'message') {
            if (value.length < 10) {
                errorMessage = `Message must be at least 10 characters long (currently ${value.length})`;
                isValid = false;
            }
        }
        // Full name validation (at least 2 words)
        else if (field.id === 'fullName') {
            const nameParts = value.split(' ').filter(part => part.length > 0);
            if (nameParts.length < 2) {
                errorMessage = 'Please enter your full name (first and last name)';
                isValid = false;
            }
        }
        
        if (!isValid) {
            const icon = errorElement.querySelector('i');
            if (icon) {
                errorElement.innerHTML = '';
                errorElement.appendChild(icon.cloneNode(true));
                errorElement.appendChild(document.createTextNode(' ' + errorMessage));
            } else {
                errorElement.textContent = errorMessage;
            }
            errorElement.style.display = 'block';
            field.setAttribute('aria-invalid', 'true');
            field.classList.add('invalid');
        }
        
        return isValid;
    }
    
    // Email validation helper (more robust)
    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
    
    // Real-time validation on input
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        // Validate on blur
        input.addEventListener('blur', function() {
            const errorId = this.id + '-error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                validateField(this, errorElement);
            }
        });
        
        // Clear error on input (but don't validate yet)
        input.addEventListener('input', function() {
            const errorId = this.id + '-error';
            const errorElement = document.getElementById(errorId);
            if (errorElement && this.value.trim()) {
                errorElement.style.display = 'none';
                this.setAttribute('aria-invalid', 'false');
                this.classList.remove('invalid');
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isFormValid = true;
        let firstInvalidField = null;
        
        // Validate all fields
        const fieldsToValidate = [
            { field: document.getElementById('fullName'), error: document.getElementById('name-error') },
            { field: document.getElementById('email'), error: document.getElementById('email-error') },
            { field: document.getElementById('subject'), error: document.getElementById('subject-error') },
            { field: document.getElementById('message'), error: document.getElementById('message-error') }
        ];
        
        fieldsToValidate.forEach(({ field, error }) => {
            if (!validateField(field, error)) {
                isFormValid = false;
                if (!firstInvalidField) {
                    firstInvalidField = field;
                }
            }
        });
        
        // If form is valid, show success message
        if (isFormValid) {
            // Hide any previous success messages
            successMessage.style.display = 'none';
            
            // Add a small delay for better UX
            setTimeout(() => {
                successMessage.style.display = 'block';
                form.reset();
                
                // Clear any validation states
                formInputs.forEach(input => {
                    input.classList.remove('invalid');
                    input.setAttribute('aria-invalid', 'false');
                });
                
                // Scroll to success message smoothly
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Move focus to success message for screen readers
                successMessage.setAttribute('tabindex', '-1');
                successMessage.focus();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                    successMessage.removeAttribute('tabindex');
                }, 5000);
            }, 100);
        } else {
            // Focus on first invalid field
            if (firstInvalidField) {
                firstInvalidField.focus();
                // Scroll to first error
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const inputs = Array.from(form.querySelectorAll('input, textarea'));
                const currentIndex = inputs.indexOf(this);
                if (currentIndex < inputs.length - 1) {
                    inputs[currentIndex + 1].focus();
                } else {
                    form.querySelector('button[type="submit"]').focus();
                }
            }
        });
    });
}