const http = require('http');

// Read PORT from env or default to 4000
const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Server running on configured port: ${PORT}`);
});

server.listen(PORT, () => {
  console.log(`[INFO] Server is actively listening on port: ${PORT}`);
});