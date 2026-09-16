const express = require('express');
const router = express.Router();

let books = [
  { id: 1, title: 'JavaScript Essentials', author: 'Brendan Eich' },
  { id: 2, title: 'Express.js Guide', author: 'TJ Holowaychuk' }
];

// GET /api/books - Get all books
router.get('/', (req, res) => res.json(books));

// GET /api/books/:id - Get book by ID
router.get('/:id', (req, res, next) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    const err = new Error('Book not found');
    err.status = 404;
    return next(err);
  }
  res.json(book);
});

// POST /api/books - Create new book
router.post('/', (req, res) => {
  const newBook = { id: Date.now(), ...req.body };
  books.push(newBook);
  res.status(201).json({ message: 'Book created', book: newBook });
});

// PUT /api/books/:id - Update book
router.put('/:id', (req, res, next) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) {
    const err = new Error('Book not found');
    err.status = 404;
    return next(err);
  }
  books[index] = { ...books[index], ...req.body };
  res.json({ message: 'Book updated', book: books[index] });
});

// DELETE /api/books/:id - Delete book
router.delete('/:id', (req, res, next) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) {
    const err = new Error('Book not found');
    err.status = 404;
    return next(err);
  }
  const deletedBook = books.splice(index, 1);
  res.json({ message: 'Book deleted', book: deletedBook[0] });
});

module.exports = router;
