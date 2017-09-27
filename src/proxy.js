//
// Api Proxy
// proxy middleware options
//

import proxy from 'http-proxy-middleware'
import config from 'config'
const isProd = process.env.NODE_ENV === 'production'

const proxyOptions = {
  target: config.api.serverUrl,  // target host
  logLevel: 'silent',
  secure: false,
  changeOrigin: true,               // needed for virtual hosted sites
  ws: true                          // proxy websockets
}
export default proxy(proxyOptions)
