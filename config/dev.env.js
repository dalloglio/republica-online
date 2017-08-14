var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost.api.republica.online"',
  API_CLIENT_ID: '"2"',
  API_CLIENT_SECRET: '"lwrRZOG6GsN7ftYjbPLsulcUfC9v9eGNI5ZDXrLL"',
  API_VERSION: '"v1"'
})
