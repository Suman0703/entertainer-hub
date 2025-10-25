document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.auth-box form'); // Ensure this selector matches your login form
    // Create a message area dynamically if it doesn't exist
    let messageArea = document.getElementById('message-area');
    if (!messageArea && form) {
        messageArea = document.createElement('div');
        messageArea.id = 'message-area';
        messageArea.className = 'message-area'; // Add base class for potential common styling
        form.parentNode.insertBefore(messageArea, form.nextSibling); // Insert after the form
        messageArea.style.display = 'none'; // Hide initially
         messageArea.style.marginTop = '15px'; // Add some spacing
         messageArea.style.padding = '10px';
         messageArea.style.borderRadius = '6px';
         messageArea.style.textAlign = 'center';
    }


    // --- Redirect if already logged in ---
    const token = localStorage.getItem('token');
    // Check if we are actually on the login page before redirecting
    if (token && window.location.pathname.endsWith('login.html')) {
        console.log("Already logged in, redirecting to profile...");
        // Determine correct path relative to current location
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            window.location.href = 'profile.html'; // Already in pages folder
        } else {
            window.location.href = 'pages/profile.html'; // Need to go into pages folder
        }
        return; // Stop further execution on this page
    }


    // --- Handle Login Form Submission ---
    if (form) { // Only add listener if the login form exists on this page
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent page reload

            const emailInput = form.querySelector('input[type="email"]');
            const passwordInput = form.querySelector('input[type="password"]');
            const email = emailInput ? emailInput.value : null;
            const password = passwordInput ? passwordInput.value : null;

            // Basic validation
            if (!email || !password) {
                displayLoginMessage('Please enter both email and password.', 'error');
                return;
            }

            const loginButton = form.querySelector('button[type="submit"]');
            if (loginButton) {
                loginButton.disabled = true;
                loginButton.textContent = 'Logging in...';
            }
            clearLoginMessage(); // Clear previous messages

            try {
                const res = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();

                if (!res.ok) {
                    // Use error message from backend if available
                    throw new Error(data.msg || `Login Failed: ${res.statusText}`);
                }

                // *** LOGIN SUCCESS ***
                // 1. Store the token received from the backend
                localStorage.setItem('token', data.token);

                // 2. Redirect to the profile page
                //    profile.js on that page will handle fetching user data.
                console.log("Login successful, redirecting to profile...");
                // Determine correct path relative to current location
                 const currentPath = window.location.pathname;
                 if (currentPath.includes('/pages/')) {
                     window.location.href = 'profile.html'; // Already in pages folder
                 } else {
                     window.location.href = 'pages/profile.html'; // Need to go into pages folder
                 }
                // No alert needed, the page navigation handles it.

            } catch (error) {
                console.error('Login error:', error);
                displayLoginMessage(error.message || 'An error occurred. Please try again.', 'error');
                // Re-enable the button if login fails
                if (loginButton) {
                    loginButton.disabled = false;
                    loginButton.textContent = 'Login';
                }
            }
        });
    } else if (!token && window.location.pathname.endsWith('login.html')) {
        // Only warn if we are on the login page and the form isn't found
        console.warn("Login form (.auth-box form) not found on login.html.");
    }

    // --- Helper functions for messages on login page ---
    function displayLoginMessage(message, type = 'info') {
        if (!messageArea) return; // Don't try if messageArea doesn't exist
        messageArea.textContent = message;
        // Basic styling for error/success messages
        if (type === 'error') {
            messageArea.style.backgroundColor = '#fdeded';
            messageArea.style.color = '#c0392b';
            messageArea.style.border = '1px solid #e74c3c';
        } else if (type === 'success') {
             messageArea.style.backgroundColor = '#e0f2f1';
             messageArea.style.color = '#0d2c1f';
             messageArea.style.border = '1px solid #4ad991';
        } else {
             messageArea.style.backgroundColor = '#e0e0e0';
             messageArea.style.color = '#333';
             messageArea.style.border = '1px solid #ccc';
        }
        messageArea.style.display = 'block';
    }
    function clearLoginMessage() {
        if (!messageArea) return;
        messageArea.textContent = '';
        messageArea.style.display = 'none';
    }

}); // End DOMContentLoaded