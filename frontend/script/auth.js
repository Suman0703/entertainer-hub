document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const loginBtnHeader = document.querySelector('header .btn-login');
    const loginLinkSidebarLi = document.querySelector('#sidebar ul li a[href$="login.html"]')?.parentElement;
    const profileLinkNav = document.querySelector('nav ul li a[href$="login.html"]');

    function updateLinkHref(element, targetFile) {
        if (!element) return;
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            element.href = targetFile;
        } else {
            element.href = `pages/${targetFile}`;
        }
    }

    if (token) {
        if (loginBtnHeader) {
            loginBtnHeader.textContent = 'Logout';
            loginBtnHeader.removeAttribute('href');
            loginBtnHeader.style.cursor = 'pointer';
            loginBtnHeader.onclick = logout;
        }

        if (loginLinkSidebarLi) {
            loginLinkSidebarLi.innerHTML = '<a href="#"><h3>LOG OUT</h3></a>';
            loginLinkSidebarLi.onclick = (e) => {
                e.preventDefault();
                logout();
            };
        }

        if (profileLinkNav) {
            updateLinkHref(profileLinkNav, 'profile.html');
            const h2 = profileLinkNav.querySelector('h2');
            if (h2) h2.textContent = 'My Profile';
        }

    } else {
        if (loginBtnHeader) {
            loginBtnHeader.textContent = 'Login';
            updateLinkHref(loginBtnHeader, 'login.html');
            loginBtnHeader.style.cursor = 'pointer';
            loginBtnHeader.onclick = null;
        }

        if (loginLinkSidebarLi) {
             let loginHref = '';
             const currentPath = window.location.pathname;
              if (currentPath.includes('/pages/')) {
                  loginHref = 'login.html';
              } else {
                  loginHref = 'pages/login.html';
              }
             loginLinkSidebarLi.innerHTML = `<a href="${loginHref}"><h3>LOG IN</h3></a>`;
             loginLinkSidebarLi.onclick = null;
        }

         if (profileLinkNav) {
             updateLinkHref(profileLinkNav, 'login.html');
         }

        if (window.location.pathname.endsWith('profile.html')) {
            console.log("Not logged in, redirecting from profile...");
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
    if (confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('token');
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            window.location.href = '../index.html';
        } else {
            window.location.href = 'index.html';
        }
    }
}