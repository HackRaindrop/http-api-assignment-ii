const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// Respond with status code
const respond = (request, response, content, type, status = 200) => {
  response.writeHead(status, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });
  response.write(content);
  response.end();
};

// Index of page
const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

// CSS file
const getCSS = (request, response) => {
  respond(request, response, css, 'text/css');
};

// Export
module.exports = {
  getIndex,
  getCSS,
};
