const router = require('express').Router();
const Group = require('../models/group');
const Device = require('../models/device');
const { deviceAdaptor, groupAdaptor, requestHelper} = require('../utils');

router.get('/', async (request, response) => {
  const groups = await Group.find().exec();

  response.json(groups.map(groupAdaptor));   
});

router.get('/:id', async (request, response) => {
  const group = await Group.findById(request.params.id).exec();
  response.json(groupAdaptor(group));   
});

router.post('/', async (request, response) => {
  const group = new Group(request.body);
  await group.save();
  response.sendStatus(201);
});

router.delete('/', async (request, response) => {
  const groupId = request.body.groupId;
  await Group.findByIdAndRemove(groupId).exec();
  response.sendStatus(200);
});

router.put('/:id', async (request, response) => {
  const groupId = request.params.id;
  const data = request.body;

  try {
    const group = await Group.findById(groupId);
    const currentState = group.state;
    await group.updateOne({
      ...data,
      state: data.state === 'on'
    }).exec();

    if (currentState !== data.state) {
      group.devices.forEach( async(deviceId) => {
        const devicePath = `/device/${deviceId}`;
        await requestHelper.doPut(devicePath, { state: data.state });
      });
    }

    response.sendStatus(200);
  } catch {
    response.sendStatus(404);
  }
});

router.get('/:id/device', async (request, response) => {
  const groupId = request.params.id;
  
  try {
    const group = await Group.findById(groupId).exec();
    const devices = await Device.find( { _id: { $in: group.devices } }).exec();
    response.json(devices.map(deviceAdaptor));
  } catch {
    response.sendStatus(404);  
  }
});

router.put('/:id/device', async (request, response) => {
  const groupId = request.params.id;
  const deviceId = request.body.deviceId;

  try {
    const group = await Group.findById(groupId).exec();
    group.devices.push(deviceId);
    await group.save();

    response.sendStatus(200);
  } catch {
    response.sendStatus(404);  
  }
});

router.delete('/:id/device', async (request, response) => {
  const groupId = request.params.id;
  const deviceId = request.body.deviceId;

  try {
    const group = await Group.findById(groupId).exec();
    const deviceIndex = group.devices.indexOf(deviceId);
    group.devices.splice(deviceIndex, 1);
    await group.save();

    response.sendStatus(200);
  } catch {
    response.sendStatus(404);  
  }
});

module.exports = router;
