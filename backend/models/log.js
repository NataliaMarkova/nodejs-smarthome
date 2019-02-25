const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Device = require('../models/device');

const logSchema = new Schema({
  device: Device.schema,
  date: Date,
  action: String
});

const logModel = mongoose.model('log', logSchema);

module.exports = logModel;
