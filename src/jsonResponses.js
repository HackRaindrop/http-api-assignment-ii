const getUsers = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });

  console.log(request.method);
  if (request.method === 'GET') {
    const responseJSON = {
      users: {},
    };
    const message = JSON.stringify(responseJSON);
    response.write(message);
    response.end();
  }

  if (request.method === 'HEAD') {
    response.end();
  }
};

const notReal = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'application/json' });
  console.log(request.method);
  if (request.method === 'GET') {
    const responseJSON = {
      id: 'notFound',
      message: 'The page you are looking for was not found.',
    };

    const message = JSON.stringify(responseJSON);
    response.write(message);
    response.end();
  }

  if (request.method === 'HEAD') {
    response.end();
  }
};

module.exports = {
  getUsers,
  notReal,
};