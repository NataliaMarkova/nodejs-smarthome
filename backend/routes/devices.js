const router = require('express').Router();
const Device = require('../models/device');
const Log = require('../models/log');
const http = require('http');
const Moment = require('moment');

function sendRequest(url) {
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

function deviceAdaptor(device) {
  return {
    id: device._id,
    name: device.name,
    address: device.address,
    port: device.port,
    state: device.state ? 'on' : 'off'
  }
};

function logAdaptor(log) {
  return {
    date: Moment(log.date).format('DD MMMM YYYY HH:mm:ss'),
    action: log.action
  }
};

router.get('/', async (request, response) => {
  const devices = await Device.find().exec();

  response.json(devices.map(deviceAdaptor));   
});

router.get('/:id', async (request, response) => {
  const device = await Device.findById(request.params.id).exec();
  response.json(deviceAdaptor(device));   
});

router.post('/', async (request, response) => {
  const device = new Device(request.body);
  await device.save();
  response.sendStatus(201);
});

router.delete('/', async (request, response) => {
  const deviceId = request.body.deviceId;
  await Device.findByIdAndRemove(deviceId).exec();
  response.sendStatus(200);
});

router.put('/:id', async (request, response) => {
  const deviceId = request.params.id;
  const data = request.body;

  console.log(data.state);

  try {
    const device = await Device.findById(deviceId);
    const currentState = device.state;
    await device.update({
      ...data,
      state: data.state === 'on'
    }).exec();

    console.log(device);

    const url = `http://${device.address}:${device.port}/cm`;
    const command = device.state ? 'Power On': 'Power Off';
    await sendRequest(`${url}?cmnd=${command}`);

    if (currentState !== data.state) {
      const log = new Log({
        device: device,
        date: new Date(),
        action: data.state
      });
      await log.save();
    }

    response.sendStatus(200);   
  } catch {
    response.sendStatus(404);  
  }
});

router.get('/:id/logs', async (request, response) => {
  const deviceId = request.params.id;
  const logs = await Log.find({ 'device._id' : deviceId } ).exec();
  response.json(logs.map(logAdaptor));   
});

module.exports = router;
