const http = require('http');
const htmlResponses = require('./htmlResponses.js');
const jsonResponses = require('./jsonResponses.js');

// Set port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// URLS
const urlStruct = {
  '/': htmlResponses.getIndex,
  '/style.css': htmlResponses.getCSS,
  '/getUsers': jsonResponses.getUsers,
  '/notReal': jsonResponses.notReal,
};

const onRequest = (request, response) => {
  // Parse URL
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
  const params = {
    query: Object.fromEntries(parsedUrl.searchParams),
  };

  // Check if URL exists
  if (urlStruct[parsedUrl.pathname]) {
    // Call response handler
    urlStruct[parsedUrl.pathname](request, response, params);
  } else {
    // URL does not exist - send to index
    htmlResponses.getIndex(request, response, params);
  }
};

// Create server
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
