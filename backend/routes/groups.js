const router = require('express').Router();
const Device = require('../models/device');
const Group = require('../models/group');

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

  console.log(data.state);

  try {
    const group = await Group.findById(groupId);
    await group.update({
      ...data,
      state: data.state === 'on'
    }).exec();

    console.log(group);

    response.sendStatus(200);   
  } catch {
    response.sendStatus(404);  
  }
});

module.exports = router;
