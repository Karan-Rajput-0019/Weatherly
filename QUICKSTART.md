# 🚀 Quick Start Guide - Weatherly

Get your weather app running in 5 minutes!

## Step 1: Get Your API Keys (2 minutes)

### MongoDB (Database)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free
3. Create a new cluster
4. Get your connection string
5. Copy it to `.env` as `MONGO_URI`

### OpenWeatherMap (Weather Data)

1. Go to [openweathermap.org/api](https://openweathermap.org/api)
2. Sign up for free
3. Go to API keys section
4. Copy your API key
5. Add it to `.env` as `OPENWEATHER_API_KEY`

## Step 2: Setup Backend (1 minute)

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_url_here
JWT_SECRET=super_secret_key_12345
OPENWEATHER_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
```

Start backend:

```bash
npm start
```

You should see: ✓ MongoDB connected successfully

## Step 3: Setup Frontend (1 minute)

```bash
cd Frontend
npm install
npm start
```

React will open automatically at `http://localhost:3000`

## Step 4: Test It Out! (1 minute)

1. **Sign Up** with any email/password
2. **Search** for a city (e.g., "London")
3. **See** real-time weather data
4. **Save** your favorite cities
5. **Update** your profile preferences

## 🎉 You're Done

Congratulations! You now have a fully functional weather app running locally.

## 🔥 Pro Tips

- First search takes a moment (API call) - be patient!
- Check browser console (F12) for any errors
- Both backend and frontend must be running
- Clear cache if you see old data

## ❌ Something Not Working?

**Port 3000 already in use?**

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

**Port 5000 already in use?**

```bash
# Same steps but for port 5000
```

**MongoDB connection failing?**

- Check your connection string
- Whitelist your IP in MongoDB Atlas
- Make sure cluster is running

**Weather API not working?**

- Verify your API key is correct
- Check if you've exceeded free tier limits
- Try a different city name

## 📱 Deploy for Free

**Backend:** [Render](https://render.com), [Railway](https://railway.app)
**Frontend:** [Vercel](https://vercel.com), [Netlify](https://netlify.com)

Just follow their GitHub integration guides!

---

Happy coding! 🌤️
