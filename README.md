# Task Manager

A full-stack **Task Management System** built with the **MERN Stack** that helps teams and individuals manage tasks efficiently. This application provides authentication, role-based access, dashboard analytics, task assignment, checklist tracking, and user management.

---

## Features

### Authentication & Authorization

- User Registration & Login
- JWT-based Authentication
- Protected Routes
- Role-Based Access Control (**Admin & User**)

### Task Management

- Create Tasks
- Update Existing Tasks
- Delete Tasks
- Assign Tasks to Team Members
- Update Task Status
- Task Checklist / Todo Management

### Dashboard Analytics

- Admin Dashboard
- User Dashboard
- Task Insights & Statistics
- Recent Task Activity

### Team Management

- View Team Members
- User Profile Management
- Role-Based User Access

### Image Upload Support

- Profile image upload using **Multer**

---

## Tech Stack

### Frontend

- **React.js**
- **Vite**
- **Tailwind CSS**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT Authentication**
- **bcryptjs**
- **Multer**

---

## 📂 Project Structure

```bash
task-manager/
│── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── uploads/
│   ├── package.json
│   └── server.js
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── assets/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/rishabhbishtuk12/task-manager.git
cd task-manager
```

---

### 2. Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

Start backend server:

```bash
npm run dev
```

Server will run on:

```bash
http://localhost:5000
```

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

## API Endpoints

### Authentication

| Method | Endpoint                 | Description      |
| ------ | ------------------------ | ---------------- |
| POST   | `/api/auth/register`     | Register user    |
| POST   | `/api/auth/login`        | Login user       |
| GET    | `/api/auth/profile`      | Get user profile |
| PUT    | `/api/auth/profile`      | Update profile   |
| POST   | `/api/auth/upload-image` | Upload image     |

### Tasks

| Method | Endpoint                         | Description              |
| ------ | -------------------------------- | ------------------------ |
| GET    | `/api/tasks`                     | Get all tasks            |
| GET    | `/api/tasks/:id`                 | Get task by ID           |
| POST   | `/api/tasks`                     | Create task (Admin Only) |
| PUT    | `/api/tasks/:id`                 | Update task              |
| DELETE | `/api/tasks/:id`                 | Delete task (Admin Only) |
| PUT    | `/api/tasks/:id/status`          | Update task status       |
| PUT    | `/api/tasks/:id/todo`            | Update checklist         |
| GET    | `/api/tasks/dashboard-data`      | Admin dashboard          |
| GET    | `/api/tasks/user-dashboard-data` | User dashboard           |

### Users

| Method | Endpoint         | Description    |
| ------ | ---------------- | -------------- |
| GET    | `/api/users`     | Get all users  |
| GET    | `/api/users/:id` | Get user by ID |

---

## Environment Variables

Backend `.env` variables:

```env
PORT=
MONGO_URI=
JWT_SECRET=
CLIENT_URL=
```

---

## Future Improvements

- Email Notifications
- Task Deadlines & Reminders
- Real-time Collaboration
- Dark Mode
- Drag & Drop Task Board
- Task Priority Filters

---

## Contributing

Contributions are welcome.

Fork the repository and create a pull request.

---

## Author

**Rishabh Bisht**
