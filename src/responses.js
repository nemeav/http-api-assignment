// JSON AND XML ONLY
const respondFile = (request, response, status, object) => {
  const content = JSON.stringify(object);

  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  response.write(content);
  response.end();
//     type = request.acceptedTypes[0]
//   if (type === 'text/xml') {
//     let responseXML = '<response>'
//     responseXML = `${responseXML} `
//   }
};

// FUNCS FOR ENDPOINTS
const success = (request, response) => {
  const responseFile = {
    message: 'This is a successful response',
  };

  respondFile(request, response, 200, responseFile);
};

const badRequest = (request, response) => {
  const responseFile = {
    message: 'Missing valid query parameter set to true',
  };

  respondFile(request, response, 400, responseFile);
};

const unauthorized = (request, response) => {
  const responseFile = {
    message: 'Missing loggedIn query parameter set to yes',
  };

  respondFile(request, response, 401, responseFile);
};

const forbidden = (request, response) => {
  const responseFile = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  respondFile(request, response, 403, responseFile);
};

const internal = (request, response) => {
  const responseFile = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  respondFile(request, response, 500, responseFile);
};

const notImplemented = (request, response) => {
  const responseFile = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  respondFile(request, response, 501, responseFile);
};

const notFound = (request, response) => {
  const responseFile = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  respondFile(request, response, 404, responseFile);
};

// EXPORTS
module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
