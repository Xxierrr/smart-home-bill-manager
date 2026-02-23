# SmartHome Bill Manager - Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager
- **Git** (optional, for version control)

## Installation Steps

### 1. Clone or Download the Project

```bash
git clone <repository-url>
cd smarthome-bill-manager
```

### 2. Install Root Dependencies

```bash
npm install
```

This will install `concurrently` for running both servers simultaneously.

### 3. Install Client Dependencies

```bash
cd client
npm install
cd ..
```

This installs React, Tailwind CSS, Recharts, and other frontend dependencies.

### 4. Install Server Dependencies

```bash
cd server
npm install
cd ..
```

This installs Express, MongoDB, JWT, and other backend dependencies.

### 5. Set Up Environment Variables

#### Server Environment (.env)

Create a `.env` file in the `server` directory:

```bash
cd server
copy .env.example .env
```

Edit `server/.env` with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smarthome
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**Important:** Change `JWT_SECRET` to a strong, random string in production!

#### Client Environment (optional)

Create `client/.env` if you need custom API URL:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 6. Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
net start MongoDB
```

**macOS (Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 7. Run the Application

From the root directory, run both servers:

```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

Or run them separately:

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

## Verification

### Check Backend

Visit: http://localhost:5000/health

You should see:
```json
{
  "status": "OK",
  "message": "SmartHome Bill Manager API is running"
}
```

### Check Frontend

Visit: http://localhost:5173

You should see the login page with the SmartHome logo.

## Default Test Account (After Registration)

1. Go to http://localhost:5173/register
2. Create an account with:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: password123

3. Login and start using the application!

## Project Structure

```
smarthome-bill-manager/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   └── layout/       # Layout components
│   │   ├── pages/            # Page components
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                    # Node.js Backend
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   ├── models/           # MongoDB models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Custom middleware
│   │   └── server.js         # Entry point
│   ├── .env.example
│   └── package.json
│
├── README.md
├── API_ENDPOINTS.md
├── DATABASE_SCHEMA.md
├── DESIGN_SYSTEM.md
└── package.json
```

## Common Issues & Solutions

### Issue: MongoDB Connection Error

**Error:** `MongoServerError: connect ECONNREFUSED`

**Solution:**
- Ensure MongoDB is running: `mongod --version`
- Check MongoDB service status
- Verify MONGODB_URI in `.env` file

### Issue: Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
- Change PORT in `server/.env` to another port (e.g., 5001)
- Or kill the process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # macOS/Linux
  lsof -ti:5000 | xargs kill -9
  ```

### Issue: Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
- Delete `node_modules` and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### Issue: Tailwind Styles Not Loading

**Solution:**
- Ensure `tailwind.config.js` is in the client directory
- Restart the Vite dev server
- Clear browser cache

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- Frontend: Vite automatically reloads on file changes
- Backend: Nodemon restarts server on file changes

### Database Management

View your MongoDB data using:
- **MongoDB Compass** (GUI) - [Download](https://www.mongodb.com/products/compass)
- **mongosh** (CLI) - Comes with MongoDB

Connect to: `mongodb://localhost:27017/smarthome`

### API Testing

Use tools like:
- **Postman** - [Download](https://www.postman.com/)
- **Thunder Client** (VS Code extension)
- **curl** (command line)

Example API call:
```bash
curl http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","firstName":"Test","lastName":"User"}'
```

## Building for Production

### Build Frontend

```bash
cd client
npm run build
```

This creates an optimized build in `client/dist/`

### Deploy Backend

1. Set `NODE_ENV=production` in `.env`
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server/src/server.js --name smarthome-api
   ```

### Environment Variables for Production

Update these in production:
- Use a strong `JWT_SECRET`
- Use MongoDB Atlas or hosted MongoDB
- Set proper CORS origins
- Enable HTTPS

## Next Steps

1. ✅ Complete user registration
2. ✅ Set up household profile
3. ✅ Add your first bill
4. ✅ Explore the dashboard
5. ✅ Check analytics and insights

## Support

For issues or questions:
- Check documentation in the `/docs` folder
- Review API endpoints in `API_ENDPOINTS.md`
- Check database schema in `DATABASE_SCHEMA.md`

## License

MIT License - See LICENSE file for details
