/**
 * ContactForm - Handles form validation and submission
 */
class ContactForm {
  constructor(formElement) {
    this.form = formElement;
    this.fields = {
      name: this.form.querySelector('#name'),
      email: this.form.querySelector('#email'),
      message: this.form.querySelector('#message')
    };
    this.submitButton = this.form.querySelector('.submit-button');
    this.statusElement = this.form.querySelector('.form-status');
    
    // Email validation regex
    this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    this.init();
  }

  init() {
    // Add blur event listeners for real-time validation
    Object.keys(this.fields).forEach(fieldName => {
      const field = this.fields[fieldName];
      field.addEventListener('blur', () => this.validateField(fieldName));
      
      // Clear error on input
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
          this.clearFieldError(fieldName);
        }
      });
    });

    // Handle form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  validateField(fieldName) {
    const field = this.fields[fieldName];
    const value = field.value.trim();
    const errorElement = this.form.querySelector(`#${fieldName}-error`);

    // Check if field is empty
    if (!value) {
      this.showFieldError(fieldName, 'This field is required');
      return false;
    }

    // Email-specific validation
    if (fieldName === 'email' && !this.validateEmail(value)) {
      this.showFieldError(fieldName, 'Please enter a valid email address');
      return false;
    }

    // Message length validation (optional but good practice)
    if (fieldName === 'message' && value.length < 10) {
      this.showFieldError(fieldName, 'Message must be at least 10 characters');
      return false;
    }

    // Clear any existing errors
    this.clearFieldError(fieldName);
    return true;
  }

  validateEmail(email) {
    return this.emailRegex.test(email);
  }

  showFieldError(fieldName, message) {
    const field = this.fields[fieldName];
    const errorElement = this.form.querySelector(`#${fieldName}-error`);
    
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    errorElement.textContent = message;
  }

  clearFieldError(fieldName) {
    const field = this.fields[fieldName];
    const errorElement = this.form.querySelector(`#${fieldName}-error`);
    
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    errorElement.textContent = '';
  }

  validateAllFields() {
    let isValid = true;
    
    Object.keys(this.fields).forEach(fieldName => {
      if (!this.validateField(fieldName)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  async handleSubmit(event) {
    event.preventDefault();

    // Validate all fields
    if (!this.validateAllFields()) {
      return;
    }

    // Show loading state
    this.setLoadingState(true);
    this.clearStatus();

    // Collect form data
    const formData = {
      name: this.fields.name.value.trim(),
      email: this.fields.email.value.trim(),
      message: this.fields.message.value.trim()
    };

    try {
      // Simulate API call (replace with actual endpoint)
      await this.submitForm(formData);
      
      this.showSuccess('Thank you! Your message has been sent successfully.');
      this.reset();
    } catch (error) {
      this.showError('Unable to send message. Please try again later.');
    } finally {
      this.setLoadingState(false);
    }
  }

  async submitForm(formData) {
    // Simulate API call with delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success (90% success rate for demo)
        if (Math.random() > 0.1) {
          resolve({ success: true });
        } else {
          reject(new Error('Network error'));
        }
      }, 1500);
    });
  }

  setLoadingState(isLoading) {
    if (isLoading) {
      this.submitButton.classList.add('loading');
      this.submitButton.disabled = true;
    } else {
      this.submitButton.classList.remove('loading');
      this.submitButton.disabled = false;
    }
  }

  showSuccess(message) {
    this.statusElement.textContent = message;
    this.statusElement.className = 'form-status success';
    this.statusElement.setAttribute('role', 'status');
  }

  showError(message) {
    this.statusElement.textContent = message;
    this.statusElement.className = 'form-status error';
    this.statusElement.setAttribute('role', 'alert');
  }

  clearStatus() {
    this.statusElement.textContent = '';
    this.statusElement.className = 'form-status';
  }

  reset() {
    this.form.reset();
    
    // Clear all field errors
    Object.keys(this.fields).forEach(fieldName => {
      this.clearFieldError(fieldName);
    });
  }
}

// Initialize contact form when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}

function initContactForm() {
  const contactFormElement = document.getElementById('contactForm');
  if (contactFormElement) {
    window.contactForm = new ContactForm(contactFormElement);
  }
}
