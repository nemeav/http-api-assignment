// INDEX AND CSS ONLY
// LOAD CLIENT PG AS HOME/INDEX
const fs = require('fs');
// FIND FILES
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// PROCESS CONTENT
const respond = (request, response, location, type) => {
  response.writeHead(200, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(location, 'utf8'),
  });
  response.write(location);
  response.end();
};

// FUNCS FOR DIFF FILES
// LOAD CLIENT PAGE
const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

// LOAD CSS WITH /STYLE.CSS
const getCss = (request, response) => {
  respond(request, response, css, 'text/css');
};

// EXPORTS
module.exports = {
  getIndex,
  getCss,
};
