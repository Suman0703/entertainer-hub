document.addEventListener('DOMContentLoaded', () => {
    const REVIEWS_API_URL = 'http://localhost:5000/api/reviews';
    const reviewsContainer = document.getElementById('reviews-container');

    // --- Helper to generate star rating icons ---
    function generateStars(rating) {
        let starsHtml = '';
        const filledStars = Math.round(rating); // Round to nearest whole star

        for (let i = 1; i <= 5; i++) {
            if (i <= filledStars) {
                // Font Awesome solid star (fas)
                starsHtml += '<i class="fas fa-star"></i>';
            } else {
                // Font Awesome regular star (far) or use outline if needed
                starsHtml += '<i class="far fa-star"></i>';
            }
        }
        return `<div class="review-rating">${starsHtml}</div>`;
    }

    // --- Helper to get initials for the avatar circle ---
    function getInitials(name) {
        if (!name) return '??';
        const parts = name.split(' ');
        let initials = parts[0].charAt(0).toUpperCase();
        if (parts.length > 1) {
            initials += parts[parts.length - 1].charAt(0).toUpperCase();
        }
        return initials;
    }

    // --- Helper to create a single review card ---
    function createReviewCard(review) {
        const initials = getInitials(review.reviewerName);
        const date = new Date(review.submittedAt).toLocaleDateString();
        const photoHtml = review.photoUrl ? 
            `<div class="review-photo-container"><img src="${review.photoUrl}" alt="Review Photo"></div>` : '';

        return `
            <div class="review-card">
                <div class="review-card-header">
                    <div class="reviewer-initials">${initials}</div>
                    <div class="reviewer-info">
                        <h3>${review.reviewerName}</h3>
                        <p>Reviewed on ${date}</p>
                    </div>
                </div>
                
                <h2 class="book-title-reviewed">${review.bookTitle}</h2> <!-- NEW: Display Book Title -->
                
                ${generateStars(review.rating)}

                <p class="review-text">${review.reviewText}</p>
                
                ${photoHtml}
            </div>
        `;
    }

    // --- Main Fetch Function ---
    async function fetchAndDisplayReviews() {
        if (!reviewsContainer) return;
        
        reviewsContainer.innerHTML = '<p style="text-align:center; color: #4ad991; padding: 50px;">Loading reviews...</p>';

        try {
            const response = await fetch(REVIEWS_API_URL);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const reviews = await response.json();

            if (reviews.length === 0) {
                reviewsContainer.innerHTML = `
                    <p style="text-align:center; color: #555; padding: 50px; font-weight: 500;">
                        Be the first to review! No community reviews have been submitted yet.
                    </p>
                `;
                return;
            }

            // Generate HTML for all reviews
            const reviewsHtml = reviews.map(createReviewCard).join('');
            reviewsContainer.innerHTML = reviewsHtml;

        } catch (error) {
            console.error('Error fetching reviews:', error);
            reviewsContainer.innerHTML = `
                <p style="text-align:center; color: #e74c3c; padding: 50px; font-weight: 500;">
                    Error loading reviews. Check backend connection.
                </p>
            `;
        }
    }

    // Initialize the fetch operation
    fetchAndDisplayReviews();
});
