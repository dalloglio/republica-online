var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APP_URL: '"http://www.republica.online"',
  API_URL: '"http://localhost.api.republica.online"',
  API_CLIENT_ID: '"2"',
  API_CLIENT_SECRET: '"EyBZywHtvfKlN05vgxvDoIB3SPWRK6RA6T8yWv6I"',
  API_VERSION: '"v1"',
  FACEBOOK_APP_ID: '"252087528629349"'
})
