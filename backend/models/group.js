const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Device = require('../models/device');

const groupSchema = new Schema({
  name: String,
  state: Boolean,
  devices: [Device.schema]
});

const groupModel = mongoose.model('group', groupSchema);

module.exports = groupModel;
