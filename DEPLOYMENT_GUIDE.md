# Deployment Guide for Carbon Footprint App

## What Was Fixed

✅ **API Endpoint Mismatch** - Updated paths to `/api/auth/login` and `/api/auth/register`
✅ **Password Hashing** - Implemented bcryptjs for secure password storage
✅ **Environment Variables** - Added support for different environments (dev/prod)
✅ **Security** - Added .env to .gitignore to prevent credential leaks
✅ **Input Validation** - Added validation for registration and login
✅ **Dependency Vulnerabilities** - Fixed all npm audit warnings

## Required Setup

### Backend Setup
1. Install dependencies:
   ```bash
   cd carbon-footprint-backend
   npm install
   ```

2. Update `.env` file with your production credentials:
   ```env
   DB_HOST=your_production_host
   DB_USER=your_db_user
   DB_PASSWORD=your_secure_password
   DB_NAME=carbon_tracker
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=production
   ```

3. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   cd carbon-footprint-reduction/vite-project
   npm install
   ```

2. Update `.env.local` for development or create `.env.production` for production:
   ```env
   # For production:
   VITE_API_URL=https://your-api-domain.com
   
   # For development:
   VITE_API_URL=http://localhost:5000
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## Database Requirements

Make sure your MySQL database has the users table:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Important Notes for Production

1. **Environment Variables**: Never commit `.env` files. Use `.env.example` as a template.
2. **SSL/HTTPS**: Always use HTTPS in production.
3. **Password Reset**: Consider implementing password reset functionality.
4. **Rate Limiting**: Add rate limiting to auth endpoints to prevent brute force attacks.
5. **JWT Implementation**: Consider implementing JWT tokens for better security.
6. **CORS**: Update CORS configuration to only allow your production domain.
7. **Database Backups**: Regular backups are essential.

## Deployment Platforms

### Frontend (Vite Build)
- **Vercel** - `npm run build` then deploy the `dist` folder
- **Netlify** - Connect GitHub repo, auto-deploys on push
- **AWS S3 + CloudFront** - Static hosting solution
- **GitHub Pages** - Free static hosting for builds

### Backend (Node.js/Express)
- **Railway.app** - Simple Node.js deployment
- **Render** - Free tier available for Node.js
- **AWS EC2** - Full control over server
- **DigitalOcean** - Affordable VPS hosting
- **Heroku** - Simple one-click deployment (paid)

## Testing Before Deployment

1. Test registration with a new user
2. Test login with correct credentials
3. Test login with incorrect credentials
4. Verify password hashing (check database - passwords should be hashed)
5. Test protected routes (Calculator, Dashboard, Suggestions)
6. Test navigation and UI consistency

## Need Help?

- Check error logs: Backend logs appear in terminal, frontend logs in browser console
- Database connection issues: Verify credentials in `.env`
- API endpoint errors: Check that backend is running on correct port
- CORS errors: Update CORS settings in `server.js`
