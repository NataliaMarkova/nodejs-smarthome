const deviceAdaptor = function(device) {
  return {
    id: device._id,
    name: device.name,
    address: device.address,
    port: device.port,
    state: device.state ? 'on' : 'off'
  }
};

module.exports = deviceAdaptor;
