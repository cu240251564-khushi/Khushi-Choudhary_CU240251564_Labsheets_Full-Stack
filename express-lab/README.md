# Lab Sheet 5 — Express.js (Practical)

**Student Name:** Khushi Choudhary  
**Roll Number:** CU240251564  
**Course:** Full Stack Web Development  

---

## 📌 Project Overview
This project is a complete practical implementation of **Lab Sheet 5 (Express.js)** covering core Express.js concepts:
- **Project Setup & Environment Config** (`dotenv`, `nodemon`)
- **Basic Routing & Body Parsing** (`express.json()`, `express.urlencoded()`)
- **Route Parameters & Query Strings** (`req.params`, `req.query`)
- **Custom Middleware & Protected Admin Routes** (`x-api-key` header check)
- **Modular Routing with `express.Router()`** (`/api/students`, `/api/books`, `/api/members`)
- **Full REST API (CRUD operations)** for Books & Library Members
- **Centralized Error Handling** & 404 Route Not Found handling
- **Static File Serving** (`express.static('public')`)

---

## 📁 Directory Structure
```text
express-lab/
├── index.js              # Main Express server entry point
├── .env                  # Environment variables (PORT=4000)
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies & scripts
├── public/               # Static web assets
│   ├── index.html        # HTML landing page
│   └── style.css         # Stylesheet
└── routes/               # Modular Express routers
    ├── admin.js          # Admin protected routes & header auth middleware
    ├── books.js          # Books REST API (Full CRUD)
    ├── members.js        # Library Members REST API (Full CRUD)
    └── students.js       # Students router
```

---

## 🚀 How to Run the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Server in Development Mode (with Nodemon)
```bash
npm run dev
```
The server will run at: `http://localhost:4000`

---

## 🧪 API Endpoints Reference & Testing Guide

| Method | Endpoint | Description | Sample Request / Headers |
|---|---|---|---|
| `GET` | `/` | Root / Static HTML | Browser or Postman |
| `GET` | `/about` | Returns student details | - |
| `GET` | `/courses` | Returns courses list | - |
| `POST` | `/echo` | Echoes request body | Body: `{ "test": "data" }` |
| `GET` | `/search?name=Khushi&age=20` | Reads query params | Query: `name=Khushi&age=20` |
| `GET` | `/products/:category/:id` | Route parameters | `GET /products/tech/101` |
| `POST` | `/register` | JSON registration | Body: `{ "name": "Khushi", "email": "khushi@example.com" }` |
| `POST` | `/contact` | Form urlencoded | Body: `name=Khushi&msg=Hello` |
| `GET` | `/admin/dashboard` | Protected Route | Header: `x-api-key: secret123` |
| `GET` | `/api/students` | Get all students | - |
| `GET` | `/api/students/:id` | Get student by ID | `GET /api/students/1` |
| `GET` | `/api/books` | Get all books | - |
| `GET` | `/api/books/:id` | Get book by ID | `GET /api/books/1` |
| `POST` | `/api/books` | Create new book | Body: `{ "title": "Node.js Guide", "author": "John" }` |
| `PUT` | `/api/books/:id` | Update book | Body: `{ "title": "Updated Title" }` |
| `DELETE`| `/api/books/:id` | Delete book | `DELETE /api/books/1` |
| `GET` | `/api/members` | Get all members | - |
| `POST` | `/api/members` | Add library member | Body: `{ "name": "Alice", "status": "Active" }` |

---

## 📸 Postman Screenshots Guidance
For lab submission, test each endpoint in Postman / Thunder Client:
1. `GET http://localhost:4000/about`
2. `POST http://localhost:4000/echo`
3. `GET http://localhost:4000/admin/dashboard` (Without header -> `403 Forbidden`, With `x-api-key` header -> `200 OK`)
4. Full CRUD operations for `http://localhost:4000/api/books` (GET, GET by ID, POST, PUT, DELETE)
5. `GET http://localhost:4000/api/books/999` (Returns `404 Book not found` error via error middleware)
