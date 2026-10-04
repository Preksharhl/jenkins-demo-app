const http = require('node:http');

const PORT = Number(process.env.PORT) || 3000;

function createServer() {
  return http.createServer((request, response) => {
    if (request.url === '/health') {
      response.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify({ status: 'ok' }));
      return;
    }

    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    response.end('<!doctype html><html lang="en"><meta charset="utf-8"><title>Jenkins Demo</title><body><h1>Hello from the Jenkins Demo App!</h1><p>Built and deployed with a Jenkins pipeline.</p></body></html>');
  });
}

if (require.main === module) {
  createServer().listen(PORT, '0.0.0.0', () => {
    console.log(`Demo app listening on port ${PORT}`);
  });
}

module.exports = { createServer };
