const http = require('http');
// INSERT HANDLING FILE
const htmlHandler = require('./htmlResponses.js');
const responseHandler

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// end points collection
const urlStruct = {
  // INSERT ENDPOINTS
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCss,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internal,
  '/notImplemented': responseHandler.notImplemented,
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
    urlStruct.notFound(request, response);
  }
};

// server start
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
