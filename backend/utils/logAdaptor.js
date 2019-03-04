const Moment = require('moment');

const logAdaptor = function(log) {
  return {
    date: Moment(log.date).format('DD MMMM YYYY HH:mm:ss'),
    action: log.action
  }
};

module.exports = logAdaptor;
