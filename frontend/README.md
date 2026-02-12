# Real-Time Messaging Application

A full-stack real-time messaging application built with React, Node.js, Express, MongoDB, and Socket.IO. Features include user authentication, real-time chat, and a modern responsive UI.

## 🚀 Features

- **Real-time Messaging**: Instant message delivery using Socket.IO
- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Chat Management**: Create and join chat rooms
- **Modern UI**: Built with React and styled using TailwindCSS
- **Responsive Design**: Works seamlessly across different screen sizes
- **User Presence**: Real-time user connection status

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Socket.IO Client** - Real-time bidirectional communication
- **Axios** - HTTP client for API requests
- **TailwindCSS** - Utility-first CSS framework
- **React Hooks** - State management and side effects

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.IO** - Real-time communication
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing

## 📁 Project Structure

```
messaging-app/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── models/
│   │   ├── User.js          # User schema
│   │   ├── Chat.js          # Chat schema
│   │   └── Message.js       # Message schema
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── chat.js          # Chat management routes
│   │   ├── message.js       # Message routes
│   │   └── user.js          # User routes
│   ├── server.js            # Main server file
│   └── package.json
│
└── frontend/
    ├── public/
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── src/
    │   ├── components/
    │   │   ├── ChatList.js      # Chat list sidebar
    │   │   ├── ChatWindow.js    # Main chat interface
    │   │   └── auth/
    │   │       ├── Auth.js      # Authentication container
    │   │       └── Login.js     # Login component
    │   ├── hooks/
    │   │   └── useAuth.js       # Custom authentication hook
    │   ├── services/
    │   │   ├── api.js           # API service layer
    │   │   └── socket.js        # Socket.IO configuration
    │   ├── utils/
    │   │   └── auth.js          # Auth utility functions
    │   ├── App.js               # Main App component
    │   ├── index.js             # Entry point
    │   └── index.css            # Global styles
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd messaging-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Create environment file**
   
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/messaging-app
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start MongoDB**
   
   Make sure MongoDB is running on your system

2. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   # or for development with auto-restart
   npx nodemon server.js
   ```
   
   The backend server will run on `http://localhost:5000`

3. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   
   The frontend will run on `http://localhost:3000`

4. **Access the Application**
   
   Open your browser and navigate to `http://localhost:3000`

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/user` - Get all users
- `GET /api/user/:id` - Get user by ID

### Chats
- `GET /api/chat` - Get all chats for authenticated user
- `POST /api/chat` - Create a new chat
- `GET /api/chat/:id` - Get chat by ID

### Messages
- `GET /api/message/:chatId` - Get all messages in a chat
- `POST /api/message` - Send a new message

## 🔌 Socket.IO Events

### Client-side Events
- `join-chat` - Join a specific chat room

### Server-side Events
- `new-message` - Broadcast new messages to chat participants
- `connection` - Handle new socket connections
- `disconnect` - Handle socket disconnections

## 🎨 Features in Detail

### Authentication
- User registration with password encryption
- JWT-based session management
- Protected routes and API endpoints
- Automatic token validation

### Real-time Messaging
- Instant message delivery using Socket.IO
- Chat room functionality
- Message persistence in MongoDB
- Connection state management

### User Interface
- Clean and modern design with TailwindCSS
- Responsive layout for mobile and desktop
- Chat list sidebar
- Message composition
- User logout functionality

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests (if configured)
cd backend
npm test
```

## 📦 Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

This creates an optimized production build in the `build` folder.

### Backend Deployment
Ensure environment variables are properly configured in your production environment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

Sravan Venkata

## 🙏 Acknowledgments

- React documentation
- Socket.IO documentation
- MongoDB documentation
- TailwindCSS documentation

---

**Note**: Make sure to update the MongoDB URI and JWT secret in your `.env` file before running the application.
