document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const authApiUrl = 'http://localhost:5000/api/auth/me';
    const userListApiUrl = 'http://localhost:5000/api/users/movie-list';

    // DOM Elements
    const summaryAvatar = document.getElementById('summary-avatar');
    const summaryFullname = document.getElementById('summary-fullname');
    const summaryEmail = document.getElementById('summary-email');
    const detailsAvatar = document.getElementById('details-avatar');
    const detailsUsernameHeader = document.getElementById('details-username');
    const detailsEmailDisplay = document.getElementById('details-email-display');
    const editButton = document.getElementById('edit-button');
    const profileForm = document.getElementById('profile-form');
    const usernameInput = document.getElementById('profile-username');
    const emailInput = document.getElementById('profile-email');
    const mobileInput = document.getElementById('profile-mobile');
    const fullnameDisplayInput = document.getElementById('profile-fullname-display');
    const pictureUrlInput = document.getElementById('profile-picture-url');
    const memberSinceInput = document.getElementById('profile-member-since');
    const formActions = document.querySelector('.form-actions');
    const saveButton = document.querySelector('.btn-save-changes');
    const cancelButton = document.getElementById('cancel-button');
    const messageArea = document.getElementById('message-area');
    const logoutButton = document.getElementById('logout-button');
    const navItems = document.querySelectorAll('.profile-nav-card .nav-item');
    const profileDetailsCard = document.getElementById('profile-details-card');
    const myListCard = document.getElementById('my-list-card');
    const myMovieListContainer = document.getElementById('my-movie-list-container');
    const movieListFeedback = document.getElementById('movie-list-feedback');

    // State Variables
    let currentUserData = {};
    let isEditing = false;

    // Initial Check
    if (!token) {
        const currentPath = window.location.pathname;
         if (currentPath.includes('/pages/')) {
             window.location.href = 'login.html';
         } else {
             window.location.href = 'pages/login.html';
         }
        return;
    }

    // Data Fetching
    async function fetchUserProfileAndList() {
        showLoadingState(true);
        try {
            const profileRes = await fetch(authApiUrl, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!profileRes.ok) {
                if (profileRes.status === 401) {
                    logoutUser();
                    return;
                }
                throw new Error(`Failed to fetch profile: ${profileRes.statusText}`);
            }

            const user = await profileRes.json();
            currentUserData = { ...user };
            populateProfileData(user);
            
            await fetchAndDisplayMovieList();

        } catch (error) {
            console.error('Error during initial fetch:', error);
            displayMessage('Failed to load profile data.', 'error');
        } finally {
            showLoadingState(false);
            switchContent('profile-details-card');
        }
    }

    // Data Population
    function populateProfileData(user) {
        const profilePic = user.profilePictureUrl || '../media/profile-placeholder.jpg';
        
        [summaryAvatar, detailsAvatar].forEach(img => img.src = profilePic);
        summaryFullname.textContent = user.fullName || 'N/A';
        summaryEmail.textContent = user.email || 'N/A';
        detailsUsernameHeader.textContent = user.username || 'N/A';
        detailsEmailDisplay.textContent = user.email || 'N/A';

        usernameInput.value = user.username || '';
        emailInput.value = user.email || '';
        mobileInput.value = user.mobileNumber || '';
        fullnameDisplayInput.value = user.fullName || '';
        pictureUrlInput.value = (user.profilePictureUrl === '../media/profile-placeholder.jpg') ? '' : user.profilePictureUrl;
        memberSinceInput.value = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A';
        
        updateAvatarPreview(pictureUrlInput.value);
    }
    
    function updateAvatarPreview(url) {
        const newSrc = (!url || url === '../media/profile-placeholder.jpg') ? '../media/profile-placeholder.jpg' : url;
         [summaryAvatar, detailsAvatar].forEach(img => img.src = newSrc);
    }
    
    function showLoadingState(isLoading) {
        if (isLoading) {
             // Optionally add loading indicators
        }
    }

    // Movie List Functions
    async function fetchAndDisplayMovieList() {
        myMovieListContainer.innerHTML = '<p style="text-align:center;">Loading your movie list...</p>';
        movieListFeedback.textContent = '';

        try {
            const response = await fetch(userListApiUrl, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                console.error("Failed to fetch movie list API. Status:", response.status);
                myMovieListContainer.innerHTML = '<p style="text-align:center; color:red;">Failed to load movie list. Check server and login status.</p>';
                return;
            }

            const data = await response.json();
            const movieList = data.movieList;

            if (movieList.length === 0) {
                myMovieListContainer.innerHTML = '<p style="text-align:center;">Your list is empty. Add some movies from the <a href="movies.html" style="color:#4ad991; text-decoration:underline;">Movies page</a>!</p>';
                return;
            }

            myMovieListContainer.innerHTML = ''; 

            movieList.forEach(movie => {
                const listItem = document.createElement('div');
                listItem.className = 'movie-list-item';
                listItem.innerHTML = `
                    <div class="movie-info-text">
                        <h3>${movie.title}</h3>
                        <p>Genre: ${movie.genre}</p>
                        <p class="added-at">Added on: ${new Date(movie.addedAt).toLocaleDateString()}</p>
                    </div>
                    <button class="remove-from-list-btn" data-movie-id="${movie.movieId}">Remove</button>
                `;
                myMovieListContainer.appendChild(listItem);
            });

            document.querySelectorAll('.remove-from-list-btn').forEach(button => {
                button.addEventListener('click', handleRemoveFromList);
            });

        } catch (error) {
            console.error('Error fetching movie list:', error);
            myMovieListContainer.innerHTML = '<p style="text-align:center; color:red;">Error loading list.</p>';
        }
    }

    async function handleRemoveFromList(event) {
        const button = event.target;
        const movieId = button.dataset.movieId;
        
        if (!confirm('Are you sure you want to remove this movie from your list?')) return;

        button.disabled = true;
        button.textContent = 'Removing...';
        movieListFeedback.textContent = 'Removing movie...';

        try {
            const response = await fetch(`${userListApiUrl}/${movieId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                movieListFeedback.textContent = '✅ Movie removed!';
                movieListFeedback.style.color = '#28a745';
                fetchAndDisplayMovieList(); 
            } else {
                const data = await response.json();
                movieListFeedback.textContent = `❌ ${data.msg || 'Failed to remove movie!'}`;
                movieListFeedback.style.color = '#dc3545';
                button.disabled = false;
                button.textContent = 'Remove';
            }
        } catch (error) {
            movieListFeedback.textContent = '❌ Network error during removal!';
            movieListFeedback.style.color = '#dc3545';
            button.disabled = false;
            button.textContent = 'Remove';
        } finally {
            setTimeout(() => { movieListFeedback.textContent = ''; }, 3000);
        }
    }

    // Content Switching Logic
    function switchContent(targetId) {
        profileDetailsCard.style.display = 'none';
        myListCard.style.display = 'none';
        
        if (targetId === 'profile-details-card') {
            profileDetailsCard.style.display = 'block';
            document.querySelector('.profile-nav-card .nav-item[data-target="profile-details-card"]').classList.add('active');
            document.querySelector('.profile-nav-card .nav-item[data-target="my-list-card"]').classList.remove('active');
        } else if (targetId === 'my-list-card') {
            myListCard.style.display = 'block';
            document.querySelector('.profile-nav-card .nav-item[data-target="my-list-card"]').classList.add('active');
            document.querySelector('.profile-nav-card .nav-item[data-target="profile-details-card"]').classList.remove('active');
            fetchAndDisplayMovieList(); 
        }
    }

    // Tab Navigation Handlers
    navItems.forEach(item => {
        if (item.classList.contains('logout')) return;
        
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            
             if (isEditing && targetId !== 'profile-details-card') { 
                 toggleEditMode(false);
             }
             
            switchContent(targetId);
        });
    });
    
    // Edit/Save/Message functions
    function toggleEditMode(editing) {
        isEditing = editing;
        const editableInputs = [usernameInput, emailInput, mobileInput, pictureUrlInput];

        editableInputs.forEach(input => {
            input.readOnly = !editing;
            input.classList.toggle('editable', editing);
        });

        if (editing) {
            editButton.innerHTML = '<i class="fas fa-times"></i> Cancel';
            formActions.style.display = 'flex';
            clearMessage();
        } else {
            editButton.innerHTML = '<i class="fas fa-pencil-alt"></i> Edit';
            formActions.style.display = 'none';
            populateProfileData(currentUserData);
            clearMessage();
        }
    }
    
    editButton.addEventListener('click', () => { toggleEditMode(!isEditing); });
    cancelButton.addEventListener('click', () => { toggleEditMode(false); });
    pictureUrlInput.addEventListener('input', () => {
         if (isEditing) { updateAvatarPreview(pictureUrlInput.value); }
    });
    
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!isEditing) return;

        const updatedData = {
            username: usernameInput.value.trim(),
            email: emailInput.value.trim(),
            mobileNumber: mobileInput.value.trim(),
            profilePictureUrl: pictureUrlInput.value.trim() || '../media/profile-placeholder.jpg'
        };

        if (!updatedData.username || !updatedData.email) {
            displayMessage('Username and Email cannot be empty.', 'error');
            return;
        }

        let changed = false;
        if (updatedData.username !== currentUserData.username ||
            updatedData.email !== currentUserData.email ||
            updatedData.mobileNumber !== (currentUserData.mobileNumber || '') ||
            updatedData.profilePictureUrl !== currentUserData.profilePictureUrl) {
            changed = true;
        }

        if (!changed) {
            displayMessage('No changes detected.', 'info');
            toggleEditMode(false);
            return;
        }

        saveButton.disabled = true;
        saveButton.textContent = 'Saving...';
        clearMessage();

        try {
            const res = await fetch(authApiUrl, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

            const result = await res.json();

            if (!res.ok) { throw new Error(result.msg || `Update failed: ${res.statusText}`); }

            currentUserData = { ...result };
            populateProfileData(result);
            toggleEditMode(false);
            displayMessage('Profile updated successfully!', 'success');

        } catch (error) {
            console.error('Error updating profile:', error);
            displayMessage(error.message, 'error');
        } finally {
            saveButton.disabled = false;
            saveButton.textContent = 'Save Changes';
        }
    });

    function displayMessage(message, type = 'info') {
        messageArea.textContent = message;
        messageArea.className = `message-area ${type}`;
        messageArea.style.display = 'block';
    }
    function clearMessage() {
         messageArea.textContent = '';
         messageArea.className = 'message-area';
         messageArea.style.display = 'none';
    }
    function logoutUser() {
        localStorage.removeItem('token');
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            window.location.href = 'login.html';
        } else {
            window.location.href = 'pages/login.html';
        }
    }

    // Logout Button
    logoutButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to log out?')) {
            logoutUser();
        }
    });
    
    // Initial Load
    fetchAllProfileData();

});