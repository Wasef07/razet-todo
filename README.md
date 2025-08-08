
# Razet - Todo App

A full-stack todo list application built with React, Node.js, Express, and PostgreSQL for efficient task management.

---

## Features

1. Responsive React frontend  
2. RESTful API with Node.js & Express  
3. Local user sign-up and sign-in  
4. Persistent task storage in PostgreSQL  
5. Modular and scalable architecture  

---

## Tech Stack

1. Frontend: React  
2. Backend: Node.js, Express  
3. Database: PostgreSQL  
4. Authentication: Basic local sign-up/sign-in with session management  

---

## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/yourusername/razet-todo.git
   cd razet-todo
   ```

2. **Backend setup**  
   ```bash
   cd backend
   npm install
   # Configure your PostgreSQL connection in `.env`
   npm start
   ```

3. **Frontend setup**  
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

---

## Environment Variables Setup

### Backend

Create a `.env` file inside the `backend` folder by copying the example file:

```bash
cp backend/.env.example backend/.env
```

Edit the `.env` file and update the following variables with your configuration:

```env
PG_USER=your_db_username
PG_HOST=your_db_host
PG_DATABASE=your_db_name
PG_PASSWORD=your_db_password
PG_PORT=5432
SESSION_SECRET=your_session_secret
```

- `PG_USER`, `PG_HOST`, `PG_DATABASE`, `PG_PASSWORD`, `PG_PORT`: Your PostgreSQL database credentials.  
- `SESSION_SECRET`: Secret key used for session management.

### Frontend

Create a `.env` file inside the `frontend` folder:

```bash
cp frontend/.env.example frontend/.env
```

Update the backend API URL:

```env
VITE_REACT_APP_BACKEND_BASEURL=http://localhost:3000
```

This URL should match your backend server’s address and port.

---

## Usage

1. Create an account using the sign-up form.  
2. Log in with your credentials to manage your todo tasks.  
3. Add, edit, and delete tasks seamlessly.  
4. Tasks are stored locally per user in the PostgreSQL database.

---

## Folder Structure

```
razet-todo/
├── backend/        # Node.js, Express API and database models  
├── frontend/       # React app  
├── README.md       # Project documentation  
```
