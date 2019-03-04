const router = require('express').Router();
const Device = require('../models/device');
const Log = require('../models/log');
const { deviceAdaptor, logAdaptor, requestHelper} = require('../utils');

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

  try {
    const device = await Device.findById(deviceId);
    const currentState = device.state;
    const newState = data.state === 'on';
    await device.updateOne({
      ...data,
      state: newState
    }).exec();

    const url = `http://${device.address}:${device.port}/cm`;
    const command = newState ? 'Power On': 'Power Off';
    await requestHelper.goGet(`${url}?cmnd=${command}`);

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
