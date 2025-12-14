### 🎬 MERN Stack Movie Application

MERN STACK APPLICATION

This is a full-stack Movie Management System developed using the MERN stack. The application allows users to browse, search, and sort movies, while admins can manage movie records through an admin dashboard.

This project focuses on REST API design, authentication, role-based access control, pagination, and deployment.

PROJECT URL = https://mern-stack-movie-application.vercel.app

**Prerequisites**
- Node.js v16+ and npm
- MongoDB (local or Atlas)
- Redis (e.g., Upstash) for job queue
- Ports: frontend default 5173, backend default 3000

**Environment**
Create a .env file in the backend/ folder with:
```env
MONGODB_URL=<your_mongodb_connection_string>
REDIS_URL=<your_redis_url>
JWT_SECRET=<your_jwt_secret>
PORT=3000

Backend Setup

cd backend
npm install
npm run build
npm run start

npm run dev

Frontend Setup

Install and run dev server:

cd frontend
npm install
npm run dev

Build for production:


npm run build
npm run preview

API Documentation
Base path: /api/v1

Auth

POST /api/v1/auth/register
Auth: none
Body: { "username", "email", "password", "role" } (role = "user" | "admin")
Success: 200 — user object + token
POST /api/v1/auth/login
Auth: none
Body: { "email", "password" }
Success: 200 — user object + token
GET /api/v1/auth/me
Auth: Bearer token required
Success: 200 — current user (req.user)
Movies (requires auth)

Movies (requires auth)

GET /api/v1/movies
Auth: Bearer token required
Query params: genre, sortBy (rating|year|title|duration, default rating), order (asc|desc, default desc), page (default 1), limit (default 10)
Success: 200 { success, total, page, totalPages, data }
GET /api/v1/movies/search
Auth: Bearer token required
Query params: q (required), page, limit
Success: 200 search results with pagination
POST /api/v1/import-top-250
Auth: Admin only
Behavior: queues import jobs for Top 250 IMDB IDs

Admin (admin-only)

POST /api/v1/admin/movies
Auth: Admin only
Body: { imdbId?, title, description?, releaseYear, duration?, genre?, imdbRating?, poster? }
Success: 201 created movie
PUT /api/v1/admin/movies/:id
Auth: Admin only
Body: fields to update
Success: 200 updated movie
DELETE /api/v1/admin/movies/:id
Auth: Admin only
Success: 200 deletion confirmation
```