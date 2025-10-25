document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.querySelector(".close-btn");
  const container = document.getElementById("tracks-container");
  const genreButtons = document.querySelectorAll(".genre-filter button");

  // Sidebar toggle
  menuIcon.addEventListener("click", () => sidebar.classList.add("active"));
  closeBtn.addEventListener("click", () => sidebar.classList.remove("active"));
  document.addEventListener("click", (e) => {
    if (sidebar.classList.contains("active") && !sidebar.contains(e.target) && !menuIcon.contains(e.target)) {
      sidebar.classList.remove("active");
    }
  });

  // Music Data: sample tracks per genre (replace audio src with your files)
  const tracks = {
    lofi: [
      { title: "Chill Lo-Fi 1", desc: "Relaxing lo-fi beats.", audio: "/Frontend/media/lofi1.mp3" },
      { title: "Chill Lo-Fi 2", desc: "Study with smooth beats.", audio: "/Frontend/media/lofi2.mp3" },
    ],
    piano: [
      { title: "Piano Calm 1", desc: "Soft piano melody.", audio: "/Frontend/media/piano1.mp3" },
      { title: "Piano Calm 2", desc: "Peaceful piano background.", audio: "/Frontend/media/piano2.mp3" },
    ],
    ambient: [
      { title: "Ambient Flow 1", desc: "Deep ambient tones.", audio: "/Frontend/media/ambient1.mp3" },
      { title: "Ambient Flow 2", desc: "Dreamy atmosphere.", audio: "/Frontend/media/ambient2.mp3" },
    ],
    nature: [
      { title: "Forest Sounds", desc: "Birds and wind in the forest.", audio: "/Frontend/media/nature1.mp3" },
      { title: "Ocean Waves", desc: "Calm sea waves crashing.", audio: "/Frontend/media/nature2.mp3" },
    ],
    rain: [
      { title: "Rain on Window", desc: "Soft rain with cozy vibes.", audio: "/Frontend/media/rain1.mp3" },
      { title: "Stormy Night", desc: "Thunder and heavy rain.", audio: "/Frontend/media/rain2.mp3" },
    ],
    focus: [
      { title: "Focus Beats 1", desc: "Stay productive with beats.", audio: "/Frontend/media/focus1.mp3" },
      { title: "Focus Beats 2", desc: "Concentration mode on.", audio: "/Frontend/media/focus2.mp3" },
    ],
  };

  // Render tracks dynamically
  function renderTracks(genre) {
    container.innerHTML = "";
    tracks[genre].forEach(track => {
      const card = document.createElement("div");
      card.className = "track-card";
      card.innerHTML = `
        <h2>${track.title}</h2>
        <p>${track.desc}</p>
        <audio controls>
          <source src="${track.audio}" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      `;
      container.appendChild(card);
    });
    revealCards();
  }

  // Genre button click
  genreButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      genreButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderTracks(btn.dataset.genre);
    });
  });

  // Animate track cards
  function revealCards() {
    const trackCards = document.querySelectorAll('.track-card');
    trackCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', revealCards);

  // Initial load
  renderTracks("lofi");
});
