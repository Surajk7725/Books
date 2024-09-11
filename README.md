# Library Management System 📚

A comprehensive library management system built with the **MERN (MongoDB, Express.js, React.js, Node.js)** stack. The platform allows users to explore, download, rate books, manage personal notes, and more, with features inspired by Notion.

## Features ✨

- **Book Management**: Add, update, view, and delete books.
- **Rating System**: Users can rate and review books.
- **Bookmarks**: Save favorite books for easy access.
- **Notion-like Notes**: Write, edit, view, and delete personal notes or even draft a new book.
- **Download Books**: Option to download books in supported formats.
- **Admin Dashboard**: Admins can manage books, users, and monitor activity.
- **Email Notifications**: Get updates about new books or reminders via email.

## Technologies Used 🛠️

- **MongoDB**: Database for storing books, users, and notes.
- **Express.js**: Backend framework for API and server management.
- **React.js**: Frontend framework for building the UI.
- **Node.js**: JavaScript runtime for the backend.
- **Mongoose**: MongoDB ODM to manage data models.
- **JWT**: For user authentication and authorization.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Nodemailer**: For sending emails and notifications.
- **Multer**: Middleware for handling file uploads, including images and book files.
- **Nodemon**: For automatic server restarts during development.

## Deployment 🌐

The app is live and can be accessed at: [BookHub](https://books-frontend-xu1t.onrender.com/)

## Getting Started 🚀

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Surajk7725/Books.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Books
    ```

3. Install dependencies for both backend and frontend:
    ```bash
    # For backend
    cd backend
    npm install

    # For frontend
    cd ../frontend
    npm install
    ```

4. Set up environment variables:
    - Create a `.env` file in the `backend` folder with your MongoDB URI, JWT secret, and email credentials:
    ```bash
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    EMAIL_HOST=your_email_host
    EMAIL_PORT=your_email_port
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_pass
    ```

5. Start the development server:
    - For the backend:
    ```bash
    cd backend
    npm run dev
    ```

    - For the frontend:
    ```bash
    cd ../frontend
    npm start
    ```

6. Open your browser and navigate to `http://localhost:3000` to view the app.

## API Endpoints 🔗

- **/api/auth**: Handles user authentication (register, login).
- **/api/user**: User profile management.
- **/api/books**: CRUD operations for books.
- **/api/notes**: Manage personal notes (add, edit, delete).
- **/api/content**: Add and manage book content.
- **/api/staff**: Manage staff-related operations.
- **/api/admin**: Admin-specific routes.
- **/api/notifications**: Handle sending notifications.
- **/api/contact**: Manage user queries or contact form submissions.

## Folder Structure 📂

```bash
Books/
│
├── backend/          # Express.js backend
│   ├── controllers/  # Request handlers (Books, Users, Notes)
│   ├── middleware/   # Custom middlewares
│   ├── models/       # Mongoose models for books, users, notes
│   ├── routers/      # API routes for books, users, notes, etc.
│   ├── uploads/      # Directory for file uploads (images, book files)
│   ├── utils/        # Utility functions
│   ├── dbConnect.js  # MongoDB connection file
│   └── server.js     # Entry point of the backend
│
├── frontend/         # React.js frontend
│   ├── public/           # Static files (index.html, favicon, etc.)
│   └── src/
│       ├── components/   # Reusable UI components
│       │   ├── admin/    # Admin-specific components
│       │   ├── images/   # Image assets
│       │   ├── staff/    # Components related to staff operations
│       │   └── user/     # User-specific components
│       ├── authcontext.js  # Context for user authentication
│       ├── axiosInstance.js # Axios configuration for API requests
│       ├── landing.js    # Landing page component
│       ├── login.js      # Login page component
│       ├── navbar.js     # Navigation bar component
│       ├── pagetitle.js  # Page title component
│       ├── signup.js     # Signup page component
│       ├── forgot.js     # Forgot password component
│       ├── help.js       # Help page component
│       ├── updatePassword.js  # Update password component
│       ├── protectedRoute.js  # Route protection logic
│       ├── App.js            # Main App component
│       ├── index.js          # Entry point of the React app
│       ├── postcss.config.js # PostCSS configuration for Tailwind
│       ├── tailwind.config.js # Tailwind CSS configuration
│
└── README.md
