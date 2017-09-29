let config = require('./default.json');
const envConfig = require('./env.json');

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  config = Object.assign({}, config, envConfig);
}

module.exports = config;
