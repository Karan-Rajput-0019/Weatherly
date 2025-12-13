# 🌤️ Weatherly - Real-Time Weather Application

A beautiful, full-stack weather application built with the MERN stack (MongoDB, Express, React, Node.js). Get real-time weather data, save your favorite cities, and manage your profile with a stunning modern UI.

## ✨ Features

- 🔐 **User Authentication**: Secure signup and login with JWT tokens
- 🌍 **Real-Time Weather Data**: Current weather, 5-day forecast, and detailed metrics
- 💾 **Save Favorite Cities**: Save and manage your favorite cities
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations
- 🌡️ **Temperature Units**: Toggle between Celsius and Fahrenheit
- 👤 **User Profile**: Manage user preferences and saved cities
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

**Frontend:**

- React 18
- React Router v7
- CSS3 (with animations and gradients)
- Context API for state management

**Backend:**

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- Bcrypt for password hashing

**External APIs:**

- OpenWeatherMap API (for weather data)

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas cloud database)

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Weather
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/weatherly
JWT_SECRET=your_super_secret_jwt_key_change_in_production
OPENWEATHER_API_KEY=your_openweather_api_key
PORT=5000
NODE_ENV=development
```

**Get your API keys:**

- **MongoDB**: Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **OpenWeather API**: Sign up at [OpenWeatherMap](https://openweathermap.org/api)

Start the backend server:

```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd Frontend
npm install
```

Start the frontend application:

```bash
npm start
```

The frontend will open at `http://localhost:3000`

## 🔐 Authentication Flow

1. **Sign Up**: Create a new account with name, email, and password
2. **Login**: Sign in with your credentials
3. **JWT Token**: Automatically stored in localStorage
4. **Protected Routes**: Weather page requires authentication
5. **Logout**: Clear token and redirect to login

## 📍 API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /signup` - Create new account
- `POST /login` - Login user
- `GET /profile` - Get user profile (requires auth)
- `PUT /profile` - Update user profile (requires auth)
- `POST /saved-cities` - Add saved city (requires auth)
- `GET /saved-cities` - Get saved cities (requires auth)
- `DELETE /saved-cities/:city` - Remove saved city (requires auth)

### Weather Routes (`/api/weather`)

- `GET /city/:cityName` - Get weather by city name
- `GET /coordinates` - Get weather by coordinates
- `GET /air-quality` - Get air quality data

## 🎨 Design Features

- **Gradient Background**: Beautiful animated gradient that shifts colors
- **Glass Morphism**: Modern UI with frosted glass effect
- **Smooth Animations**: Transitions and keyframe animations throughout
- **Dark Theme**: Eye-friendly dark interface
- **Responsive Grid**: Auto-adapting layouts for all screen sizes
- **Interactive Cards**: Hover effects and animations on components

## 📱 Responsive Breakpoints

- **Desktop**: Full-featured layout (≥1024px)
- **Tablet**: Adjusted grid and spacing (768px - 1023px)
- **Mobile**: Optimized single-column layout (<768px)

## 🔄 Data Flow

```text
User Login → Get JWT Token → Fetch Weather Data → Display in UI
     ↓
Save City → Store in MongoDB → Fetch and Display Saved Cities
     ↓
Update Profile → Update Preferences → Save to Database
```

## 🌤️ Weather Data Includes

- Current temperature
- Feels-like temperature
- Weather condition and icon
- Humidity percentage
- Wind speed
- Atmospheric pressure
- Visibility
- 5-day forecast with hourly data

## 🚨 Error Handling

- Invalid credentials show error messages
- Network errors are caught and displayed
- City not found returns helpful feedback
- Token expiration redirects to login

## 🔒 Security Features

- Passwords hashed with bcrypt
- JWT authentication for protected routes
- CORS enabled for cross-origin requests
- Environment variables for sensitive data
- HTTP-only cookies (recommended for production)

## 📝 Environment Variables

### Backend `.env`

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENWEATHER_API_KEY=your_openweather_api_key
PORT=5000
NODE_ENV=development
```

### Frontend Configuration

- API base URL: `http://localhost:5000` (development)
- Update proxy in `package.json` for production

## 🚀 Deployment

### Backend (Render/Heroku/Railway)

1. Push to GitHub
2. Connect repository to deployment platform
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)

1. Build the app: `npm run build`
2. Deploy the `build` folder
3. Update API URLs for production

## 📊 Project Structure

```javascript
Weather/
├── backend/
│   ├── models/
│   │   └── user.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── weather.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js
│   │   │   │   ├── Signup.js
│   │   │   │   └── Auth.css
│   │   │   ├── Weather.js
│   │   │   ├── Weather.css
│   │   │   ├── Profile.js
│   │   │   ├── Profile.css
│   │   │   ├── LoadingSpinner.js
│   │   │   └── LoadingSpinner.css
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── .env
│
├── .env (root)
├── .gitignore
└── README.md
```

## 🐛 Troubleshooting

**Frontend can't connect to backend:**

- Check if backend is running on port 5000
- Verify CORS is enabled in server.js
- Check network tab in browser DevTools

**Weather data not loading:**

- Verify OpenWeatherMap API key is correct
- Check if API key has appropriate permissions
- Ensure rate limit hasn't been exceeded

**Login issues:**

- Clear localStorage and try again
- Check MongoDB connection
- Verify JWT_SECRET is set

**Database connection fails:**

- Verify MongoDB URI is correct
- Check if MongoDB cluster is accessible
- Ensure IP whitelist includes your IP

## 🎯 Future Enhancements

- [ ] Weather alerts and notifications
- [ ] Historical weather data
- [ ] Multiple language support
- [ ] Dark/Light theme toggle
- [ ] Weather comparison between cities
- [ ] Social features (share weather)
- [ ] Push notifications
- [ ] Weather maps integration

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

For questions or issues, please open an issue on GitHub.

---

Made with ❤️ by karan

Enjoy the app! 🌤️
