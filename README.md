# Task Manager MERN App

A full-stack task manager/admin panel built with a React + Vite frontend and an Express + MongoDB backend.

The app includes authentication, dashboard stats, task management, task creation, and team member views. The frontend is organized with pages, routes, context, utilities, and reusable components.

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT, bcryptjs
- Uploads: multer

## Project Structure

```text
.
+-- backend
|   +-- src
|   |   +-- config
|   |   +-- controllers
|   |   +-- middlewares
|   |   +-- models
|   |   +-- routes
|   |   +-- uploads
|   +-- .env
|   +-- package.json
|   +-- server.js
+-- frontend
    +-- src
    |   +-- components
    |   +-- context
    |   +-- data
    |   +-- pages
    |   +-- routes
    |   +-- utils
    +-- package.json
    +-- vite.config.js
```

## Backend Setup

Go to the backend folder:

```bash
cd backend
npm install
```

Create or update `backend/.env`:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
DEFAULT_AVATAR_URL=your_default_avatar_url
JWT_SECRET=your_jwt_secret
ADMIN_INVITE_TOKEN=your_admin_invite_token
```

Start the backend:

```bash
npm start
```

For development with nodemon:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:8000
```

## Frontend Setup

Go to the frontend folder:

```bash
cd frontend
npm install
```

Optional frontend environment variable:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## Main API Routes

Auth:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
PUT  /api/auth/profile
POST /api/auth/upload-image
```

Tasks:

```text
GET    /api/tasks
GET    /api/tasks/dashboard-data
GET    /api/tasks/user-dashboard-data
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
PUT    /api/tasks/:id/status
PUT    /api/tasks/:id/todo
```

Users:

```text
GET /api/users
GET /api/users/:id
```

## Current Frontend Pages

- Login/Register
- Dashboard
- Manage Tasks
- Create Task
- Team Members

## Notes

- Task and user routes require a JWT token.
- Creating tasks and viewing all users require an admin account.
- To register as admin, use the backend `ADMIN_INVITE_TOKEN`.
- The frontend stores the logged-in user session in `localStorage`.

## Useful Commands

Frontend:

```bash
npm run dev
npm run build
npm run lint
```

Backend:

```bash
npm start
npm run dev
```

## Verification

Before considering changes complete, run:

```bash
cd frontend
npm run lint
npm run build
```

The backend can be checked by starting it and visiting:

```text
http://localhost:8000/api/tasks
```

Without login, this should return `401`, which means the protected route is working.
