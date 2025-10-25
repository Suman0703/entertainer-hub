<img width="1901" height="911" alt="Screenshot 2025-10-25 125313" src="https://github.com/user-attachments/assets/899f897c-ed00-40b0-b49f-cc781d797fe4" /><img width="1898" height="908" alt="Screenshot 2025-10-25 125257" src="https://github.com/user-attachments/assets/6c06348d-2e29-4fa0-b303-f298410f7ce1" /># FunShelf 📚🎵🎮🎬

FunShelf is a full-stack digital entertainment platform designed for book lovers and entertainment seekers. It provides a space to read books by genre, listen to curated music playlists, play simple games, get movie recommendations, and interact with a community through reviews.

---

## Features ✨

* **Book Library:** Browse and read books organized by genre (Fiction, Mystery, Romance, Sci-Fi, Comedy, Horror, etc.). Book content is dynamically loaded using PDF links.
* **Music Player:** Listen to music playlists curated by genre (Lo-fi, Piano, Ambient, etc.) powered by the YouTube Data API. Includes a "Play All" feature.
* **Games Section:** Play simple browser-based games like Riddles and Quizzes.
* **Movie Recommendations:** Discover movie suggestions categorized by genre. Users can add movies to their personal list.
* **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens).
* **User Profiles:** View and edit user profile information (username, email, profile picture URL).
* **My Movie List:** Registered users can save movies to a personal list accessible from the Movies page.
* **Book Reviews:** Users can submit reviews for books, including a star rating and an optional photo upload. Reviews are displayed on a dedicated page.
* **Responsive Design:** Adapts to various screen sizes for a seamless experience on desktop and mobile devices.

---

## Tech Stack 💻

* **Frontend:** HTML, CSS, JavaScript (Vanilla JS)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose ODM
* **Authentication:** JWT (jsonwebtoken), bcryptjs
* **File Handling (Backend):** Multer (for PDF books and review images)
* **External APIs:** YouTube Data API v3 (for music)
* **Development Tools:** Postman (for API testing), Nodemon (for server auto-restart)
Okay, here's the content for your `README.md` file, covering the FunShelf project's purpose, features, and setup.

```markdown
# FunShelf 📚🎵🎮🎬

FunShelf is a full-stack digital entertainment platform designed for book lovers and entertainment seekers. It provides a space to read books by genre, listen to curated music playlists, play simple games, get movie recommendations, and interact with a community through reviews.

## Tech Stack 💻

* **Frontend:** HTML, CSS, JavaScript (Vanilla JS)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose ODM
* **Authentication:** JWT (jsonwebtoken), bcryptjs
* **File Handling (Backend):** Multer (for PDF books and review images)
* **External APIs:** YouTube Data API v3 (for music)
* **Development Tools:** Postman (for API testing), Nodemon (for server auto-restart)

## Features ✨

* **Book Library:** Browse and read books organized by genre (Fiction, Mystery, Romance, Sci-Fi, Comedy, Horror, etc.). Book content is dynamically loaded using PDF links.
* **Music Player:** Listen to music playlists curated by genre (Lo-fi, Piano, Ambient, etc.) powered by the YouTube Data API. Includes a "Play All" feature.
* **Games Section:** Play simple browser-based games like Riddles and Quizzes.
* **Movie Recommendations:** Discover movie suggestions categorized by genre. Users can add movies to their personal list.
* **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens).
* **User Profiles:** View and edit user profile information (username, email, profile picture URL).
* **My Movie List:** Registered users can save movies to a personal list accessible from the Movies page.
* **Book Reviews:** Users can submit reviews for books, including a star rating and an optional photo upload. Reviews are displayed on a dedicated page.
* **Responsive Design:** Adapts to various screen sizes for a seamless experience on desktop and mobile devices.

#visuals
<img width="1898" height="908" alt="Screenshot 2025-10-25 125257" src="https://github.com/user-attachments/assets/32487d3d-2dc2-4223-97f7-16ba9689fb93" />

<img width="1901" height="911" alt="Screenshot 2025-10-25 125313" src="https://github.com/user-attachments/assets/c24346e1-2f50-4bf4-aa02-5e9472282be3" />

<img width="1900" height="914" alt="Screenshot 2025-10-25 125326" src="https://github.com/user-attachments/assets/7aef4b26-8531-4cef-b817-71507841d920" />

<img width="1899" height="910" alt="Screenshot 2025-10-25 125346" src="https://github.com/user-attachments/assets/f2ecc23e-d686-4614-aca7-b120336adc4f" />

<img width="1878" height="937" alt="Screenshot 2025-10-25 125447" src="https://github.com/user-attachments/assets/afdc1115-23c0-439d-952b-1d678ab2ea96" />

<img width="1897" height="917" alt="Screenshot 2025-10-25 125512" src="https://github.com/user-attachments/assets/f04676ce-7123-4c69-ae88-a2fd774ee961" />

<img width="1901" height="912" alt="Screenshot 2025-10-25 125539" src="https://github.com/user-attachments/assets/f0745526-974a-4fc6-a0ca-c7e646807d69" />

<img width="1906" height="911" alt="Screenshot 2025-10-25 132508" src="https://github.com/user-attachments/assets/26dc18aa-2f91-43b4-aaf8-040a3b5619f6" />

<img width="1899" height="913" alt="Screenshot 2025-10-25 125611" src="https://github.com/user-attachments/assets/d1d896a7-a991-4e5a-a9b2-2bf323a95b29" />

<img width="1901" height="816" alt="Screenshot 2025-10-25 125628" src="https://github.com/user-attachments/assets/e84eb52c-76e8-40aa-9943-dc816e48bc85" />

<img width="1898" height="920" alt="Screenshot 2025-10-25 125648" src="https://github.com/user-attachments/assets/1efef3cd-4dd7-471a-b5d0-d6ee18505c36" />

## Project Structure 📂
FunShelf/
├── backend/
│   ├── config/             \# Database connection, environment variables
│   ├── controllers/        \# Handles API logic (auth, books, reviews, users, music)
│   ├── middleware/         \# Authentication middleware (protect)
│   ├── models/             \# Mongoose schemas (User, Book, Review)
│   ├── node\_modules/
│   ├── public\_pdfs/        \# Stores uploaded PDF book files
│   ├── public\_reviews/     \# Stores uploaded review image files
│   ├── routes/             \# Defines API endpoints (auth, books, reviews, users, music)
│   ├── .env                \# Environment variables (DB URI, JWT secret, API keys)
│   ├── package.json
│   └── server.js           \# Main Express server setup
│
└── frontend/
├── media/              \# Static images (logos, placeholders, genre images)
├── pages/              \# HTML files for different sections
├── script/             \# JavaScript files for frontend logic
├── style/              \# CSS files for styling
└── index.html          \# Homepage

## Setup & Installation 🚀

1.  **Clone the Repository:**
    ```bash
    git clone <your-repository-url>
    cd FunShelf
    ```

2.  **Backend Setup:**
    * Navigate to the `backend` directory: `cd backend`
    * Install dependencies: `npm install`
    * Create a `.env` file in the `backend` directory and add the following variables:
        ```env
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key
        YOUTUBE_API_KEY=your_youtube_data_api_key 
        # PORT=5000 (Optional, defaults to 5000)
        ```
    * Create the directories `backend/public_pdfs` and `backend/public_reviews`.
    * Start the backend server: `npm start` (or `node server.js`, or `npm run dev` if you have nodemon configured). The server should run on `http://localhost:5000`.

3.  **Frontend Setup:**
    * No build step is required for the static frontend. Simply open the `frontend/index.html` file in your web browser. Make sure your backend server is running.

---

## Usage Guide 🧭

1.  **Register/Login:** Create an account or log in to access features like "My Movie List" and profile editing.
2.  **Explore:** Navigate using the header or sidebar menu.
3.  **Books:** Go to "Books/Stories" > "Choose Your Genre" and select a genre to see available books. Click "Read Now" to open the PDF.
4.  **Music:** Go to "Music," click on a genre card (e.g., "Lo-fi Beats"), and the relevant YouTube playlists/videos will load below. Click "Play All" to start the first video.
5.  **Games:** Go to "Games" and choose between "Riddles" or "Quiz."
6.  **Movies:** Go to "Movies," select a genre, and browse recommendations. Logged-in users can click "Add to List." The "My List" button shows saved movies.
7.  **Reviews:** Submit a review using the form (accessible via link on the Reviews page). View all submitted reviews on the "Recommendations" (Reviews) page.
8.  **Profile:** Click "My Profile" (when logged in) to view details and edit your username, email, and profile picture URL.


