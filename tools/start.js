import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import WriteFilePlugin from 'write-file-webpack-plugin';
import run from './run';
import runServer from './runServer';
import webpackClientConfig from './webpack.client.config';
import webpackServerConfig from './webpack.server.config';
import clean from './clean';
import copy from './copy';
import beforeBuild from './beforeBuild';

const isDebug = !process.argv.includes('--release');
process.argv.push('--watch');

const [clientConfig, serverConfig] = [webpackClientConfig, webpackServerConfig];
const webpackConfig = [clientConfig, serverConfig]

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
  await run(clean);
  await run(copy);
  await run(beforeBuild);
  await new Promise((resolve) => {
    // Save the server-side bundle files to the file system after compilation
    // https://github.com/webpack/webpack-dev-server/issues/62
    serverConfig.plugins.push(new WriteFilePlugin({ log: false }));

    // Hot Module Replacement (HMR) + React Hot Reload
    if (isDebug) {
      clientConfig.entry.client = [...new Set([
        'babel-polyfill',
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
      ].concat(clientConfig.entry.client))];
      clientConfig.output.filename = clientConfig.output.filename.replace('[chunkhash', '[hash');
      clientConfig.output.chunkFilename = clientConfig.output.chunkFilename.replace('[chunkhash', '[hash');
      const { query } = clientConfig.module.rules.find(x => x.loader === 'babel-loader');
      query.plugins = ['react-hot-loader/babel'].concat(query.plugins || []);
      clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
      clientConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
    }

    const bundler = webpack(webpackConfig);
    const wpMiddleware = webpackDevMiddleware(bundler, {
      // IMPORTANT: webpack middleware can't access config,
      // so we should provide publicPath by ourselves
      publicPath: clientConfig.output.publicPath,

      // Pretty colored output
      stats: clientConfig.stats,

      // quiet: true,
      noInfo: true

      // For other settings see
      // https://webpack.github.io/docs/webpack-dev-middleware
    });
    const hotMiddleware = webpackHotMiddleware(bundler.compilers[0]);

    let handleBundleComplete = async () => {
      handleBundleComplete = stats => !stats.stats[1].compilation.errors.length && runServer();

      const server = await runServer();
      const bs = browserSync.create();
      bs.init({
        ...isDebug ? {} : { notify: false, ui: false},
        port: 3011,
        proxy: {
          target: server.host,
          middleware: [wpMiddleware, hotMiddleware],
          proxyOptions: {
            xfwd: true,
          }
        },
        open: false
      }, resolve);
    };

    bundler.plugin('done', stats => handleBundleComplete(stats));
  });
}

export default start;
