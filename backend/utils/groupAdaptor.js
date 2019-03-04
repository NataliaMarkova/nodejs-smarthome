const groupAdaptor = function(group) {
  return {
    id: group._id,
    name: group.name,
    state: group.state ? 'on' : 'off'
  }
};

module.exports = groupAdaptor;
