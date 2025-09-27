const users = {};

// Respond with JSON
const respondJSON = (request, response, status, object) => {
  const content = JSON.stringify(object);

  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  // Write content if not HEAD or 204
  if (request.method !== 'HEAD' && status !== 204) {
    response.write(content);
  }

  response.end();
};

// Add user to users object
const addUser = (request, response) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  const { name, age } = request.body;

  // If either name or age is missing, send 400
  if (!name || !age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // Default to 204 updated
  let responseCode = 204;

  // If user doesn't exist
  if (!users[name]) {
    responseCode = 201;

    // Create empty user
    users[name] = {
      name,
    };
  }

  users[name].age = age;

  // If user is created, send sucess
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  // 204, no content to send back
  return respondJSON(request, response, responseCode, {});
};

// Get users from object
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  return respondJSON(request, response, 200, responseJSON);
};

// Not real endpoint
const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

// Export
module.exports = {
  getUsers,
  notReal,
  addUser,
};
