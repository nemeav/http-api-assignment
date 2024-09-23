// import
// helps check for add'l params
const url = require('url');

// JSON AND XML ONLY
const respondFile = (request, response, status, object) => {
  if (request.acceptedTypes[0] === 'text/xml') {
    let xmlResponse = '<response>';
    xmlResponse += `<message>${object.message}</message>`; // Always include message

    // Include <id> only if it exists
    if (object.id) {
      xmlResponse += `<id>${object.id}</id>`;
    }

    xmlResponse += '</response>';

    response.writeHead(status, {
      'Content-Type': 'text/xml',
      'Content-Length': Buffer.byteLength(xmlResponse, 'utf8'),
    });

    response.write(xmlResponse);
    response.end();
  } else {
    // JSON
    const content = JSON.stringify(object);
    response.writeHead(status, {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(content, 'utf8'),
    });

    response.write(content);
    response.end();
  }
};

// FUNCS FOR ENDPOINTS
const success = (request, response) => {
  const responseFile = {
    message: 'This is a successful response',
  };

  respondFile(request, response, 200, responseFile);
};

const badRequest = (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const { query } = parsedUrl;

  let responseFile;

  if (query.valid === 'true') {
    responseFile = {
      message: 'This request has the required parameters.',
    };
  } else {
    responseFile = {
      message: 'Missing valid query parameter set to true',
      id: 'badRequest',
    };
  }

  respondFile(request, response, 400, responseFile);
};

const unauthorized = (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const { query } = parsedUrl;

  let responseFile;

  if (query.loggedIn === 'yes') {
    responseFile = {
      message: 'You have successfully viewed the content.',
    };
  } else {
    responseFile = {
      message: 'Missing loggedIn query parameter set to yes',
      id: 'unauthorized',
    };
  }

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
