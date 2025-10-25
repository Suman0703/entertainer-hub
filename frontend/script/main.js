document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.querySelector(".close-btn");

  if (menuIcon && sidebar && closeBtn) {
    // Open sidebar
    menuIcon.addEventListener("click", () => {
      sidebar.classList.add("active");
    });

    // Close sidebar with the close button
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent page jump
      sidebar.classList.remove("active");
    });

    // Close sidebar when clicking outside of it
    document.addEventListener("click", (event) => {
      if (
        sidebar.classList.contains("active") &&
        !sidebar.contains(event.target) &&
        !menuIcon.contains(event.target)
      ) {
        sidebar.classList.remove("active");
      }
    });
  }
});