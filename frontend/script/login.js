document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.auth-box form');
    let messageArea = document.getElementById('message-area');
    if (!messageArea && form) {
        messageArea = document.createElement('div');
        messageArea.id = 'message-area';
        messageArea.className = 'message-area';
        form.parentNode.insertBefore(messageArea, form.nextSibling);
        messageArea.style.display = 'none';
        messageArea.style.marginTop = '15px';
        messageArea.style.padding = '10px';
        messageArea.style.borderRadius = '6px';
        messageArea.style.textAlign = 'center';
    }

    const token = localStorage.getItem('token');
    if (token && window.location.pathname.endsWith('login.html')) {
        console.log("Already logged in, redirecting to profile...");
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            window.location.href = 'profile.html';
        } else {
            window.location.href = 'pages/profile.html';
        }
        return;
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = form.querySelector('input[type="email"]');
            const passwordInput = form.querySelector('input[type="password"]');
            const email = emailInput ? emailInput.value : null;
            const password = passwordInput ? passwordInput.value : null;

            if (!email || !password) {
                displayLoginMessage('Please enter both email and password.', 'error');
                return;
            }

            const loginButton = form.querySelector('button[type="submit"]');
            if (loginButton) {
                loginButton.disabled = true;
                loginButton.textContent = 'Logging in...';
            }
            clearLoginMessage();

            try {
                const res = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.msg || `Login Failed: ${res.statusText}`);
                }

                localStorage.setItem('token', data.token);

                console.log("Login successful, redirecting to profile...");
                 const currentPath = window.location.pathname;
                 if (currentPath.includes('/pages/')) {
                     window.location.href = 'profile.html';
                 } else {
                     window.location.href = 'pages/profile.html';
                 }

            } catch (error) {
                console.error('Login error:', error);
                displayLoginMessage(error.message || 'An error occurred. Please try again.', 'error');
                if (loginButton) {
                    loginButton.disabled = false;
                    loginButton.textContent = 'Login';
                }
            }
        });
    } else if (!token && window.location.pathname.endsWith('login.html')) {
        console.warn("Login form (.auth-box form) not found on login.html.");
    }

    function displayLoginMessage(message, type = 'info') {
        if (!messageArea) return;
        messageArea.textContent = message;
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

});