const http = require('http');

const hostname = '127.0.0.1';
const port = 3005;

const goGet = (url) => {
  return new Promise((resolve, reject) => { 
    http.get(url, (response) => {
      if (response.statusCode !== 200) {
          reject(response.statusCode)
      } else {
          resolve();
      }
    });
  });
};

const doPut = (path, data) => {

  const requestBody = JSON.stringify(data);

  const options = {
    hostname: hostname,
    port: port,
    path: path,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': requestBody.length
    }
  };

  return new Promise((resolve, reject) => { 
    const request = http.request(options, (response) => {     
      if (response.statusCode !== 200) {
          reject(response.statusCode)
      } else {
          resolve();
      }
    });
    request.write(requestBody);
    request.end();
  });  
};

module.exports = {
  goGet: goGet,
  doPut: doPut
};
