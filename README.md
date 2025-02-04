# Guestbook App

A Guestbook web application.
- users can submit and view messages. Built with Node.js, Express, and MongoDB.

## Installation Instructions

1. **Clone the Repository:**
   ```bash
   git clone <your-repo-link>
   cd <repository-folder>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Setup Environment Variables:**
   Create a `.env` file and add your MongoDB URI:
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.yvvnn.mongodb.net/guestbook?retryWrites=true&w=majority

   ```

4. **Start the Server:**
   ```bash
   npm start
   ```

5. **Open the App:**
   Go to `http://localhost:3000` in your browser.

## API Endpoints Documentation

### 1. **Add a Message**
- **Endpoint:** `POST /api/message`
- **Description:** Adds a new message to the guestbook.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "message": "Hello, world!"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Message added successfully"
  }
  ```

### 2. **Get All Messages**
- **Endpoint:** `GET /api/messages`
- **Description:** Retrieves all guestbook messages.
- **Response:**
  ```json
  [
    {
      "name": "John Doe",
      "message": "Hello, world!",
      "timestamp": "2024-02-01T12:34:56Z"
    }
  ]
  ```

## Deployment Links

- **Deployed API:** [https://api-dev-7m55.onrender.com](#)
- **Deployed Website:** [api-guestbook.netlify.app](#) (WIP)
