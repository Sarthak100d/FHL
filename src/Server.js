const { extractArmTemplates } = require('./AppComponent.js');

const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/getTemplates') {
      let body = '';
      
      // Collect the JSON data from the request
      req.on('data', chunk => {
        body += chunk.toString();
      });
  
      // Process the JSON data and send a response
      req.on('end', () => {
        try {
          const jsonData = JSON.parse(body);
          const responseData = { message: 'Received data successfully', data: jsonData };
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ zipFileName: extractArmTemplates(jsonData) }));
          res.end();
        } catch (error) {
          console.error('Error processing request:', error);
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.write(JSON.stringify({ message: 'Invalid JSON data received' }));
          res.end();
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ message: 'Invalid API endpoint' }));
      res.end();
    }
  });
  
  const PORT = 3001;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
  