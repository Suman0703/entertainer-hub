document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const REVIEW_API_URL = 'http://localhost:5000/api/reviews';
    const CAPTCHA_ANSWER = 60; 
    
    // DOM Elements
    const starsContainer = document.getElementById('stars');
    const bookRatingInput = document.getElementById('bookRating');
    const bookReviewForm = document.getElementById('bookReviewForm');
    const reviewPhotoInput = document.getElementById('reviewPhoto');
    const browseBtn = document.querySelector('.browse-btn');
    const fileUploadBox = document.querySelector('.file-upload-box');
    const filePreview = document.getElementById('file-preview');
    const captchaInput = document.getElementById('captchaInput');
    const sendBtn = document.querySelector('.send-btn');
    
    let currentRating = 0; 

    // Utility Functions
    function highlightStars(rating) {
        Array.from(starsContainer.children).forEach(star => {
            if (parseInt(star.dataset.value) <= rating) {
                star.classList.remove('far'); 
                star.classList.add('fas');    
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
    }

    function displayFilePreview(file) {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                filePreview.innerHTML = `<img src="${e.target.result}" alt="Review Photo Preview">`;
            };
            reader.readAsDataURL(file);
        } else {
            filePreview.innerHTML = '';
        }
    }
    
    function showFormMessage(message, type = 'error') {
        let msgEl = document.querySelector('.form-message');
        if (!msgEl) {
             msgEl = document.createElement('p');
             msgEl.className = 'form-message';
             sendBtn.parentNode.insertBefore(msgEl, sendBtn.nextSibling);
        }
        
        msgEl.textContent = message;
        msgEl.style.cssText = `
            margin-top: 15px; padding: 10px; border-radius: 5px; 
            font-weight: bold; text-align: center;
            background-color: ${type === 'success' ? '#e0f2f1' : '#fdeded'};
            color: ${type === 'success' ? '#0d2c1f' : '#c0392b'};
        `;

        setTimeout(() => {
            if (msgEl) msgEl.remove();
        }, 5000);
    }
    
    // Star Rating Functionality
    if (starsContainer) {
        starsContainer.addEventListener('mouseover', (event) => {
            if (event.target.classList.contains('fa-star')) {
                highlightStars(parseInt(event.target.dataset.value));
            }
        });

        starsContainer.addEventListener('mouseout', () => {
            highlightStars(currentRating);
        });

        starsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('fa-star')) {
                currentRating = parseInt(event.target.dataset.value);
                bookRatingInput.value = currentRating;
                highlightStars(currentRating);
            }
        });
    }

    // File Upload Functionality
    if (browseBtn) {
        browseBtn.addEventListener('click', () => {
            reviewPhotoInput.click();
        });
    }

    if (reviewPhotoInput) {
        reviewPhotoInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                displayFilePreview(file);
            } else {
                filePreview.innerHTML = '';
            }
        });
    }

    // Handle drag and drop
    if (fileUploadBox) {
        fileUploadBox.addEventListener('dragover', (event) => {
            event.preventDefault();
            fileUploadBox.classList.add('drag-over');
        });

        fileUploadBox.addEventListener('dragleave', () => {
            fileUploadBox.classList.remove('drag-over');
        });

        fileUploadBox.addEventListener('drop', (event) => {
            event.preventDefault();
            fileUploadBox.classList.remove('drag-over');
            const file = event.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                reviewPhotoInput.files = event.dataTransfer.files;
                displayFilePreview(file);
            } else {
                showFormMessage('Only image files are allowed for photo upload.');
            }
        });
    }


    // Form Submission (API Integration)
    if (bookReviewForm) {
        bookReviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // 1. CAPTCHA Validation
            const captchaAnswer = parseInt(captchaInput.value);
            if (captchaAnswer !== CAPTCHA_ANSWER) {
                showFormMessage('Incorrect CAPTCHA. Please try again.');
                captchaInput.value = ''; 
                return;
            }
            
            // 2. Rating Validation
            if (currentRating < 1 || currentRating > 5) {
                showFormMessage('Please select a star rating.');
                return;
            }


            // 3. Prepare FormData
            const formData = new FormData(bookReviewForm);
            
            formData.set('rating', currentRating); 

            sendBtn.disabled = true;
            sendBtn.textContent = 'SENDING...';

            // 4. Send to Backend
            try {
                const response = await fetch(REVIEW_API_URL, {
                    method: 'POST',
                    body: formData 
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.msg || 'Review submission failed due to a server error.');
                }
                
                // Success
                showFormMessage('Thank you! Your review has been submitted successfully.', 'success');
                
                // Reset Frontend State
                bookReviewForm.reset();
                filePreview.innerHTML = ''; 
                currentRating = 0;
                highlightStars(0);
                captchaInput.value = '';

            } catch (error) {
                console.error('Error submitting review:', error);
                showFormMessage(error.message);

            } finally {
                sendBtn.disabled = false;
                sendBtn.textContent = 'SEND';
            }
        });
    }
});