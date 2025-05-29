# Atar Student Association Platform

![Atar Student Association Banner](https://via.placeholder.com/1200x400?text=Atar+Student+Association](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReCEfc6ZwI062nr5NndZxA8cmW5LyqvNrDBw&s) <!-- Replace with actual banner image -->

A comprehensive platform for student collaboration, resource sharing, and academic support within the Atar community.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

### Core Functionality
- **Community Posts**: Share study tips, ask questions, and engage with peers
- **Academic Resources**: Access and contribute to a growing library of materials
- **User Profiles**: Personalized accounts with achievement tracking
- **Real-time Chat**: Connect directly with other students
- **Discussion Forums**: Organized by subjects and topics

### Technical Highlights
- JWT authentication with secure cookies
- Responsive design with mobile-first approach
- Real-time updates for chat and notifications
- Advanced search and filtering capabilities
- Role-based access control (Student, Moderator, Admin)

## Technologies

### Frontend
- React 18 with functional components and hooks
- React Router for navigation
- React Bootstrap + custom CSS for responsive UI
- Axios for API communication
- React Hot Toast for notifications
- Framer Motion for animations

### Backend
- Node.js with Express.js framework
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- Express rate limiting and security middleware
- Nodemailer for email functionality

### Development Tools
- Git for version control
- Postman for API testing
- ESLint + Prettier for code quality
- Nodemon for backend development
- Concurrently for running full-stack locally

## Project Structure

```
atar-student-association/
├── backend/               # Node.js backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # Route definitions
│   ├── utils/            # Utility functions
│   ├── app.js            # Express app setup
│   └── server.js         # Server entry point
│
├── public/               # Static files
│   ├── index.html
│   └── assets/           # Images, fonts, etc.
│
├── src/                  # React frontend
│   ├── components/       # Reusable components
│   ├── pages/            # Page components
│   ├── styles/           # CSS and SCSS files
│   ├── App.js            # Main App component
│   └── index.js          # React entry point
│
├── .env.example          # Environment variables template
└── README.md             # This file
```

## Installation

### Prerequisites
- Node.js 16+
- MongoDB 4.4+
- Git

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/atar-student-association.git
   cd atar-student-association
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Fill in the required values

## Configuration

### Backend Environment Variables
Create a `.env` file in the backend directory with these variables:
```ini
NODE_ENV=development
PORT=5000
DB_URI=mongodb://localhost:27017/atar-community
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment Variables
Create a `.env` file in the frontend directory:
```ini
REACT_APP_API_BASE_URL=http://localhost:5000/api/v1
REACT_APP_GOOGLE_ANALYTICS_ID=UA-XXXXX-Y # Optional
```

## Running the Application

### Development Mode
1. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```

2. In a separate terminal, start the frontend:
   ```bash
   cd frontend
   npm start
   ```

The application will be available at:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

### Production Build
```bash
cd frontend
npm run build
```

## API Documentation

The backend API follows RESTful conventions with these endpoints:

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user
- `GET /api/v1/auth/logout` - Logout user

### Posts
- `GET /api/v1/posts` - Get all posts (with filtering)
- `POST /api/v1/posts` - Create new post
- `PUT /api/v1/posts/:id/like` - Like a post
- `POST /api/v1/posts/:id/comments` - Add comment

### Users
- `GET /api/v1/users` - Get all users (admin only)
- `PUT /api/v1/users/:id` - Update user profile

For detailed API documentation with request/response examples, see [API_DOCS.md](API_DOCS.md).

## Deployment

### Backend Deployment
1. Set up a MongoDB Atlas cluster or use a managed MongoDB service
2. Configure production environment variables
3. Use PM2 or similar process manager for Node.js

### Frontend Deployment
The frontend can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Firebase Hosting

Example deployment to Vercel:
```bash
npm install -g vercel
vercel
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows our ESLint rules and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Atar Student Association** © 2023 | [Contact Team](mailto:contact@atarassociation.org)
```
