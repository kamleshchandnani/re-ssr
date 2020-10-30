// All your environment specific secrets/keys goes into respective environment object
module.exports = {
  development: {
    port: 9001,
    assetsUrl: 'http://localhost:9000',
  },
  staging: {
    port: 9001,
    assetsUrl: 'http://localhost:9001',
  },
  production: {
    port: 9001,
    assetsUrl: 'http://localhost:9001',
  },
};
