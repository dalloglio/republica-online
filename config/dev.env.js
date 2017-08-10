var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost.api.republica.online"',
  API_CLIENT_ID: '"2"',
  API_CLIENT_SECRET: '"McfRy5yyOEoxn6Ate3NqLNgnIjOrNLtp1G9Cbmyd"',
  API_VERSION: '"v1"'
})
