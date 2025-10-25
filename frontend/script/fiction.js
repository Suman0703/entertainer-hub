document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const API_BASE_URL = 'http://localhost:5000/api/books';
    const GENRE_NAME = 'Fiction'; // This script is specific to the Fiction genre
    const bookListContainer = document.getElementById('book-list');

    // --- Utility Function to Create Book Card HTML ---
    function createBookCard(book) {
        // Fallback for image and description if data is missing
        const imageUrl = book.coverImageUrl || '../media/book.jpg';
        const description = book.description || 'No description available for this book.';
        
        return `
            <div class="book-card">
                <img src="${imageUrl}" alt="${book.title}" onerror="this.onerror=null; this.src='../media/book.jpg';">
                <h2>${book.title}</h2>
                <p>${description}</p>
                <a href="${book.pdfUrl}" target="_blank" class="btn">Read Now</a>
            </div>
        `;
    }

    // --- Main Fetch Function ---
    async function fetchBooksByGenre() {
        if (!bookListContainer) return;
        
        // Show a loading message
        bookListContainer.innerHTML = '<p style="text-align:center; color: #aaa; padding: 50px;">Loading books...</p>';

        try {
            // Construct API URL: /api/books?genre=Fiction
            const url = `${API_BASE_URL}?genre=${GENRE_NAME}`;

            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const books = await response.json();

            if (books.length === 0) {
                bookListContainer.innerHTML = `
                    <p style="text-align:center; color: #4ad991; padding: 50px;">
                        No ${GENRE_NAME} books found yet. Check back soon!
                    </p>
                `;
                return;
            }

            // Generate HTML for all books
            const booksHtml = books.map(createBookCard).join('');
            bookListContainer.innerHTML = booksHtml;

        } catch (error) {
            console.error('Error fetching data:', error);
            bookListContainer.innerHTML = `
                <p style="text-align:center; color: red; padding: 50px;">
                    Error loading book data. Please check the backend server.
                </p>
            `;
        }
    }

    // Initialize the fetch operation
    fetchBooksByGenre();
});