document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.auth-box form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const fullName = form.querySelector('input[placeholder="Full Name"]').value;
        const age = form.querySelector('input[placeholder="Age"]').value;
        const username = form.querySelector('input[placeholder="Username"]').value;
        const mobileNumber = form.querySelector('input[placeholder="Mobile Number"]').value;
        const email = form.querySelector('input[placeholder="Email Address"]').value;
        const password = form.querySelector('input[placeholder="Password"]').value;

        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName,
                    age,
                    username,
                    mobileNumber,
                    email,
                    password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                // If there's an error message from the server, show it
                alert(`Error: ${data.msg || 'Something went wrong!'}`);
            } else {
                // On success, save token and redirect
                localStorage.setItem('token', data.token);
                alert('Registration successful! Redirecting to login...');
                window.location.href = 'login.html';
            }

        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});