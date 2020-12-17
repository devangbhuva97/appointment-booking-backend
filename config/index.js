process.env.NODE_ENV = process.env.NODE_ENV || 'local';
const configEnv = require('config-node');
const path = require('path');

const config = configEnv({ dir: path.resolve(__dirname) });

module.exports = config;
