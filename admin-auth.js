// Admin Authentication JavaScript

// Initialize admin storage
function initAdminStorage() {
    if (!localStorage.getItem('qaidahAdmins')) {
        // Create default admin account
        const defaultAdmin = {
            id: 1,
            username: 'admin',
            email: 'admin@qaidah.com',
            password: btoa('admin123'), // Base64 encoded (not secure - use proper hashing in production)
            firstName: 'Admin',
            lastName: 'User',
            role: 'super-admin',
            organization: 'Qaidah Academy',
            createdAt: new Date().toISOString(),
            isActive: true
        };
        localStorage.setItem('qaidahAdmins', JSON.stringify([defaultAdmin]));
    }
}

// Handle Admin Login
function handleAdminLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const username = formData.get('username').trim();
    const password = formData.get('password');
    const remember = formData.get('remember');
    
    // Get admins from storage
    initAdminStorage();
    const admins = JSON.parse(localStorage.getItem('qaidahAdmins'));
    
    // Find admin
    const admin = admins.find(a => 
        (a.username === username || a.email === username) && 
        atob(a.password) === password
    );
    
    if (admin) {
        if (!admin.isActive) {
            showError('Your admin account is pending approval. Please contact support.');
            return;
        }
        
        // Set session
        const session = {
            adminId: admin.id,
            username: admin.username,
            role: admin.role,
            loginTime: new Date().toISOString()
        };
        
        if (remember) {
            localStorage.setItem('adminSession', JSON.stringify(session));
        } else {
            sessionStorage.setItem('adminSession', JSON.stringify(session));
        }
        
        // Show success
        showSuccess(`Welcome back, ${admin.firstName}!`);
        
        // Redirect to admin dashboard
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1000);
    } else {
        showError('Invalid username or password. Please try again.');
    }
}

// Handle Admin Registration
function handleAdminRegister(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const username = formData.get('username').trim();
    const email = formData.get('email').trim();
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showError('Passwords do not match!');
        return;
    }
    
    // Validate password strength
    if (password.length < 8) {
        showError('Password must be at least 8 characters long!');
        return;
    }
    
    // Get existing admins
    initAdminStorage();
    const admins = JSON.parse(localStorage.getItem('qaidahAdmins'));
    
    // Check if username exists
    if (admins.find(a => a.username === username)) {
        showError('Username already exists! Please choose another.');
        return;
    }
    
    // Check if email exists
    if (admins.find(a => a.email === email)) {
        showError('Email already registered! Please use another email.');
        return;
    }
    
    // Create new admin
    const newAdmin = {
        id: Date.now(),
        username: username,
        email: email,
        password: btoa(password), // Base64 encoded
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        role: formData.get('role'),
        organization: formData.get('organization') || 'Qaidah Academy',
        createdAt: new Date().toISOString(),
        isActive: false // Requires approval
    };
    
    // Add to admins
    admins.push(newAdmin);
    localStorage.setItem('qaidahAdmins', JSON.stringify(admins));
    
    // Show success
    showSuccess('Admin account created! Please wait for approval. You will receive an email when activated.');
    
    // Reset form
    event.target.reset();
    
    // Redirect to login after 3 seconds
    setTimeout(() => {
        window.location.href = 'admin-login.html';
    }, 3000);
}

// Check if admin is logged in
function checkAdminAuth() {
    const session = sessionStorage.getItem('adminSession') || localStorage.getItem('adminSession');
    
    if (!session) {
        // Not logged in, redirect to login
        window.location.href = 'admin-login.html';
        return null;
    }
    
    try {
        return JSON.parse(session);
    } catch (e) {
        // Invalid session
        logout();
        return null;
    }
}

// Logout
function logout() {
    sessionStorage.removeItem('adminSession');
    localStorage.removeItem('adminSession');
    window.location.href = 'admin-login.html';
}

// Show Error Message
function showError(message) {
    // Remove existing messages
    document.querySelectorAll('.error-message, .success-message').forEach(el => {
        el.remove();
    });
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message show';
    errorDiv.innerHTML = `<strong>❌ Error:</strong> ${message}`;
    
    const form = document.querySelector('.auth-form');
    form.parentNode.insertBefore(errorDiv, form);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        errorDiv.classList.remove('show');
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}

// Show Success Message
function showSuccess(message) {
    // Remove existing messages
    document.querySelectorAll('.error-message, .success-message').forEach(el => {
        el.remove();
    });
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message show';
    successDiv.innerHTML = `<strong>✅ Success:</strong> ${message}`;
    
    const form = document.querySelector('.auth-form');
    form.parentNode.insertBefore(successDiv, form);
}

// Forgot Password
function forgotPassword() {
    event.preventDefault();
    const email = prompt('Enter your email address:');
    if (email) {
        alert(`Password reset link has been sent to ${email}.\n\nPlease check your email inbox and spam folder.`);
    }
}

// Show Terms
function showTerms() {
    event.preventDefault();
    alert('Terms of Service:\n\n' +
          '1. Use platform for educational purposes only\n' +
          '2. Respect student privacy\n' +
          '3. Upload appropriate content only\n' +
          '4. Maintain account security\n' +
          '5. Follow copyright laws\n\n' +
          'Full terms available at: qaidah.com/terms');
}

// Show Privacy
function showPrivacy() {
    event.preventDefault();
    alert('Privacy Policy:\n\n' +
          '1. We protect your personal data\n' +
          '2. Data stored securely\n' +
          '3. No sharing with third parties\n' +
          '4. You control your data\n' +
          '5. GDPR compliant\n\n' +
          'Full policy at: qaidah.com/privacy');
}

// Password Strength Checker
function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    return strength;
}

// Add password strength indicator on registration page
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    
    if (passwordInput) {
        // Add strength indicator
        const strengthDiv = document.createElement('div');
        strengthDiv.className = 'password-strength';
        strengthDiv.innerHTML = '<div class="password-strength-bar"></div>';
        passwordInput.parentNode.appendChild(strengthDiv);
        
        const strengthText = document.createElement('div');
        strengthText.className = 'password-strength-text';
        passwordInput.parentNode.appendChild(strengthText);
        
        passwordInput.addEventListener('input', (e) => {
            const password = e.target.value;
            const strength = checkPasswordStrength(password);
            const bar = strengthDiv.querySelector('.password-strength-bar');
            
            bar.className = 'password-strength-bar';
            strengthText.className = 'password-strength-text';
            
            if (strength <= 2) {
                bar.classList.add('weak');
                strengthText.classList.add('weak');
                strengthText.textContent = 'Weak password';
            } else if (strength <= 4) {
                bar.classList.add('medium');
                strengthText.classList.add('medium');
                strengthText.textContent = 'Medium strength';
            } else {
                bar.classList.add('strong');
                strengthText.classList.add('strong');
                strengthText.textContent = 'Strong password';
            }
        });
    }
});

// Initialize storage on page load
initAdminStorage();

// Export functions
window.handleAdminLogin = handleAdminLogin;
window.handleAdminRegister = handleAdminRegister;
window.checkAdminAuth = checkAdminAuth;
window.logout = logout;
window.forgotPassword = forgotPassword;
window.showTerms = showTerms;
window.showPrivacy = showPrivacy;

