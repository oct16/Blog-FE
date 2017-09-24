/* eslint-disable global-require */

// The top-level (parent) route
import config from 'config'
import loading from 'common/loading/index'

export default {

  path: config.rootPath,

  // Keep in mind, routes are evaluated in order
  children: [
    require('./home').default,
    require('./posts').default,
    require('./post').default,
    require('./login').default,
    require('./about').default,
    require('./admin').default,
    require('./adminModify').default,
    require('./adminNew').default,
    require('./test').default,
    require('./resume').default,
    require('./resume-purty').default,

    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    require('./notFound').default,
  ],

  async action({ next, url }) {

    loading.start()
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title} - oct16.cn`;
    route.description = route.description || '';
    setTimeout(() => {
      loading.done()
    }, 5e2)

    if (process.env.NODE_ENV === 'production') {
      global._hmt && global._hmt.push(['_trackPageview', url])
      global.ga && global.ga('send', 'pageview', url)
    }
    return route;
  }
}
