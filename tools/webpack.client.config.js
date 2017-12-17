import path from 'path';
import webpack from 'webpack';
import config from './webpack.config';
import AssetsPlugin from 'assets-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');
const isAnalyze = process.argv.includes('--analyze') || process.argv.includes('--analyse');

//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

const clientConfig = {
  ...config,
  name: 'client',
  target: 'web',

  entry: {
    client: ['babel-polyfill', './src/client.js'],
  },

  output: {
    ...config.output,
    filename: isDebug ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDebug ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
  },
  module: {
    ...config.module,

    // Override babel-preset-env configuration for Node.js
    rules: config.module.rules.map(rule => {

      if (/css/.test(rule.test.toString())) {
        return {
          ...rule,
          use: ExtractTextPlugin.extract(rule.use)
        }
      } else if (/less/.test(rule.test.toString())) {
        return {
          ...rule,
          use: isDebug ? [{loader: 'style-loader'}, ...rule.use] : ExtractTextPlugin.extract(rule.use)
        }
      } else if (rule.loader == 'babel-loader') {
        return {
          ...rule,
          query: {
            ...rule.query,
            plugins: [
              ...rule.query.plugins,
              // babel-plugin-import for ant design
              [
                "import", {
                  "libraryName": "antd",
                  "style": true
                  // "style": 'css'
                }
              ]
            ]
          }
        }
      }
      return rule
    }),
  },

  plugins: [
    // ...config.plugins,
    // Define free variables
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      __DEV__: isDebug,
    }),

    new ExtractTextPlugin({
      filename: `css/${ isDebug ? 'styles' : '[name].[chunkhash:8]' }.css`,
      allChunks: true,
      // disable: isDebug,
    }),

    // Emit a file with assets paths
    // https://github.com/sporto/assets-webpack-plugin#options
    new AssetsPlugin({
      path: path.resolve(__dirname, '../build'),
      filename: 'assets.json',
      prettyPrint: true,
    }),

    // Move modules that occur in multiple entry chunks to a new entry chunk (the commons chunk).
    // http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 3 //module => /node_modules/.test(module.resource),
    }),

    ...isDebug ? [] : [
      // Minimize all JavaScript output of chunks
      // https://github.com/mishoo/UglifyJS2#compressor-options
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          screw_ie8: true, // React doesn't support IE8
          warnings: isVerbose,
          unused: true,
          dead_code: true,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
    ],

    // Webpack Bundle Analyzer
    // https://github.com/th0r/webpack-bundle-analyzer
    ...isAnalyze ? [new BundleAnalyzerPlugin()] : [],
  ],

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: isDebug ? 'cheap-module-source-map' : false,

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  // https://webpack.github.io/docs/configuration.html#node
  // https://github.com/webpack/node-libs-browser/tree/master/mock
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};

export default clientConfig
