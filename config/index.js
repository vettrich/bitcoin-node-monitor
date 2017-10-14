let config = require('./default.json');
const fs = require('fs');

const envConfigPath = 'config/env.json';
if (fs.existsSync(envConfigPath)) {
  const envConfig = JSON.parse(fs.readFileSync(envConfigPath, 'utf8'));
  config = Object.assign({}, config, envConfig);
}

module.exports = config;
