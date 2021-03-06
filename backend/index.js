const express = require('express');
const app = express();
const deviceRouter = require('./routes/devices');
const groupRouter = require('./routes/groups');
const corsMiddleware = require('./middlewares/cors');
const logger = require('./middlewares/logger');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/smartHome');

app.use(corsMiddleware);
app.use(logger);

app.use(express.json());

app.use('/device', deviceRouter);
app.use('/group', groupRouter);

app.get('/', (request, response) => {
  response.send('It works great!');
});

app.listen(3005);
