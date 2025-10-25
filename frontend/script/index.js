document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.querySelector(".close-btn");

  // Open sidebar
  menuIcon.addEventListener("click", () => {
    sidebar.classList.add("active");
  });

  // Close sidebar when clicking close button
  closeBtn.addEventListener("click", () => {
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
});
