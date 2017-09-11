/* eslint-disable global-require */

// The top-level (parent) route
import config from '../config'
import loading from '../common/loading/index'

export default {

  path: config.rootPath,

  // Keep in mind, routes are evaluated in order
  children: [
    require('./posts').default,
    require('./post').default,
    require('./contact').default,
    require('./login').default,
    require('./about').default,
    require('./admin').default,
    require('./adminModify').default,
    require('./adminNew').default,
    require('./test').default,
    require('./resume').default,
    require('./home').default,

    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    require('./notFound').default,
  ],

  async action({ next }) {

    loading.start()
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title} - Oct16.cn`;
    route.description = route.description || '';
    setTimeout(() => {
      loading.done()
    }, 5e2)
    return route;
  },

};
