# 📦 Installation & Dependency Guide

## Backend Dependencies

### Backend Required Packages

| Package | Purpose | Usage |
|---------|---------|-------|
| axios | HTTP requests to weather API | Fetch data from OpenWeatherMap |
| bcrypt | Password hashing | Secure user passwords |
| cors | Cross-origin requests | Allow frontend to access API |
| dotenv | Environment variables | Load .env configuration |
| express | Web framework | Server routing and middleware |
| jsonwebtoken | JWT authentication | User session management |
| mongoose | MongoDB ODM | Database operations |

### Development Packages

| Package | Purpose | Usage |
|---------|---------|-------|
| nodemon | Auto-reload during development | Watch file changes |

## Frontend Dependencies

### Required Packages

| Package | Purpose | Usage |
|---------|---------|-------|
| react | UI library | Build user interface |
| react-dom | DOM rendering | Render React components |
| react-router-dom | Client-side routing | Navigation between pages |
| axios | HTTP client | Make API requests |

**Note**: No external CSS frameworks - pure CSS3!

## Installation Instructions

### Backend Setup

```bash
cd backend
npm install
```

Verify installation:

```bash
npm list
```

### Frontend Setup

```bash
cd Frontend
npm install
```

Verify installation:

```bash
npm list
```

## Package Verification

### Backend Packages

To check if all packages installed correctly:

```bash
cd backend
npm list --depth=0
```

Expected output shows:

- axios@1.4.0 or higher
- bcrypt@5.1.0 or higher
- cors@2.8.5 or higher
- dotenv@16.0.3 or higher
- express@4.18.2 or higher
- jsonwebtoken@9.0.0 or higher
- mongoose@7.5.0 or higher
- nodemon@3.0.1 or higher (dev)

### Frontend Packages

To check if all packages installed correctly:

```bash
cd Frontend
npm list --depth=0
```

Expected output shows:

- react@18.2.0 or higher
- react-dom@18.2.0 or higher
- react-router-dom@7.9.6 or higher
- axios@1.13.2 or higher

## Troubleshooting Dependencies

### Issue: npm command not found

**Solution**: Install Node.js from [nodejs.org](https://nodejs.org)

```bash
# Verify installation
node --version
npm --version
```

### Issue: Permission denied (Mac/Linux)

**Solution**: Use sudo with caution

```bash
sudo npm install -g npm@latest
```

### Issue: node_modules folder too large

**Solution**: Delete and reinstall cleanly

```bash
rm -rf node_modules
npm install
```

### Issue: Old packages causing conflicts

**Solution**: Clear npm cache and reinstall

```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### Issue: Dependencies not installing

**Solution**: Use different registry or retry

```bash
npm install --legacy-peer-deps
```

## Detailed Package Information

### Backend

**Express.js**: Web server framework for Node.js

- Handles HTTP requests/responses
- Middleware support
- Routing system

**Mongoose**: MongoDB Object Data Modeling

- Schema definition
- Data validation
- Query building

**bcrypt**: Password hashing library

- Secure password storage
- Salt generation
- Password comparison

**JWT (jsonwebtoken)**: Token-based authentication

- Create tokens
- Verify tokens
- Handle expiration

**Axios**: HTTP client library

- Make API requests
- Handle responses
- Error handling

**CORS**: Cross-Origin Resource Sharing middleware

- Allow frontend requests
- Configure allowed origins
- Handle preflight requests

**Dotenv**: Environment variable loader

- Load .env file
- Access configuration
- Keep secrets safe

### Frontend

**React**: JavaScript library for UI

- Component-based architecture
- State management
- Virtual DOM

**React Router DOM**: Routing library

- Client-side navigation
- Dynamic route matching
- History management

**Axios**: HTTP client for API calls

- Intercept requests
- Handle errors
- Transform data

## Node.js and npm Versions

### Minimum Requirements

- **Node.js**: v14.x or higher
- **npm**: v6.x or higher

### Recommended Versions

- **Node.js**: v18.x LTS or v20.x LTS
- **npm**: v9.x or higher

## File Locations

### Backend package.json

```text
Weather/backend/package.json
```

### Frontend package.json

```text
Weather/Frontend/package.json
```

## Disk Space Requirements

When dependencies are installed:

- Backend node_modules: ~500 MB
- Frontend node_modules: ~300 MB
- Total: ~800 MB

Make sure you have at least 1 GB of free disk space.

## Installation Time

Typical installation times:

- Backend dependencies: 1-3 minutes
- Frontend dependencies: 1-2 minutes
- Total first install: 3-5 minutes

Speed depends on internet connection and system performance.

## Update Dependencies

To update to latest versions:

```bash
# Check for updates
npm outdated

# Update all packages
npm update

# Update specific package
npm install package-name@latest
```

## Ready to Deploy

Once all dependencies are installed successfully, your project is ready to:

1. Start the development servers
2. Deploy to production
3. Add more packages as needed

Enjoy building with your weather app!
