const debug = require('debug')('app:system');

module.exports = (res, err) => {
  debug('HANDLED ERROR: ', err);
  res.json({
    success: false,
    error: err,
  });
};
