# TaskFlow - Task Management Application
TaskFlow is a full-stack task management application built using the MERN stack. It enables users to securely manage their daily tasks through an interactive dashboard with authentication, task organization, and productivity-focused features.
The project demonstrates the development of a complete production-ready web application with a React frontend, Node.js REST API backend, and MongoDB database integration.


## Project Highlights
- Full-stack MERN architecture
- Secure JWT-based authentication
- User-specific task management
- RESTful API implementation
- Responsive and modern dashboard interface
- Cloud deployment using Render
- MongoDB Atlas database integration


## Features
Authentication
- User registration and login
- JWT token-based authentication
- Protected routes and APIs
- Secure access to personal data

Task Management
- Create new tasks
- Update existing tasks
- Delete tasks
- Mark tasks as completed
- Manage task priority levels
- Assign task categories
- Track deadlines using due dates

Productivity Features
- Search tasks
- Filter tasks based on category and priority
- Organized dashboard view
- Task status tracking

---

## Technology Stack
Frontend
- React.js
- Vite
- Axios
- CSS

Backend
- Node.js
- Express.js
- REST APIs
- JWT Authentication

Database
- MongoDB Atlas
- Mongoose ODM

Deployment
- Render


## System Architecture
User
|
React Frontend
|
Axios API Requests
|
Express.js Backend
|
MongoDB Database


## Project Structure
TaskFlow
|
|-- frontend
| |-- src
| |-- components
| |-- pages
|
|-- backend
|-- controllers
|-- models
|-- routes
|-- middleware
|-- server.js


## Live Demo
Frontend:
https://task-manager-frontend-qwuc.onrender.com
Backend API:
https://task-manager-api-a873.onrender.com



## Installation and Setup
Clone the repository:
git clone https://github.com/teesha-sachdev/mern-task-manager.git

Install backend dependencies:
cd backend
npm install


Install frontend dependencies:
cd frontend
npm install

Create environment variables
Backend:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=your_frontend_url


Start the application:
Backend: npm start
Frontend:npm run dev


## Security Implementation
- Password encryption using secure authentication methods
- JWT-based user verification
- Protected API routes
- User-specific database operations


## Future Enhancements
- Dark mode support
- Task analytics dashboard
- Email reminders
- Calendar integration
- Team collaboration features

---

## Author
Teesha Sachdev
MERN Stack Developer
