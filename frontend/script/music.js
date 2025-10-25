document.addEventListener("DOMContentLoaded", () => {
    // --- Configuration ---
    const API_MUSIC_URL = 'http://localhost:5000/api/music';
    const tracksContainer = document.getElementById("tracks-container");
    const genreCards = document.querySelectorAll(".music-library-grid .genre-card");
    const selectedGenreTitle = document.getElementById("selected-genre-title");
    const playAllButton = document.querySelector(".hero-play-button"); // <-- Get the button

    // --- Error Check ---
    if (!tracksContainer || !selectedGenreTitle) {
        console.error("CRITICAL ERROR: Essential elements ('tracks-container' or 'selected-genre-title') not found!");
        return;
    }
    // ... (rest of the error checks) ...

    // --- Initial State ---
    let currentGenre = genreCards.length > 0 ? genreCards[0].dataset.genre : 'lofi';
    let currentGenreName = genreCards.length > 0 ? genreCards[0].querySelector('.genre-info h3')?.textContent || 'Default Genre' : 'Lo-fi Beats';
    let currentTracks = []; // <-- Store the currently displayed tracks

    // --- Dynamic Track Rendering ---
    function renderTracks(genreName, tracks) {
        selectedGenreTitle.textContent = `Selected Genre: ${genreName}`;
        tracksContainer.innerHTML = ""; // Clear previous
        currentTracks = tracks; // <-- Store tracks for Play All

        if (!tracks || tracks.length === 0) {
            tracksContainer.innerHTML = `<p class="error-message" style="text-align:center;">No tracks found for ${genreName}.</p>`;
            return;
        }

        tracks.forEach((track, index) => { // <-- Added index
            const card = document.createElement("div");
            card.className = "track-card";
            // Add an ID to the iframe to target it
            const iframeId = `Youtubeer-${index}`;
            card.innerHTML = `
                <h2>${track.title || 'Untitled Track'}</h2>
                <p>Channel: ${track.channel || 'Unknown Channel'}</p>
                <div class="video-embed-container">
                    <iframe
                        id="${iframeId}"
                        width="100%"
                        height="auto"
                        src="${track.embedUrl}&enablejsapi=1" 
                        title="YouTube video player for ${track.title || 'Untitled Track'}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                    </iframe>
                </div>
            `;
            tracksContainer.appendChild(card);
        });
    }

    // --- Main Fetch Function ---
    async function fetchTracks(genre, genreName) {
        selectedGenreTitle.textContent = `Loading: ${genreName}...`;
        tracksContainer.innerHTML = '<p class="loading-message" style="text-align:center;">Loading tracks...</p>';
        currentTracks = []; // Clear tracks while loading

        try {
            const url = `${API_MUSIC_URL}?genre=${encodeURIComponent(genre)}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || `Failed to fetch data (Status: ${response.status})`);
            }

            renderTracks(genreName, data);

        } catch (error) {
            console.error('Error fetching music:', error);
            selectedGenreTitle.textContent = `Error Loading: ${genreName}`;
            tracksContainer.innerHTML = `<p class="error-message" style="text-align:center;">Error: Could not load music. ${error.message}</p>`;
        }
    }

    // --- Genre Card Click Handler ---
    if (genreCards.length > 0) {
        genreCards.forEach(card => {
            card.addEventListener("click", () => {
                genreCards.forEach(c => c.classList.remove("active"));
                card.classList.add("active");

                const genre = card.dataset.genre;
                const genreNameElement = card.querySelector('.genre-info h3');
                const genreName = genreNameElement ? genreNameElement.textContent : 'Selected Genre';

                if (genre) {
                    currentGenre = genre;
                    currentGenreName = genreName;
                    fetchTracks(currentGenre, currentGenreName);
                } else {
                    console.error("Clicked genre card is missing 'data-genre' attribute.");
                }
            });
        });
    }

    // --- Play All Button Functionality ---
    if (playAllButton) {
        playAllButton.addEventListener('click', () => {
            // Find the first iframe in the container
            const firstIframe = tracksContainer.querySelector('iframe');

            if (firstIframe && firstIframe.contentWindow) {
                // Send a 'playVideo' command using postMessage
                // This is a simpler way than loading the full IFrame Player API
                firstIframe.contentWindow.postMessage(
                    '{"event":"command","func":"playVideo","args":""}',
                    '*' // Allow message to be sent to any origin (YouTube's domain)
                );
                // Scroll to the tracks section smoothly
                 selectedGenreTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                if (currentTracks.length > 0) {
                     alert("Could not play the video. Please try again after tracks are fully loaded.");
                } else {
                    alert("Please select a genre first to load tracks.");
                }
            }
        });
    }

    // --- Initial Load ---
    if (genreCards.length > 0) {
        genreCards[0].classList.add('active');
    }
    fetchTracks(currentGenre, currentGenreName);
});