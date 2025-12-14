$content = @'
### 🎬 MERN Stack Movie Application

MERN STACK APPLICATION

This is a full-stack Movie Management System developed using the MERN stack. The application allows users to browse, search, and sort movies, while admins can manage movie records through an admin dashboard.

This project focuses on REST API design, authentication, role-based access control, pagination, and deployment.

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