require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// Part D #11: Request Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Part E #14: JSON & URL-encoded Form Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Part I #25: Serve Static Files
app.use(express.static('public'));

// Part A #3: Basic Root GET Route
app.get('/', (req, res) => res.send('Express Lab Running'));

// Part B #5: GET /about
app.get('/about', (req, res) => {
  res.json({ name: 'Khushi Choudhary', rollNumber: 'CU240251564' });
});

// Part B #6: GET /courses
app.get('/courses', (req, res) => {
  res.json(['Full Stack Web Dev', 'Express.js & Node.js', 'Computer Vision']);
});

// Part B #7: POST /echo
app.post('/echo', (req, res) => res.json(req.body));

// Part C #9: GET /search (Query String)
app.get('/search', (req, res) => {
  const { name, age } = req.query;
  res.json({ name: name || null, age: age || null });
});

// Part C #10: GET /products/:category/:id (Multiple Params)
app.get('/products/:category/:id', (req, res) => {
  const { category, id } = req.params;
  res.json({ category, id });
});

// Part E #15: POST /register
app.post('/register', (req, res) => {
  const { name, email } = req.body;
  res.json({ message: `Registration successful for ${name || 'User'}`, email });
});

// Part E #16: POST /contact (URL-encoded Form)
app.post('/contact', (req, res) => {
  console.log('Form submission received:', req.body);
  res.json({ message: 'Thank you for reaching out! Form received.' });
});

// Routers (Part D, F, G, J)
app.use('/admin', require('./routes/admin'));
app.use('/api/students', require('./routes/students'));
app.use('/api/books', require('./routes/books'));
app.use('/api/members', require('./routes/members'));

// Part H #22: 404 Route Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Part H #23: Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error', status });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
