const express = require('express');
const router = express.Router();

const students = [
  { id: 1, name: 'Khushi Choudhary', rollNumber: 'CU240251564' },
  { id: 2, name: 'Alex Johnson', rollNumber: 'CU240251565' }
];

// GET /api/students
router.get('/', (req, res) => res.json(students));

// GET /api/students/:id (Part C & F)
router.get('/:id', (req, res, next) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) {
    const err = new Error('Student not found');
    err.status = 404;
    return next(err);
  }
  res.json({ id: req.params.id, student, message: 'Student details' });
});

module.exports = router;
