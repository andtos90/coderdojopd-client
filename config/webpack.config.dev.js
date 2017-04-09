/* @flow */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const env = require('./env');
const paths = require('./paths');

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = {
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: 'cheap-module-source-map',
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  entry: [
    'react-hot-loader/patch', // HMR 3 patch, must be first.
    'webpack-dev-server/client?http://localhost:8080', // HMR client
    'webpack/hot/only-dev-server', // HMR server. /dev-server will refresh the page on errors.
    require.resolve('./polyfills'), // A few useful polyfills by default.
    paths.srcIndexJsPath, // Finally, this is our app's code.
  ],
  output: {
    path: paths.buildPath, // Not used in dev but WebpackDevServer crashes without it
    pathinfo: true, //Add /* filename */ comments to generated require()s in the output.
    filename: 'app.js', // Does not produce a real file: It's a virtual path served by WebpackDevServer.
  },
  devServer: {
    compress: true, // Enable gzip compression of generated files.
    clientLogLevel: 'none', // Silence WebpackDevServer's own logs since they're generally not useful.
    contentBase: paths.publicPath, // The base path of the served content
    hot: true, // Enable hot reloading server.
    quiet: true, // WebpackDevServer is noisy by default...
    watchOptions: {
      ignored: /node_modules/, // Reportedly, this avoids CPU overload on some systems.
    },
    historyApiFallback: true, // 404s will fallback to /index.html
    host: '0.0.0.0', // Change to '0.0.0.0' for external facing server
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'], // Won't need to add extension when importing those.
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: paths.srcPath,
        loaders: ['babel-loader'], // The main loader, uses babel loader for the HMR.
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loaders: ['file-loader'], // The most common files.
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      // 1. "postcss" loader applies autoprefixer to our CSS.
      // 2. "css" loader resolves paths in CSS and adds assets as dependencies.
      // 3. "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              // ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              // $FlowFixMe
              plugins: context => [
                require('postcss-import')({
                  addDependencyTo: context.webpack,
                  path: [paths.rootPath],
                }),
                require('postcss-cssnext'),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%favicon.ico">
    // In production, it will be an empty string unless you specify "homepage"
    // In development, this will be a single slash.
    new InterpolateHtmlPlugin({
      PUBLIC_URL: '/',
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.publicIndexHtmlPath,
    }),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin(env),
    // This is necessary to emit hot updates (currently CSS only).
    new webpack.HotModuleReplacementPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false,
  },
};
