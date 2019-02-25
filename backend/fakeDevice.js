const express = require('express');
const app = express();
const port = parseInt(process.argv[2]);

let deviceState = false;

app.get('/cm', (request, response) => {
  const action = request.query.cmdn;

  switch (action) {
    case 'Power On': {
      deviceState = true;
      break;
    }
    case 'Power Off': {
      deviceState = true;
      break;
    }
    default: {
      deviceState = !deviceState;
    }
  }

  console.log('Current state', deviceState ? 'ON' : 'OFF');
  response.json({power: deviceState});
});

app.listen(port, () => {
  console.log(`Fake device is available on http://127.0.0.1:${port}`);
});
