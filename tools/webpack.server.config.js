import path from 'path';
import webpack from 'webpack';
import config from './webpack.config';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import pkg from '../package.json';

const isDebug = !process.argv.includes('--release');

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const serverConfig = {
  ...config,
  name: 'server',
  target: 'node',

  entry: {
    server: ['babel-polyfill', './src/server.js'],
  },

  output: {
    ...config.output,
    filename: '../../server.js',
    libraryTarget: 'commonjs2',
  },

  module: {
    ...config.module,

    // Override babel-preset-env configuration for Node.js
    rules: config.module.rules.map(rule => {
      if (rule.loader == 'babel-loader') {
        return {
          ...rule,
          query: {
            ...rule.query,
            presets: rule.query.presets.map(preset => (preset[0] !== 'env' ? preset : ['env', {
              targets: {
                node: pkg.engines.node.match(/(\d+\.?)+/)[0],
              },
              modules: false,
              useBuiltIns: false,
              debug: false,
            }])),
          },
        }
      }
       else if (rule.test.toString().indexOf("css") > 0 || rule.test.toString().indexOf("less") > 0 ) {
        return {
          ...rule,
          use: [{loader: 'isomorphic-style-loader'}, ...rule.use]
        }
      }
      return rule
    }),
  },

  externals: [
    /^\.\/assets\.json$/,
    (context, request, callback) => {
      const isExternal =
        request.match(/^[@a-z][a-z/.\-0-9]*$/i) &&
        !request.match(/\.(css|less|scss|sss)$/i);
      callback(null, Boolean(isExternal));
    },
  ],

  plugins: [
    // ...config.plugins,
    // Define free variables
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': false,
      __DEV__: isDebug,
    }),

    // Do not create separate chunks of the server bundle
    // https://webpack.github.io/docs/list-of-plugins.html#limitchunkcountplugin
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),

    // Adds a banner to the top of each generated chunk
    // https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  devtool: isDebug ? 'cheap-module-source-map' : 'source-map',
};

export default serverConfig
