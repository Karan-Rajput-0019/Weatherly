# Development Configuration Guide

## Project Structure Overview

```text
Weather/
├── backend/                    # Node.js + Express backend
│   ├── models/user.js         # MongoDB user schema
│   ├── routes/auth.js         # Authentication routes
│   ├── routes/weather.js      # Weather API routes
│   ├── middleware/auth.js     # JWT authentication middleware
│   ├── server.js              # Express server setup
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables
│
├── Frontend/                   # React frontend
│   ├── public/index.html      # HTML template
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Auth/          # Login/Signup components
│   │   │   ├── Weather.js     # Main weather component
│   │   │   ├── Profile.js     # User profile component
│   │   │   └── LoadingSpinner.js
│   │   ├── context/           # React Context for auth
│   │   ├── App.js             # Main app component
│   │   ├── index.js           # React entry point
│   │   └── *.css              # Component styles
│   ├── package.json           # Frontend dependencies
│   └── .env                   # Frontend config
│
├── .env                       # Root environment variables
├── .gitignore                 # Git ignore file
├── README.md                  # Full documentation
└── QUICKSTART.md             # Quick setup guide
```

## Port Configuration

| Service | Port | URL |
|---------|------|-----|
| React Frontend | 3000 | [http://localhost:3000](http://localhost:3000) |
| Express Backend | 5000 | [http://localhost:5000](http://localhost:5000) |
| MongoDB | 27017 | (local) or cloud |

## Key Files Explained

### Backend

- **server.js**: Main Express server with middleware setup
- **models/user.js**: Mongoose schema for users and their preferences
- **routes/auth.js**: JWT-based authentication endpoints
- **routes/weather.js**: OpenWeatherMap API integration
- **middleware/auth.js**: Token verification middleware

### Frontend

- **App.js**: Main app with routing and auth context
- **context/AuthContext.js**: Global auth state management
- **components/Weather.js**: Main weather display component
- **components/Auth/Login.js & Signup.js**: Authentication pages
- **components/Profile.js**: User profile management

## Environment Variables Needed

### Backend (.env)

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/weatherly
JWT_SECRET=your_secret_key_here_change_in_production
OPENWEATHER_API_KEY=your_api_key_from_openweathermap
PORT=5000
NODE_ENV=development
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000
```

## Useful npm Commands

### Backend Commands

```bash
npm install              # Install dependencies
npm start               # Run server
npm run dev             # Run with nodemon (auto-reload)
```

### Frontend Commands

```bash
npm install             # Install dependencies
npm start              # Start development server
npm run build          # Build for production
npm test               # Run tests
```

## API Documentation

### Authentication Endpoints

- POST /api/auth/signup - Register user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile (auth required)
- PUT /api/auth/profile - Update profile (auth required)
- POST /api/auth/saved-cities - Save a city (auth required)
- GET /api/auth/saved-cities - Get saved cities (auth required)
- DELETE /api/auth/saved-cities/:city - Remove city (auth required)

### Weather Endpoints

- GET /api/weather/city/:cityName - Weather by city name
- GET /api/weather/coordinates?lat=X&lon=Y - Weather by coordinates
- GET /api/weather/air-quality?lat=X&lon=Y - Air quality data

## Authentication Flow

1. User submits signup/login form
2. Backend validates credentials
3. Creates JWT token if valid
4. Frontend stores token in localStorage
5. Token sent with every protected API request
6. Backend validates token in middleware
7. User data returned if valid

## Features Breakdown

### Weather Component

- Real-time weather display
- 5-day forecast
- Search by city
- Temperature unit toggle
- Save favorite cities
- Air quality indicators

### Auth Components

- Beautiful gradient UI
- Form validation
- Error messages
- Loading states
- Smooth transitions

### Profile Component

- View user info
- Edit preferences
- Manage saved cities
- Temperature unit preference
- Theme preference
- Logout functionality

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| 404 API errors | Check backend is running on port 5000 |
| CORS errors | Verify CORS middleware in server.js |
| MongoDB connection fails | Check connection string and IP whitelist |
| Weather API fails | Verify API key and rate limits |
| Blank page | Check browser console for errors |
| Token invalid | Clear localStorage and re-login |

## Performance Optimization

- Lazy loading for components
- Memoization for expensive calculations
- API request caching
- Optimized database queries
- CSS minification in production

## Security Best Practices

- Never commit .env files
- Use environment variables for secrets
- Hash passwords with bcrypt
- Implement rate limiting (future)
- Validate all user inputs
- Use HTTPS in production
- Implement CSRF protection (future)

## Testing Checklist

- [ ] Sign up creates new user
- [ ] Login with valid credentials works
- [ ] Login with invalid credentials fails
- [ ] JWT token stored in localStorage
- [ ] Protected routes redirect to login
- [ ] Weather data loads for different cities
- [ ] Save city functionality works
- [ ] Profile update saves preferences
- [ ] Logout clears token and redirects
- [ ] UI is responsive on mobile

## Deployment Checklist

- [ ] Update .env with production values
- [ ] Set NODE_ENV=production
- [ ] Configure HTTPS
- [ ] Set up MongoDB Atlas IP whitelist
- [ ] Enable CORS for frontend domain
- [ ] Test all features in production
- [ ] Set up error logging
- [ ] Configure database backups
- [ ] Test payment/premium features (if any)

---

For detailed setup instructions, see [QUICKSTART.md](QUICKSTART.md)
For full documentation, see [README.md](README.md)
