# 🧪 Testing Guide & Verification Checklist

## 🚀 Pre-Testing Setup

Before testing, ensure:

1. ✅ Backend running on [http://localhost:5000](http://localhost:5000)
2. ✅ Frontend running on [http://localhost:3000](http://localhost:3000)
3. ✅ MongoDB connected
4. ✅ OpenWeatherMap API key valid
5. ✅ .env files configured
6. ✅ No error messages in console

## 📋 Testing Checklist

### Authentication Flow

#### Signup Tests

```text
[ ] Navigate to /signup
[ ] See beautiful signup form
[ ] Fill name field
[ ] Fill email field with valid email
[ ] Fill password (minimum 6 characters)
[ ] Fill confirm password matching
[ ] Click Sign Up button
[ ] Loading spinner appears
[ ] Success: Redirect to weather page
[ ] User data stored in localStorage
```text

#### Signup Error Handling

```text
[ ] Try signup with existing email → Error shown
[ ] Try signup with mismatched passwords → Error shown
[ ] Try signup with password < 6 chars → Error shown
[ ] Try signup without filling fields → Error shown
[ ] Form clears on error
```text

#### Login Tests

```text
[ ] Navigate to /login
[ ] See beautiful login form
[ ] Fill email field
[ ] Fill password field
[ ] Click Login button
[ ] Loading spinner appears
[ ] Success: Redirect to weather page
[ ] Token stored in localStorage
[ ] User data accessible in context
```text

#### Login Error Handling

```text
[ ] Try login with invalid email → Error shown
[ ] Try login with wrong password → Error shown
[ ] Try login without filling fields → Error shown
[ ] Error message is clear and helpful
```text

### Weather Functionality

#### Weather Display

```text
[ ] Open weather page (while logged in)
[ ] Current weather card displays
[ ] City name and country shown
[ ] Current date shown
[ ] Large temperature number visible
[ ] Weather description shows (e.g., "Partly Cloudy")
[ ] Weather icon displays properly
[ ] All detail metrics show:
    [ ] Feels Like temperature
    [ ] Humidity percentage
    [ ] Wind speed
    [ ] Pressure
    [ ] Visibility
[ ] Forecast section shows 5 days
[ ] Each forecast shows date, icon, temp, condition
```text

#### City Search

```text
[ ] Type city name in search box
[ ] Press Enter or click search button
[ ] Loading spinner appears
[ ] Weather data updates for new city
[ ] Previous city data replaced
[ ] Search box clears after search
[ ] Can search multiple cities in sequence
```text

#### Search Error Handling

```text
[ ] Search for non-existent city → Error shown
[ ] Error message: "City not found"
[ ] Previous weather data still visible
[ ] Search box retains input
[ ] Can search again after error
```text

#### Temperature Unit Toggle

```text
[ ] See temperature unit button (°F or °C)
[ ] Click to toggle unit
[ ] All temperatures convert
[ ] Wind speed unit changes
[ ] Toggle works multiple times
[ ] Preference can be saved (in profile)
```text

#### Save City Feature

```text
[ ] See "⭐ Save This City" button
[ ] Click save button
[ ] City appears in "Your Saved Cities"
[ ] Can search and view multiple saved cities
[ ] Saved cities persist on page refresh
```text

### Profile Management

#### Profile Access

```text
[ ] Click profile button in header
[ ] Navigate to /profile
[ ] See account information
[ ] User name displays
[ ] User email displays
[ ] Join date displays
[ ] Cannot edit email (current design)
```text

#### Edit Profile

```text
[ ] Click edit name field
[ ] Change user name
[ ] See temperature unit selector
[ ] Select Celsius or Fahrenheit
[ ] See theme selector
[ ] Select Dark or Light mode
[ ] Click Save Changes
[ ] Success message appears
[ ] Preferences update immediately
[ ] Refresh page - preferences persist
```text

#### Saved Cities in Profile

```text
[ ] View "Saved Cities" section
[ ] See all saved cities listed
[ ] Count displays correctly
[ ] Each city shows name and country
[ ] Can view weather for any saved city
[ ] Can remove cities with button
```text

#### Logout

```text
[ ] See "🚪 Logout" button
[ ] Click logout
[ ] Token removed from localStorage
[ ] Redirect to login page
[ ] Cannot access weather page
[ ] Must login again to access
```text

### Navigation & Routing

#### Route Protection

```text
[ ] Not logged in → Try to access / → Redirect to /login
[ ] Logged in → Access / → Weather page loads
[ ] Logged in → Access /login → Redirect to /
[ ] Logged in → Access /signup → Redirect to /
[ ] Logged in → Access /profile → Profile page loads
[ ] Not logged in → Access /profile → Redirect to /login
```text

#### Navigation Flow

```text
[ ] Weather page → Click profile → Go to profile
[ ] Profile page → Click "Back to Weather" → Go to weather
[ ] Weather page → Click logout → Go to login
[ ] Login page → Click "Sign up here" → Go to signup
[ ] Signup page → Click "Login here" → Go to login
```text

### Data Persistence

#### LocalStorage

```text
[ ] After login, check localStorage
[ ] Token key exists: "token"
[ ] User data key exists: "user"
[ ] Refresh page - token still valid
[ ] Refresh page - user data accessible
[ ] Logout clears both keys
```text

#### Saved Cities in Database

```text
[ ] Save a city
[ ] Refresh page
[ ] City still appears in saved cities
[ ] Can view its weather immediately
[ ] Works across sessions
[ ] Multiple cities can be saved
```text

#### Profile Preferences

```text
[ ] Set temperature to Fahrenheit
[ ] Refresh page
[ ] Temperature unit still in Fahrenheit
[ ] All future searches show Fahrenheit
[ ] Change back to Celsius
[ ] Preference updates in database
```text

### API Integration

#### Weather API

```text
[ ] Request sent with correct city name
[ ] Receives current weather data
[ ] Receives forecast data
[ ] Data displays in correct format
[ ] Icons load from OpenWeatherMap
[ ] Multiple requests don't conflict
```text

#### Authentication API

```text
[ ] Signup sends correct data
[ ] Receives JWT token
[ ] Login sends email and password
[ ] Receives token and user data
[ ] Profile request includes token
[ ] Request without token rejected
[ ] Expired token handled gracefully
```text

### UI/UX Testing

#### Responsive Design

```text
[ ] Desktop (1200px+):
    [ ] Full width layout
    [ ] 3-column grids work
    [ ] All elements visible
    [ ] No horizontal scroll

[ ] Tablet (768px - 1199px):
    [ ] 2-column grids work
    [ ] Content readable
    [ ] No overflow
    [ ] Touch buttons accessible

[ ] Mobile (< 768px):
    [ ] 1-column layout
    [ ] Full width content
    [ ] Touch buttons large
    [ ] No horizontal scroll
    [ ] Text readable
```text

#### Visual Elements

```text
[ ] Gradient background animates
[ ] Cards have glass morphism effect
[ ] Buttons have hover effects
[ ] Text is readable on all backgrounds
[ ] Icons display properly
[ ] Images load without distortion
[ ] Loading spinner appears
[ ] Error messages are visible
```text

#### Animations

```text
[ ] Page entrance animations work
[ ] Button press animations smooth
[ ] Form error animations trigger
[ ] Gradient smoothly transitions
[ ] No animation lag or stutter
[ ] Animations don't interfere with interaction
```text

### Performance Testing

#### Load Times

```text
[ ] Login page loads < 2 seconds
[ ] Weather page loads < 3 seconds
[ ] Profile page loads < 2 seconds
[ ] Search results appear < 2 seconds
[ ] No noticeable lag on interactions
```text

#### API Performance

```text
[ ] Weather API responds quickly
[ ] Multiple searches don't slow app
[ ] Can search 5+ cities without issues
[ ] Data updates without page reload
[ ] No memory leaks on navigation
```text

### Error Scenarios

#### Network Errors

```text
[ ] Simulate offline mode
[ ] App shows network error
[ ] Can retry after reconnecting
[ ] Error messages are helpful
```text

#### API Errors

```text
[ ] Invalid API key → Clear error shown
[ ] Rate limit exceeded → Handled gracefully
[ ] Server error → User-friendly message
[ ] Timeout → Retry option provided
```text

#### Validation Errors

```text
[ ] Required fields: Shows error if empty
[ ] Email format: Validates correctly
[ ] Password length: Enforces minimum
[ ] Password match: Shows mismatch error
[ ] All errors prevent form submission
```text

## 🧑‍💻 Developer Testing Tools

### Browser DevTools

```text
1. Open DevTools (F12)
2. Check Console for errors
3. Check Network tab for API calls
4. Check Application for localStorage
5. Check Elements for CSS
6. Check Performance for lag
```text

### Postman Testing (Backend APIs)

#### Auth Endpoints

```text
POST /api/auth/signup
Body: {
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

POST /api/auth/login
Body: {
  "email": "test@example.com",
  "password": "password123"
}

GET /api/auth/profile
Headers: {
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```text

#### Weather Endpoints

```text
GET /api/weather/city/London

GET /api/weather/coordinates?lat=51.5074&lon=-0.1278

GET /api/weather/air-quality?lat=51.5074&lon=-0.1278
```text

## 📝 Test Report Template

```text
# Test Report - [Date]

## Summary
- Total Tests: ___
- Passed: ___
- Failed: ___
- Issues Found: ___

## Critical Issues
[ ] List critical bugs found

## Minor Issues
[ ] List minor bugs found

## Performance Observations
- Load time: ___ seconds
- Memory usage: ___ MB
- Responsiveness: Good/Average/Poor

## Notes
[Any additional observations]

## Approved for Release? Yes/No
```text

## 🐛 Common Issues & Solutions

### Weather not loading

```text
1. Check API key in .env
2. Verify API key has correct permissions
3. Check rate limits not exceeded
4. Verify city name is spelled correctly
5. Check network tab for API call errors
```text

### Saved cities not persisting

```text
1. Check MongoDB connection
2. Verify user ID stored correctly
3. Check database has saved_cities collection
4. Verify JWT token valid
5. Check browser localStorage not cleared
```text

### Login failing

```text
1. Verify user exists in database
2. Check password is correct
3. Verify JWT_SECRET matches
4. Check MongoDB connection
5. Review error message in console
```text

### UI not responsive

```text
1. Check media queries in CSS
2. Verify breakpoints defined
3. Test with browser dev tools
4. Clear browser cache
5. Check all CSS files loaded
```text

## ✅ Final Verification Checklist

Before considering app production-ready:

- [ ] All features tested
- [ ] No console errors
- [ ] Responsive on all devices
- [ ] Performance acceptable
- [ ] Security measures in place
- [ ] Error handling implemented
- [ ] Data persists correctly
- [ ] API calls working
- [ ] UI is beautiful
- [ ] Documentation complete

---

**Happy Testing! 🧪**
