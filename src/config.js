/* eslint-disable max-len */

// if (process.env.BROWSER) {
//   throw new Error('Do not import `config.js` from inside the client-side code.');
// }

const IP = require('../tools/lib/ip')()

const isProd = process.env.NODE_ENV === 'production'

const API_PORT = isProd ? 3016 : 3015
const API_HOST = `http://${isProd ? IP : 'localhost'}`

module.exports = {

  // link address prefix placeholder
  rootPath: '',
  indexPath: '/posts',

  oAuth: {
    github: {
      clientID:  isProd ? 'Iv1.32888c90abe982c4' : 'Iv1.b7df2919acd30415',
      clientSecret: isProd ?  'd8aaa35841f82dbea12d7d17358bff3ced42f87b' : 'fa41949ee4256b6796c3598292f2e06d385e766c'
    }
  },

  // Node.js app
  port: process.env.PORT || isProd ? 3010 : 3009,
  proxyPort: API_PORT,
  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `${API_HOST}:${process.env.PORT || API_PORT}`,
  },

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID || 'UA-106964022-1', // UA-XXXXX-X
    baiduId: "d056582d8675c16777709371de2fb688",
  },

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'waterbear' }
  },
}
