const http = require('http');

const students = [
  { id: 1, name: 'Alice', course: 'Node.js' },
  { id: 2, name: 'Bob', course: 'React' },
  { id: 3, name: 'Charlie', course: 'Python' }
];

const server = http.createServer((req, res) => {
  const url = req.url;

  // GET /
  if (url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Welcome to the Student API Server!');
  }

  // GET /students
  if (url === '/students' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(students));
  }

  // GET /students/:id
  if (url.startsWith('/students/') && req.method === 'GET') {
    const id = parseInt(url.split('/')[2]);
    const student = students.find((s) => s.id === id);

    if (student) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(student));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Student not found' }));
    }
  }

  // 404 for all other routes
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>404 Not Found</h1>');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});