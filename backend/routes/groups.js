const router = require('express').Router();
const Group = require('../models/group');
const Device = require('../models/device');

function groupAdaptor(group) {
  return {
    id: group._id,
    name: group.name,
    state: group.state ? 'on' : 'off',
    devices: group.devices.map(deviceAdaptor)
  }
};

function deviceAdaptor(device) {
  return {
    id: device._id,
    address: device.address,
    port: device.port,
    name: device.name
  }
}

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
    await group.update({
      ...data,
      state: data.state === 'on'
    }).exec();

    response.sendStatus(200);   
  } catch {
    response.sendStatus(404);  
  }
});

router.get('/:id/device', async (request, response) => {
  const groupId = request.params.id;
  
  try {
    const group = await Group.findById(groupId).exec();
    response.json(group.devices.map(deviceAdaptor));
  } catch {
    response.sendStatus(404);  
  }
});

router.put('/:id/device', async (request, response) => {
  const groupId = request.params.id;
  const deviceId = request.body.deviceId;

  try {
    const group = await Group.findById(groupId).exec();
    const device = await Device.findById(deviceId).exec();
    group.devices.push(device);
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
    const device = await Device.findById(deviceId).exec();
    const deviceIndex = group.devices.map(device => device.id).indexOf(device.id);
    group.devices.splice(deviceIndex, 1);
    await group.save();

    response.sendStatus(200);
  } catch {
    response.sendStatus(404);  
  }
});

module.exports = router;
