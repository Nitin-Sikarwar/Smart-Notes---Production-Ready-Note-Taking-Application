# Smart Notes - Production-Ready Note-Taking Application

A modern, feature-rich note-taking application built with the MERN stack (MongoDB, Express.js, React, Node.js) and styled with Tailwind CSS.

## 🚀 Features

### Core Features
- **User Authentication**: Secure JWT-based authentication with registration and login
- **Rich Text Editor**: Full-featured editor with support for headings, bold, italic, lists, and code blocks
- **Auto-Save**: Automatic saving while typing with debounced updates
- **Real-time Search**: Debounced search across note titles, content, and tags
- **Tag Management**: Add, remove, and filter notes by tags
- **Pin/Unpin Notes**: Keep important notes at the top
- **Soft Delete**: Move notes to trash with restore functionality
- **Dark/Light Mode**: Toggle between themes with system preference detection

### UI/UX Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Grid & List View**: Toggle between different note layouts
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Skeleton loaders and spinners for better UX
- **Optimistic Updates**: Instant UI updates with error rollback

### Technical Features
- **RESTful API**: Clean, well-structured backend API
- **MongoDB Indexing**: Optimized database queries with text search
- **Pagination**: Efficient data loading with pagination
- **Error Handling**: Comprehensive error handling and validation
- **Security**: Password hashing, rate limiting, and input validation
- **Environment Configuration**: Separate configs for development and production

## 🛠️ Tech Stack

### Frontend
- **React 18** with Hooks and Functional Components
- **Vite** for fast development and building
- **Tailwind CSS** for styling and responsive design
- **React Router** for client-side routing
- **React Quill** for rich text editing
- **Framer Motion** for animations
- **Axios** for API calls
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **Rate Limiting** for API protection

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd smart-notes-app
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
npm run install-server

# Install client dependencies
npm run install-client
```

### 3. Environment Configuration

#### Server Environment (.env in server folder)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-notes
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

#### Client Environment (.env in client folder)
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Database Setup

Make sure MongoDB is running on your system. The application will automatically create the database and collections on first run.

For MongoDB indexing (for search functionality), the application will create text indexes automatically.

### 5. Start the Application

#### Development Mode (Both servers)
```bash
npm run dev
```

#### Individual Servers
```bash
# Start backend server (from root)
npm run server

# Start frontend server (from root)
npm run client
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
smart-notes-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # Basic UI components
│   │   │   ├── layout/    # Layout components
│   │   │   └── notes/     # Note-specific components
│   │   ├── context/       # React Context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   ├── utils/         # Utility functions
│   │   └── main.jsx       # App entry point
│   ├── package.json
│   └── vite.config.js
├── server/                # Node.js backend
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── package.json
│   └── index.js         # Server entry point
├── package.json         # Root package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Notes
- `GET /api/notes` - Get all notes (with pagination, search, filters)
- `POST /api/notes` - Create new note
- `GET /api/notes/:id` - Get specific note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note (soft delete)
- `PUT /api/notes/:id/restore` - Restore deleted note
- `PUT /api/notes/:id/pin` - Toggle pin status
- `GET /api/notes/tags` - Get all tags

### Query Parameters for GET /api/notes
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search term
- `tags` - Comma-separated tag names
- `sortBy` - Sort field (default: updatedAt)
- `sortOrder` - Sort order: asc/desc (default: desc)
- `includeDeleted` - Include deleted notes (default: false)

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String (required, max: 50)
  email: String (required, unique, lowercase)
  password: String (required, min: 6, hashed)
  createdAt: Date
  updatedAt: Date
}
```

### Note Model
```javascript
{
  title: String (required, max: 200)
  content: String (required)
  tags: [String] (lowercase)
  isPinned: Boolean (default: false)
  isDeleted: Boolean (default: false)
  userId: ObjectId (ref: User, required)
  createdAt: Date
  updatedAt: Date
}
```

### Database Indexes
- Text index on `title`, `content`, and `tags` for search
- Compound index on `userId`, `isDeleted`, `isPinned`, `updatedAt` for efficient queries

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Express-validator for request validation
- **Rate Limiting**: Prevent API abuse
- **CORS Configuration**: Controlled cross-origin requests
- **Helmet**: Security headers
- **Environment Variables**: Sensitive data protection

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: System preference detection with manual toggle
- **Animations**: Smooth transitions with Framer Motion
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Real-time feedback
- **Keyboard Shortcuts**: Enhanced accessibility

## 🚀 Production Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-notes
JWT_SECRET=your-super-secure-production-jwt-secret
JWT_EXPIRE=7d
CLIENT_URL=https://your-frontend-domain.com
```

### Build for Production
```bash
# Build client
cd client && npm run build

# The built files will be in client/dist/
```

### Deployment Checklist
- [ ] Set secure JWT_SECRET
- [ ] Configure MongoDB Atlas or production database
- [ ] Set up environment variables
- [ ] Configure CORS for production domain
- [ ] Set up SSL/HTTPS
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

## 🧪 Testing

The application includes comprehensive error handling and validation. For testing:

1. **Manual Testing**: Use the provided endpoints with tools like Postman
2. **Database Testing**: Verify MongoDB connections and queries
3. **Authentication Testing**: Test JWT token generation and validation
4. **Frontend Testing**: Test all UI interactions and responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include error messages, screenshots, and steps to reproduce

## 🔮 Future Enhancements

- [ ] Real-time collaboration
- [ ] File attachments
- [ ] Export to PDF/Markdown
- [ ] Advanced search filters
- [ ] Note templates
- [ ] Sharing and permissions
- [ ] Mobile app (React Native)
- [ ] Offline support with PWA
- [ ] Integration with cloud storage
- [ ] Advanced text formatting options

---

**Built with ❤️ using the MERN Stack**
