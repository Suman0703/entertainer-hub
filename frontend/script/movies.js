document.addEventListener("DOMContentLoaded", () => {
    const moviesContainer = document.getElementById("movies-container");
    // CRITICAL FIX: Use the new ID selector
    const genreFilter = document.getElementById("genre-filter-buttons"); 
    const JWT_TOKEN = localStorage.getItem('token'); 
    const USER_LIST_API = 'http://localhost:5000/api/users/movie-list'; 

    // --- Movie Data (Organized by Genre) ---
    const moviesData = {
        "Action": [
            { id: "A1", title: "The Rogue Agent", description: "A thrilling tale of espionage and high-stakes action.", director: "J.J. Abrams", year: 2022 },
            { id: "A2", title: "Cybernetic Showdown", description: "Future tech vs. rogue AI in an epic battle.", director: "Lana Wachowski", year: 2023 },
            { id: "A3", title: "Desert Strike", description: "Elite soldiers on a mission in a hostile desert.", director: "Michael Bay", year: 2021 },
            { id: "A4", title: "Urban Pursuit", description: "A detective chases a elusive criminal through a bustling city.", director: "Christopher Nolan", year: 2020 },
            { id: "A5", title: "Space Anomaly", description: "Astronauts encounter an unknown force in deep space.", director: "Denis Villeneuve", year: 2023 },
            { id: "A6", title: "Gladiators of Rome", description: "Ancient Roman warriors fight for freedom.", director: "Ridley Scott", year: 2000 },
            { id: "A7", title: "Ninja Shadow", description: "A skilled ninja protects a village from invaders.", director: "Takeshi Kitano", year: 2005 },
            { id: "A8", title: "Arctic Blast", description: "Survival in extreme cold against formidable foes.", director: "Roland Emmerich", year: 2010 },
            { id: "A9", title: "Drone Warfare", description: "High-tech military operations with autonomous drones.", director: "Kathryn Bigelow", year: 2015 },
            { id: "A10", title: "Submarine Escape", description: "A daring escape from a sunken submarine.", director: "Wolfgang Petersen", year: 2018 }
        ],
        "Romance": [
            { id: "R1", title: "Love's First Bloom", description: "A charming story of unexpected love in a small town.", director: "Richard Linklater", year: 2019 },
            { id: "R2", title: "Starlight Serenade", description: "Two musicians fall in love under the city lights.", director: "Damien Chazelle", year: 2021 },
            { id: "R3", title: "The Coffee Shop Date", description: "A classic meet-cute with a modern twist.", director: "Nora Ephron", year: 2020 },
            { id: "R4", title: "Whispers of the Heart", description: "A poignant tale of lost and found love.", director: "Joe Wright", year: 2018 },
            { id: "R5", title: "Seaside Rendezvous", description: "Summer love blossoms on a beautiful coastline.", director: "Nancy Meyers", year: 2023 },
            { id: "R6", title: "Letters to Juliet", description: "An American girl finds a letter in Verona.", director: "Gary Winick", year: 2010 },
            { id: "R7", title: "The Notebook", description: "A passionate summer love affair.", director: "Nick Cassavetes", year: 2004 },
            { id: "R8", title: "La La Land", description: "An aspiring actress and a jazz musician fall in love in Los Angeles.", director: "Damien Chazelle", year: 2016 },
            { id: "R9", title: "When Harry Met Sally...", description: "Can men and women ever just be friends?", director: "Rob Reiner", year: 1989 },
            { id: "R10", title: "Pride & Prejudice", description: "Elizabeth Bennet deals with issues of manners, upbringing, morality, and marriage.", director: "Joe Wright", year: 2005 }
        ],
        "Comedy": [
            { id: "C1", title: "Mistaken Identity", description: "A hilarious mix-up leads to unexpected adventures.", director: "Adam Sandler", year: 2022 },
            { id: "C2", "title": "The Big Vacation", description: "A family vacation goes hilariously wrong.", director: "Todd Phillips", year: 2023 },
            { id: "C3", "title": "Office Pranks", description: "Workplace antics get out of hand in this laugh-out-loud comedy.", director: "Judd Apatow", year: 2021 },
            { id: "C4", "title": "Stand-Up Guy", description: "An aspiring comedian tries to make it big.", director: "Seth Rogen", year: 2020 },
            { id: "C5", "title": "Pet Sitter Chaos", description: "A wild weekend with mischievous pets.", director: "Paul Feig", year: 2019 },
            { id: "C6", "title": "Anchorman", description: "Ron Burgundy and his news team in 1970s San Diego.", director: "Adam McKay", year: 2004 },
            { id: "C7", "title": "Superbad", description: "Two co-dependent high school seniors are forced to deal with separation.", director: "Greg Mottola", year: 2007 },
            { id: "C8", "title": "Dumb and Dumber", description: "Two good-hearted but incredibly stupid friends.", director: "Peter Farrelly", year: 1994 },
            { id: "C9", "title": "The Hangover", description: "Three friends wake up from a bachelor party in Las Vegas.", director: "Todd Phillips", year: 2009 },
            { id: "C10", "title": "Booksmart", description: "Two academic superstars realize they should have worked less and played more.", director: "Olivia Wilde", year: 2019 }
        ],
        "Horror": [
            { id: "H1", title: "The Silent Woods", description: "A group of friends gets lost in a forest with a dark secret.", director: "Ari Aster", year: 2022 },
            { id: "H2", title: "Whispers in the Dark", description: "An old house holds terrifying secrets.", director: "James Wan", year: 2023 },
            { id: "H3", title: "Cursed Lake", description: "A serene lake hides an ancient evil.", director: "Robert Eggers", year: 2021 },
            { id: "H4", title: "The Midnight Caller", description: "A mysterious caller terrorizes a lone resident.", director: "Jordan Peele", year: 2020 },
            { id: "H5", title: "Shadows of the Past", description: "A haunting tale of revenge from beyond the grave.", director: "Mike Flanagan", year: 2019 },
            { id: "H6", "title": "Hereditary", description: "A family is haunted by a mysterious presence.", director: "Ari Aster", year: 2018 },
            { id: "H7", "title": "Get Out", description: "A young African-American man visits his white girlfriend's mysterious family estate.", director: "Jordan Peele", year: 2017 },
            { id: "H8", "title": "The Babadook", description: "A single mother and her son are haunted by a monster from a children's book.", director: "Jennifer Kent", year: 2014 },
            { id: "H9", "title": "Psycho", description: "A secretary embezzles money and checks into a remote motel.", director: "Alfred Hitchcock", year: 1960 },
            { id: "H10", "title": "The Conjuring", description: "Paranormal investigators Ed and Lorraine Warren work to help a family.", director: "James Wan", year: 2013 }
        ],
        "Thriller": [
            { id: "T1", title: "The Cipher", description: "A cryptographer races against time to decode a deadly message.", director: "David Fincher", year: 2022 },
            { id: "T2", title: "Blind Spot", description: "A detective uncovers a conspiracy too close to home.", director: "Taylor Sheridan", year: 2023 },
            { id: "T3", title: "The Escape Route", description: "A man wrongly accused must find a way to clear his name.", director: "Denis Villeneuve", year: 2021 },
            { id: "T4", title: "Deep Cover", description: "An undercover agent gets too deep in the criminal underworld.", director: "Michael Mann", year: 2020 },
            { id: "T5", title: "The Hostage Negotiator", description: "A skilled negotiator faces a complex hostage situation.", director: "Steven Spielberg", year: 2019 },
            { id: "T6", "title": "Se7en", description: "Two detectives hunt a serial killer who uses the seven deadly sins.", director: "David Fincher", year: 1995 },
            { id: "T7", "title": "Silence of the Lambs", description: "A young FBI cadet seeks the advice of a cannibalistic killer.", director: "Jonathan Demme", year: 1991 },
            { id: "T8", "title": "Prisoners", description: "When his daughter and her friend go missing, a father takes matters into his own hands.", director: "Denis Villeneuve", year: 2013 },
            { id: "T9", "title": "The Fugitive", description: "A doctor goes on the run after being wrongly convicted of his wife's murder.", director: "Andrew Davis", year: 1993 },
            { id: "T10", "title": "Parasite", description: "A poor family schemes to become employed by a wealthy family.", director: "Bong Joon-ho", year: 2019 }
        ],
        "Sci-Fi": [
            { id: "SF1", title: "Nebula's Edge", description: "Explorers venture into an uncharted nebula with strange phenomena.", director: "James Cameron", year: 2022 },
            { id: "SF2", title: "Temporal Shift", description: "Time travelers accidentally alter history.", director: "Rian Johnson", year: 2023 },
            { id: "SF3", title: "Exo-Planet Colony", description: "Life on a new planet faces unexpected challenges.", director: "Gareth Edwards", year: 2021 },
            { id: "SF4", title: "Synthetic Dawn", description: "Androids gain sentience and challenge humanity.", director: "Alex Garland", year: 2020 },
            { id: "SF5", title: "The Void Gate", description: "Scientists discover a portal to another dimension.", director: "Christopher Nolan", year: 2019 },
            { id: "SF6", "title": "Blade Runner 2049", description: "A new blade runner uncovers a long-buried secret.", director: "Denis Villeneuve", year: 2017 },
            { id: "SF7", "title": "Dune", description: "Paul Atreides leads a galactic empire on a desert planet.", director: "Denis Villeneuve", year: 2021 },
            { id: "SF8", "title": "Arrival", description: "Linguist Louise Banks is recruited by the military to communicate with alien lifeforms.", director: "Denis Villeneuve", year: 2016 },
            { id: "SF9", "title": "Interstellar", description: "Explorers travel through a wormhole in search of a new home.", director: "Christopher Nolan", year: 2014 },
            { id: "SF10", "title": "Inception", description: "A thief who steals information by entering people's dreams.", director: "Christopher Nolan", year: 2010 }
        ]
    };

    let currentGenre = "Action"; 
    let userMovieIdSet = new Set(); 
    
    // --- Helper Functions ---
    
    async function fetchUserMovieIds() {
        if (!JWT_TOKEN) return;

        try {
            const response = await fetch(USER_LIST_API, {
                headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
            });

            if (response.ok) {
                const data = await response.json();
                userMovieIdSet = new Set(data.movieList.map(movie => movie.movieId));
            } else {
                console.warn("Could not fetch user list. Status:", response.status);
            }
        } catch (error) {
            console.error("Network error fetching movie list:", error);
        }
    }
    
    // --- Render Genre Filter Buttons ---
    function renderGenreButtons() {
        genreFilter.innerHTML = '';
        const genres = Object.keys(moviesData);
        genres.push("MyList"); // Add MyList button

        genres.forEach(genre => {
            const button = document.createElement('button');
            button.textContent = genre.replace(/([A-Z])/g, ' $1').trim(); // Add space before capitals (e.g., Sci-Fi)
            button.dataset.genre = genre;
            if (genre === currentGenre) {
                button.classList.add('active');
            }
            genreFilter.appendChild(button);
        });
        
        // Add event listener to the parent element for delegation
        genreFilter.addEventListener('click', (event) => {
            const button = event.target.closest('button');
            if (!button) return;
            
            const genre = button.dataset.genre;

            document.querySelectorAll('.genre-filter button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            if (genre === "MyList") {
                renderMyList();
            } else {
                currentGenre = genre;
                renderMovies(currentGenre);
            }
        });
    }
    
    // --- Render Movie Cards for a Given Genre ---
    function renderMovies(genre) {
        moviesContainer.innerHTML = ''; 
        const movies = moviesData[genre];

        if (!movies || movies.length === 0) {
            moviesContainer.innerHTML = `<p style="text-align:center; padding: 50px;">No movies found for ${genre} genre.</p>`;
            return;
        }

        movies.forEach(movie => {
            const isAdded = userMovieIdSet.has(movie.id);
            
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            
            let buttonText = isAdded ? 'Added to List' : 'Add to List';
            let buttonClass = isAdded ? 'added-btn' : 'add-to-list-btn';
            let buttonDisabled = isAdded ? 'disabled' : '';

            movieCard.innerHTML = `
                <div class="movie-info">
                    <h2>${movie.title}</h2>
                    <p class="movie-description">${movie.description}</p>
                    <p class="movie-meta">Director: ${movie.director} | Year: ${movie.year}</p>
                    <button class="${buttonClass}" 
                            data-movie-id="${movie.id}" 
                            data-movie-title="${movie.title}" 
                            data-movie-genre="${genre}"
                            ${buttonDisabled}
                            >${buttonText}</button>
                    <span class="add-to-list-feedback"></span>
                </div>
            `;
            moviesContainer.appendChild(movieCard);
        });

        // Add event listeners only to active buttons
        document.querySelectorAll('.add-to-list-btn').forEach(button => {
            button.addEventListener('click', handleAddToList);
        });
    }

    // --- Render User's Movie List (When MyList button is clicked) ---
    async function renderMyList() {
        if (!JWT_TOKEN) {
            moviesContainer.innerHTML = `
                <div class="movie-list-message">
                    <p>Please log in to view your Movie List.</p>
                    <a href="login.html" class="add-to-list-btn" style="display: inline-block;">Log In Now</a>
                </div>
            `;
            return;
        }

        moviesContainer.innerHTML = '<p style="text-align:center; padding: 50px;">Loading your movie list...</p>';

        try {
            const response = await fetch(USER_LIST_API, {
                headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
            });

            const data = await response.json();
            const movieList = data.movieList;

            if (movieList.length === 0) {
                moviesContainer.innerHTML = '<p style="text-align:center; padding: 50px;">Your list is empty. Start adding movies!</p>';
                return;
            }

            moviesContainer.innerHTML = ''; 

            movieList.forEach(movie => {
                const listItem = document.createElement('div');
                listItem.className = 'movie-card my-list-card'; 
                listItem.innerHTML = `
                    <div class="movie-info">
                        <h2>${movie.title}</h2>
                        <p class="movie-description">Genre: ${movie.genre}</p>
                        <p class="movie-meta">Added on: ${new Date(movie.addedAt).toLocaleDateString()}</p>
                        <button class="remove-from-list-btn" data-movie-id="${movie.movieId}">Remove from List</button>
                    </div>
                `;
                moviesContainer.appendChild(listItem);
            });
            
            userMovieIdSet = new Set(movieList.map(movie => movie.movieId));

            document.querySelectorAll('.remove-from-list-btn').forEach(button => {
                button.addEventListener('click', handleRemoveFromList);
            });

        } catch (error) {
            console.error('Error fetching movie list:', error);
            moviesContainer.innerHTML = `<p style="text-align:center; color:red; padding: 50px;">Error: ${error.message}</p>`;
        }
    }


    // --- Handle "Add to List" Click ---
    async function handleAddToList(event) {
        const button = event.target;
        const movieId = button.dataset.movieId;
        const movieTitle = button.dataset.movieTitle;
        const movieGenre = button.dataset.movieGenre;
        const feedbackSpan = button.nextElementSibling;

        if (!JWT_TOKEN) {
            // Logic to handle redirection is already in the main block
            return;
        }

        button.disabled = true;
        feedbackSpan.textContent = 'Adding...';

        try {
            const response = await fetch(USER_LIST_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JWT_TOKEN}`
                },
                body: JSON.stringify({ movieId, title: movieTitle, genre: movieGenre })
            });

            const data = await response.json();

            if (response.ok) {
                // **PERSISTENT SUCCESS STATE**
                feedbackSpan.textContent = '';
                button.textContent = 'Added to List';
                button.classList.remove('add-to-list-btn');
                button.classList.add('added-btn'); // New persistent class
                userMovieIdSet.add(movieId); // Update cached set
            } else {
                feedbackSpan.textContent = `❌ ${data.msg || 'Failed to add!'}`;
                feedbackSpan.style.color = '#dc3545';
                button.disabled = false;
            }
        } catch (error) {
            console.error('Error adding movie to list:', error);
            feedbackSpan.textContent = '❌ Network error!';
            feedbackSpan.style.color = '#dc3545';
            button.disabled = false;
        } finally {
            // Clear temporary feedback span after error
             if (!response.ok) {
                 setTimeout(() => { feedbackSpan.textContent = ''; }, 3000); 
             }
        }
    }
    
    // --- Handle "Remove from List" Click (Used in MyList view) ---
    async function handleRemoveFromList(event) {
        const button = event.target;
        const movieId = button.dataset.movieId;
        const card = button.closest('.movie-card'); 

        if (!confirm('Are you sure you want to remove this movie?')) {
            return;
        }

        button.disabled = true;
        button.textContent = 'Removing...';

        try {
            const response = await fetch(`${USER_LIST_API}/${movieId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
            });

            if (response.ok) {
                // Remove from local cache and DOM
                userMovieIdSet.delete(movieId);
                if (card) {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.remove();
                        // Re-render the list if it's currently showing MyList
                        if (moviesContainer.children.length === 0 || document.querySelector('.genre-filter button[data-genre="MyList"]').classList.contains('active')) {
                            renderMyList();
                        }
                    }, 300);
                }
            } else {
                const data = await response.json();
                alert(`Error removing movie: ${data.msg || 'Server failed.'}`);
                button.disabled = false;
                button.textContent = 'Remove from List';
            }
        } catch (error) {
            console.error('Error removing movie:', error);
            alert('Network error during removal.');
            button.disabled = false;
            button.textContent = 'Remove from List';
        }
    }


    // --- Initialization ---
    // 1. Fetch user's list and cache IDs
    fetchUserMovieIds().then(() => {
        // 2. Render buttons and default view only after IDs are cached
        renderGenreButtons();
        renderMovies(currentGenre);
    });
});