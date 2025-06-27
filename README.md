✈️ Project

This project is a URL shortener backend built with Node.js and Express.

## 👤 Student ID
**22131011150**

## 📸 Screenshots

### Screenshot 1
<img width="1468" alt="Screenshot 2025-06-27 at 4 52 55 PM" src="https://github.com/user-attachments/assets/a2532221-9b0e-4819-98a6-bd54abdb310b" />

### Screenshot 2
<img width="1468" alt="Screenshot 2025-06-27 at 4 53 13 PM" src="https://github.com/user-attachments/assets/c520bf2a-82db-4489-b306-362a10ef7667" />

## 🏗️ Project Architecture:

📦 22SCSE1011135
├── backend
│ ├── index.js # Express server entry point
│ ├── routes
│ │ ├── shortUrlRoutes.js # Handles URL shortening and redirection routes
│ │ └── urlStorage.js # In-memory storage for URL data
│
├── frontend
│ ├── public # Static files
│ ├── src
│ │ ├── pages
│ │ │ └── Shortener.jsx # UI for shortening URLs
│ │ ├── App.js # React main app
│ │ ├── index.js # React entry point
│ │ └── *.js / *.css # React components, styles & test files
│
├── logging-middleware
│ └── LoggingService.js # Custom logging middleware for backend events
├── .gitignore # Ignored files/folders
├── README.md # Project documentation
├── package.json / lock.json # Dependencies for root or shared setup
