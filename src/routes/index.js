/* eslint-disable global-require */

// The top-level (parent) route
import config from '../config'

export default {

  path: config.rootPath,

  // Keep in mind, routes are evaluated in order
  children: [
    require('./home').default,
    require('./post').default,
    require('./contact').default,
    require('./login').default,
    require('./about').default,
    require('./admin').default,
    require('./adminModify').default,
    require('./adminNew').default,

    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    require('./notFound').default,
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title} - oct16.cn`;
    route.description = route.description || '';

    return route;
  },

};
