const express = require('express');
const router = express.Router();

let members = [
  { id: 1, name: 'Khushi Choudhary', status: 'Active' },
  { id: 2, name: 'Rohan Sharma', status: 'Active' }
];

// GET /api/members
router.get('/', (req, res) => res.json(members));

// GET /api/members/:id
router.get('/:id', (req, res, next) => {
  const member = members.find((m) => m.id === parseInt(req.params.id));
  if (!member) {
    const err = new Error('Member not found');
    err.status = 404;
    return next(err);
  }
  res.json(member);
});

// POST /api/members
router.post('/', (req, res) => {
  const newMember = { id: Date.now(), ...req.body };
  members.push(newMember);
  res.status(201).json({ message: 'Member added', member: newMember });
});

// PUT /api/members/:id
router.put('/:id', (req, res, next) => {
  const index = members.findIndex((m) => m.id === parseInt(req.params.id));
  if (index === -1) {
    const err = new Error('Member not found');
    err.status = 404;
    return next(err);
  }
  members[index] = { ...members[index], ...req.body };
  res.json({ message: 'Member updated', member: members[index] });
});

// DELETE /api/members/:id
router.delete('/:id', (req, res, next) => {
  const index = members.findIndex((m) => m.id === parseInt(req.params.id));
  if (index === -1) {
    const err = new Error('Member not found');
    err.status = 404;
    return next(err);
  }
  const deleted = members.splice(index, 1);
  res.json({ message: 'Member deleted', member: deleted[0] });
});

module.exports = router;
