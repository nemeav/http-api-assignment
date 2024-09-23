const http = require('http');
// INSERT HANDLING FILE
const htmlHandler = require('./htmlResponses.js');
const responsesHandler = require('./responses.js'); // false error??? don't know why it's marking it wrong here but matches file and doesn't show up in test

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// end points collection
const urlStruct = {
  // INSERT ENDPOINTS
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCss,
  '/success': responsesHandler.success,
  '/badRequest': responsesHandler.badRequest,
  '/unauthorized': responsesHandler.unauthorized,
  '/forbidden': responsesHandler.forbidden,
  '/internal': responsesHandler.internal,
  '/notImplemented': responsesHandler.notImplemented,
};

// handle navigation
const onRequest = (request, response) => {
  // DO THINGS HERE
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

  request.acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response);
  } else {
    responsesHandler.notFound(request, response);
  }
};

// server start
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
