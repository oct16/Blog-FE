import webpack from 'webpack';
import webpackClientConfig from './webpack.client.config';
import webpackServerConfig from './webpack.server.config';

/**
 * Creates application bundles from the source files.
 */
function bundle() {
  return new Promise((resolve, reject) => {
    webpack([webpackClientConfig, webpackServerConfig]).run((err, stats) => {
      if (err) {
        return reject(err);
      }

      console.info(stats.toString(webpackClientConfig.stats));
      return resolve();
    });
  });
}

export default bundle;
