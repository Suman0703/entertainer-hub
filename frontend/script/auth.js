document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const loginBtnHeader = document.querySelector('header .btn-login');
    // Select sidebar link specifically targeting login.html initially
    const loginLinkSidebarLi = document.querySelector('#sidebar ul li a[href$="login.html"]')?.parentElement;
    // Select nav link specifically targeting login.html initially
    const profileLinkNav = document.querySelector('nav ul li a[href$="login.html"]');


    function updateLinkHref(element, targetFile) {
        if (!element) return;
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            element.href = targetFile; // e.g., 'profile.html' or 'login.html'
        } else {
            element.href = `pages/${targetFile}`; // e.g., 'pages/profile.html' or 'pages/login.html'
        }
    }

    if (token) {
        // --- User is logged in ---

        // 1. Change header button to "Logout"
        if (loginBtnHeader) {
            loginBtnHeader.textContent = 'Logout';
            loginBtnHeader.removeAttribute('href');
            loginBtnHeader.style.cursor = 'pointer';
            // Use event delegation or ensure listener is added correctly
            loginBtnHeader.onclick = logout; // Simple assignment, might need adjustment
        }

        // 2. Change sidebar link to "LOG OUT"
        if (loginLinkSidebarLi) {
            loginLinkSidebarLi.innerHTML = '<a href="#"><h3>LOG OUT</h3></a>';
            loginLinkSidebarLi.onclick = (e) => { // Add listener to LI
                e.preventDefault();
                logout();
            };
        }

        // 3. Ensure "My Profile" link in nav points to profile.html
        if (profileLinkNav) {
            updateLinkHref(profileLinkNav, 'profile.html');
            // Ensure text is "My Profile"
            const h2 = profileLinkNav.querySelector('h2');
            if (h2) h2.textContent = 'My Profile';
        }

    } else {
        // --- User is logged out ---
        // Ensure header button says "Login" and links correctly
        if (loginBtnHeader) {
            loginBtnHeader.textContent = 'Login';
            updateLinkHref(loginBtnHeader, 'login.html');
            loginBtnHeader.style.cursor = 'pointer';
            loginBtnHeader.onclick = null; // Remove logout listener if it existed
        }

        // Ensure sidebar link says "LOG IN" and links correctly
        if (loginLinkSidebarLi) {
            let loginHref = '';
            const currentPath = window.location.pathname;
            if (currentPath.includes('/pages/')) {
                loginHref = 'login.html';
            } else {
                loginHref = 'pages/login.html';
            }
            loginLinkSidebarLi.innerHTML = `<a href="${loginHref}"><h3>LOG IN</h3></a>`;
            loginLinkSidebarLi.onclick = null; // Remove logout listener
        }

        // Ensure nav link says "Login" (or keep My Profile?) and links correctly
        if (profileLinkNav) {
            updateLinkHref(profileLinkNav, 'login.html');
            // Optionally change text back if needed
            // const h2 = profileLinkNav.querySelector('h2');
            // if(h2) h2.textContent = 'Login';
        }

        // --- Redirect away from profile page if not logged in ---
        // Check if the current page IS the profile page
        if (window.location.pathname.endsWith('profile.html')) {
            console.log("Not logged in, redirecting from profile...");
            // Determine correct path to login page
            const currentPath = window.location.pathname;
            if (currentPath.includes('/pages/')) {
                window.location.href = 'login.html';
            } else {
                window.location.href = 'pages/login.html';
            }
        }
    }
});

function logout() {
    // Check for confirmation before logging out
    if (confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('token');
        // Redirect to homepage
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            window.location.href = '../index.html';
        } else {
            window.location.href = 'index.html';
        }
    }
}