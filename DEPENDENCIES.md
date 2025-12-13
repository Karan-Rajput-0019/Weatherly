# 📦 Installation & Dependency Guide

## Backend Dependencies Installed

### Backend package.json includes:
```json
{
  "axios": "^1.4.0",       // HTTP requests to weather API
  "bcrypt": "^5.1.0",      // Password hashing
  "cors": "^2.8.5",        // Cross-origin requests
  "dotenv": "^16.0.3",     // Environment variables
  "express": "^4.18.2",    // Web framework
  "jsonwebtoken": "^9.0.0", // JWT authentication
  "mongoose": "^7.5.0"     // MongoDB ODM
}
```

### Backend DevDependencies:
```json
{
  "nodemon": "^3.0.1"      // Auto-reload during development
}
```

## Frontend Dependencies Installed

### Frontend package.json includes:
```json
{
  "axios": "^1.13.2",           // HTTP client
  "react": "^18.2.0",           // UI library
  "react-dom": "^18.2.0",       // DOM rendering
  "react-router-dom": "^7.9.6"  // Client-side routing
}
```

No external CSS frameworks - pure CSS3!

## 🔧 Installation Commands

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install all dependencies
npm install

# Or with yarn
yarn install

# Install specific versions if needed
npm install express@^4.18.2 mongoose@^7.5.0 bcrypt@^5.1.0 jsonwebtoken@^9.0.0 cors@^2.8.5 dotenv@^16.0.3 axios@^1.4.0 nodemon@^3.0.1 --save
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd Frontend

# Install all dependencies
npm install

# Or with yarn
yarn install
```

## ✅ Verification Steps

### Backend Verification
```bash
cd backend

# Check if node_modules exists
ls -la node_modules

# Verify Express is installed
npm list express

# Start the server (should run on port 5000)
npm start

# Expected output:
# ✓ MongoDB connected successfully
# ✓ Backend running on port 5000
```

### Frontend Verification
```bash
cd Frontend

# Check if node_modules exists
ls -la node_modules

# Verify React is installed
npm list react

# Start the dev server (should open http://localhost:3000)
npm start

# Expected: React app opens in browser
```

## 📋 Pre-Installation Checklist

Before running `npm install`, ensure you have:

- [ ] Node.js v14+ installed (`node --version`)
- [ ] npm v6+ installed (`npm --version`)
- [ ] MongoDB installed or MongoDB Atlas account
- [ ] OpenWeatherMap API key
- [ ] Text editor (VS Code recommended)
- [ ] Git installed (for version control)
- [ ] Active internet connection

## 🚨 Common Installation Issues

### Issue: npm command not found
**Solution:**
```bash
# Download and install Node.js from nodejs.org
# This automatically installs npm
# Verify installation:
node --version
npm --version
```

### Issue: Permission denied (Mac/Linux)
**Solution:**
```bash
# Use sudo if necessary
sudo npm install

# Or fix npm permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
source ~/.bashrc
```

### Issue: node_modules folder too large
**Solution:**
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use npm ci for cleaner install
npm ci
```

### Issue: Old packages causing conflicts
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Update npm itself
npm install -g npm@latest

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Dependencies not installing
**Solution:**
```bash
# Check npm registry
npm config set registry https://registry.npmjs.org/

# Try with verbose output
npm install --verbose

# Use different version of npm
npm install -g npm@9.0.0
npm install
```

## 🔍 Dependency Details

### Why Each Package?

#### Backend
| Package | Purpose | Usage |
|---------|---------|-------|
| Express | Web framework | API server |
| MongoDB/Mongoose | Database & ODM | User data storage |
| Bcrypt | Password hashing | Secure passwords |
| JWT | Authentication | User sessions |
| Axios | HTTP client | Weather API calls |
| CORS | Cross-origin | Frontend-backend communication |
| Dotenv | Config management | Environment variables |
| Nodemon | Dev tool | Auto-reload on file changes |

#### Frontend
| Package | Purpose | Usage |
|---------|---------|-------|
| React | UI library | Components and UI |
| React-DOM | React renderer | Browser rendering |
| React-Router | Navigation | Page routing |
| Axios | HTTP client | API calls |

## 📥 npm vs yarn

### Using npm (included with Node.js)
```bash
npm install          # Install dependencies
npm install package  # Add new package
npm update          # Update packages
npm uninstall pkg   # Remove package
npm list            # Show installed packages
npm start           # Run start script
```

### Using yarn (alternative)
```bash
yarn install        # Install dependencies
yarn add package    # Add new package
yarn upgrade        # Update packages
yarn remove pkg     # Remove package
yarn list           # Show installed packages
yarn start          # Run start script
```

## 🌐 Environment Setup

### Node.js Versions
- **Recommended**: v18.x LTS or v20.x LTS
- **Minimum**: v14.x
- **Check version**: `node --version`

### npm Versions
- **Recommended**: v9.x or higher
- **Update npm**: `npm install -g npm@latest`

## 📚 Package.json Files

### Backend package.json location
```
Weather/backend/package.json
```

### Frontend package.json location
```
Weather/Frontend/package.json
```

Both files are pre-configured with all necessary dependencies!

## 🔐 Security Notes

All packages are from official npm registry. Before using in production:

1. Run security audit:
   ```bash
   npm audit
   npm audit fix
   ```

2. Keep packages updated:
   ```bash
   npm outdated
   npm update
   ```

3. Review package vulnerabilities:
   ```bash
   npm audit --audit-level=moderate
   ```

## 💾 Storage Requirements

Approximate disk space after npm install:
- Backend node_modules: ~500 MB
- Frontend node_modules: ~800 MB
- Total: ~1.3 GB

**Tip**: Add `node_modules/` to `.gitignore` (already done!)

## 🔄 Reinstalling Dependencies

If you have issues, start fresh:

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Frontend
cd ../Frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## ✨ Ready to Go!

Once all packages are installed, you can run:

```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Start frontend
cd Frontend
npm start
```

Both should run without errors!

---

**For quick start, see [QUICKSTART.md](QUICKSTART.md)**
