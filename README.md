# Todo List Application - Full Stack

A modern, fully-functional Todo List application built with React (TypeScript), Node.js (TypeScript), and MongoDB. Features complete user authentication with JWT, password reset functionality, and full CRUD operations for todos.

---

##  Problem Statement Compliance

This project fulfills all requirements from the IntelliSQR Full Stack Assignment:

###  Technology Stack
- **Frontend**: React with TypeScript (No JavaScript files)
- **Backend**: Node.js with TypeScript (No JavaScript files)
- **Database**: MongoDB Atlas (Free tier)

###  Features Implemented

#### User Management
-  User Signup with validation
-  User Sign-in (Login) with JWT authentication
-  Forgot Password (Email-based reset link)
-  Reset Password with token validation

#### Todo Management
-  Create Todo
-  Update Todo (Edit title)
-  List Todos (All user todos)
-  Delete Todo
-  Mark Todo as Completed/Not Completed

#### Backend Requirements
-  Proper error handling in all routes
-  Backend errors logged into MongoDB (separate `logs` collection)
-  MongoDB Atlas free instance integration

#### Frontend Requirements
-  React Router for routing
-  Zustand for global state management
-  React Query with Zod schemas for API data fetching
-  React Hook Form for form handling
-  Modern, clean UI design

---


##  Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- npm or yarn

###  Setup

1. **Navigate to  directory**
```bash
cd intellisqr_assignment
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
JWT_SECRET=your-super-secret-jwt-key-here

```

4. **Start the application**
```bash
npm run dev
```

Application will run on `http://localhost:3000`


##  Frontend Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Landing page with app intro | No |
| `/auth/signup` | User registration page | No |
| `/auth/login` | User login page | No |
| `/auth/reset-password` | Password reset request page | No |
| `/auth/reset-password?token=xyz` | Set new password page | No |
| `/dashboard` | Main todo management dashboard | Yes |

---

## 🔌 Backend API Routes

### Base URL
```
http://localhost:3000/api
```
---

### Authentication Routes

#### 1. User Signup
**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**cURL:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

#### 2. User Login
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**cURL:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

#### 3. Forgot Password
**Endpoint:** `POST /auth/forgot-password`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**cURL:**
```bash
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

**Response (200):**
```json
{
  "message": "If the email exists, a reset link has been sent"
}
```

**Email Content:**
The user will receive an email with a reset link:
```
http://localhost:3000/auth/reset-password?token=abc123xyz789
```

---

#### 4. Reset Password
**Endpoint:** `POST /auth/reset-password`

**Request Body:**
```json
{
  "token": "abc123xyz789",
  "newPassword": "newSecurePassword456"
}
```

**cURL:**
```bash
curl -X POST http://localhost:3000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "abc123xyz789",
    "newPassword": "newSecurePassword456"
  }'
```

**Response (200):**
```json
{
  "message": "Password reset successful"
}
```

---

###  Todo Routes (Protected - Requires JWT)

#### 5. Get All Todos
**Endpoint:** `GET /todos`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**cURL:**
```bash
curl -X GET http://localhost:3000/api/todos/list \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Response (200):**
```json
{
  "todos": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Buy groceries",
      "completed": false,
      "userId": "507f1f77bcf86cd799439012",
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Finish project",
      "completed": true,
      "userId": "507f1f77bcf86cd799439012",
      "createdAt": "2025-01-14T09:20:00.000Z",
      "updatedAt": "2025-01-15T11:45:00.000Z"
    }
  ]
}
```

---

#### 6. Create Todo
**Endpoint:** `POST /todos`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Learn TypeScript"
}
```

**cURL:**
```bash
curl -X POST http://localhost:3000/api/todos/create \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn TypeScript"
  }'
```

**Response (201):**
```json
{
  "todo": {
    "_id": "507f1f77bcf86cd799439014",
    "title": "Learn TypeScript",
    "completed": false,
    "userId": "507f1f77bcf86cd799439012",
    "createdAt": "2025-01-15T12:00:00.000Z",
    "updatedAt": "2025-01-15T12:00:00.000Z"
  }
}
```

---

#### 7. Update Todo
**Endpoint:** `PATCH /todos/:id`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Learn Advanced TypeScript",
  "completed": true
}
```

**cURL:**
```bash
curl -X PUT http://localhost:3000/api/todos/update \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Advanced TypeScript",
    "completed": true
  }'
```

**Response (200):**
```json
{
  "todo": {
    "_id": "507f1f77bcf86cd799439014",
    "title": "Learn Advanced TypeScript",
    "completed": true,
    "userId": "507f1f77bcf86cd799439012",
    "createdAt": "2025-01-15T12:00:00.000Z",
    "updatedAt": "2025-01-15T12:30:00.000Z"
  }
}
```

---

#### 8. Toggle Todo Completion
**Endpoint:** `PATCH /todos/:id/toggle`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**cURL:**
```bash
curl -X PUT http://localhost:3000/api/todos/toggle \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Response (200):**
```json
{
  "todo": {
    "_id": "507f1f77bcf86cd799439014",
    "title": "Learn Advanced TypeScript",
    "completed": false,
    "userId": "507f1f77bcf86cd799439012",
    "createdAt": "2025-01-15T12:00:00.000Z",
    "updatedAt": "2025-01-15T12:35:00.000Z"
  }
}
```

---

#### 9. Delete Todo
**Endpoint:** `DELETE /todos/:id`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**cURL:**
```bash
curl -X DELETE http://localhost:3000/api/todos/delete \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Response (200):**
```json
{
  "message": "Todo deleted successfully"
}
```

---

##  Database Schema

### User Collection
```typescript
{
    name: string;
    email: string;
    password: string;
    resetToken?: string | null;
    resetTokenExpiry?: Date | null;
}
```

### Todo Collection
```typescript
{
    userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
}
```

### Log Collection (Error Logging)
```typescript
{
    message: string;
    stack?: string;
    route: string;
    timestamp: Date;
}
```

---

##  Authentication Flow

1. **User Signup** → Password hashed with bcrypt → User stored in DB
2. **User Login** → Password verified → JWT token generated and returned
3. **Protected Routes** → JWT token sent in `Authorization` header → Middleware verifies token
4. **Forgot Password** → Reset token generated → Email sent with reset link
5. **Reset Password** → Token validated → Password updated → Old token invalidated

---

##  Error Handling

All backend errors are:
- Caught using try-catch blocks
- Logged to MongoDB `logs` collection with details:
  - Error message
  - Stack trace
  - Route and HTTP method
  - User ID (if authenticated)
  - Timestamp
- Returned to client with appropriate HTTP status codes

**Example Error Response:**
```json
{
  "error": "Invalid credentials",
  "statusCode": 401
}
```

---

##  State Management

### React Query (Data Fetching)
- `useTodos()` - Fetch all todos
- `useCreateTodo()` - Create new todo
- `useUpdateTodo()` - Update existing todo
- `useToggleTodo()` - Toggle completion status
- `useDeleteTodo()` - Delete todo

All queries use Zod schemas for runtime validation.

---

##  Demo Video

**Video Link:** [Google Drive Link Here]

The demo video showcases:
-  Homepage
-  Signup
-  Login
-  Adding a Todo
-  Updating a Todo (editing title)
-  Marking Todo as completed/not completed
-  Deleting a Todo
-  Logout

*(No voiceover - screen recording only)*

---

## 🔧 Key Assumptions

1. **Email Service**: Using Ethereal SMTP for password reset emails. 

2. **Token Expiry**: 
   - JWT tokens expire in 7 days
   - Password reset tokens expire in 1 hour


4. **Todo Ownership**: Users can only view, edit, and delete their own todos

5. **Environment**: Development setup with CORS enabled for localhost

6. **Error Logging**: All errors logged to MongoDB. 

7. **File Upload**: Not implemented (todos are text-only)

---


**Submitted by:** Shubham Verma  
**Date:** 16/11/2025  
**GitHub Repository:** [Your GitHub Link]  
**Demo Video:** [Your Google Drive Link]

---

