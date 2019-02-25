const express = require('express');
const app = express();
const deviceRouter = require('./routes/devices');
const corsMiddleware = require('./middlewares/cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/smartHome');

app.use(corsMiddleware);

app.use(express.json());

app.use('/device', deviceRouter);

app.get('/', (request, response) => {
  response.send('It works great!');
});

app.listen(3005);
