const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/search' && req.method === 'GET') {
    const queryData = parsedUrl.query;
    const keyword = queryData.keyword || 'None specified';

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      message: 'Search query received',
      searchedKeyword: keyword,
      allQueryParams: queryData
    }));
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Route Not Found');
});

server.listen(3001, () => {
  console.log('Query demo server running at http://localhost:3001/search?keyword=node');
});