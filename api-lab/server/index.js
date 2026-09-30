const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY || 'mysecretkey123';

// Core Middleware
app.use(express.json());
app.use(cors());

// Global Logger Middleware (Q1c)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Authentication Middleware for Write Operations (Q1c)
const requireApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid or missing x-api-key header'
    });
  }
  next();
};

// In-Memory Tasks Dataset (At least 5 objects) (Q1b)
let tasks = [
  { id: 1, title: 'Learn Node.js Core Modules', completed: true },
  { id: 2, title: 'Build Express REST API Endpoints', completed: true },
  { id: 3, title: 'Implement CORS & Authentication Middleware', completed: false },
  { id: 4, title: 'Consume REST API with Plain JavaScript Client', completed: false },
  { id: 5, title: 'Build React Task Manager with Vite & Axios', completed: false }
];

// Next auto-incrementing ID
let nextId = 6;

// ==========================================
// REST API ROUTES (Q1b)
// ==========================================

// GET /api/tasks - Fetch all tasks
app.get('/api/tasks', (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// GET /api/tasks/:id - Fetch single task by ID
app.get('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${taskId} not found`
    });
  }

  res.status(200).json({
    success: true,
    data: task
  });
});

// POST /api/tasks - Create new task (Protected by API key)
app.post('/api/tasks', requireApiKey, (req, res) => {
  const { title, completed } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: "title" is required and must be a non-empty string'
    });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    completed: completed !== undefined ? Boolean(completed) : false
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: newTask
  });
});

// PUT /api/tasks/:id - Update existing task by ID (Protected by API key)
app.put('/api/tasks/:id', requireApiKey, (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${taskId} not found`
    });
  }

  const { title, completed } = req.body;

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: "title" must be a non-empty string'
      });
    }
    tasks[taskIndex].title = title.trim();
  }

  if (completed !== undefined) {
    tasks[taskIndex].completed = Boolean(completed);
  }

  res.status(200).json({
    success: true,
    message: `Task ${taskId} updated successfully`,
    data: tasks[taskIndex]
  });
});

// DELETE /api/tasks/:id - Delete task by ID (Protected by API key)
app.delete('/api/tasks/:id', requireApiKey, (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${taskId} not found`
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: `Task ${taskId} deleted successfully`,
    data: deletedTask
  });
});

// ==========================================
// ERROR HANDLING MIDDLEWARE (Q2c)
// ==========================================

// 404 Handler for Unmatched Endpoints
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Centralized Error Handler (4 arguments)
app.use((err, req, res, next) => {
  console.error('Centralized Error Logger:', err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Task Manager API running on http://localhost:${PORT}`);
  console.log(`🔑 Protected write endpoints require 'x-api-key: ${API_KEY}' header`);
});
