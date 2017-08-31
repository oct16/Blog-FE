/* eslint-disable max-len */

// if (process.env.BROWSER) {
//   throw new Error('Do not import `config.js` from inside the client-side code.');
// }
const isProd = process.env.NODE_ENV === 'production'

const VIRTUAL_HOST_NAME = 'oct16.cn'
const VIRTUAL_HOST = 'http://' + VIRTUAL_HOST_NAME

module.exports = {

  domain: VIRTUAL_HOST_NAME,
  virtualHost: VIRTUAL_HOST,
  virtualHostName: VIRTUAL_HOST_NAME,
  // link address prefix placeholder
  rootPath: '/blog',

  oAuth: {
    github: {
      clientID:  isProd ? 'Iv1.32888c90abe982c4' : 'Iv1.b7df2919acd30415',
      clientSecret: isProd ?  'd8aaa35841f82dbea12d7d17358bff3ced42f87b' : 'fa41949ee4256b6796c3598292f2e06d385e766c'
    }
  },

  // Node.js app
  port: process.env.PORT || isProd ? 3010 : 3009,
  proxyPort: 3016,
  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `${isProd ? VIRTUAL_HOST : 'http://localhost'}:${process.env.PORT || 3016}`,
  },

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'waterbear' }
  },
}
