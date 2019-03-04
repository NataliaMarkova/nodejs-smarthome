const logger = function(req, res, next) {
  console.log(`Log ${req.method} request`, req.url);
  next();
}

module.exports = logger;
