const http = require('http');
const data = require('./data');

const PORT = 8080;

// Create a server object

const homeApiCalls = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  switch(req.method) {
    case 'GET':
      res.end(JSON.stringify(data));
      break;
    case 'POST':
      res.end(JSON.stringify({ message: 'POST request received' }));
      break;
    default:
      res.end(JSON.stringify({ message: 'Invalid request method' }));
  }

}

const notFound = (req, res) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route not found' }));
}

function app(req, res) {
  switch(req.url) {
    case '/':
      homeApiCalls(req, res);
      break;
    default:
      notFound(req, res);
  }
}

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});