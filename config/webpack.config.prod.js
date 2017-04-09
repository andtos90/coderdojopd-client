/* @flow */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('./paths');
const env = require('./env');

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

// Webpack uses `publicPath` to determine where the app is being served from.
const publicPath = env['process.env'].BASE_PATH ? JSON.parse(env['process.env'].BASE_PATH) : '/';

// Note: defined here because it will be used more than once.
const cssFilename = 'static/css/[name].[contenthash:8].css';

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: 'source-map',
  // In production, we only want to load the polyfills and the app code.
  entry: [require.resolve('./polyfills'), paths.srcIndexJsPath],
  output: {
    path: paths.buildPath, // The build folder.
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath, // We inferred the "public path" (such as / or /my-project) from BASE_PATH.
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
      // The notation here is somewhat confusing.
      // 1. "postcss" loader applies autoprefixer to our CSS.
      // 2. "css" loader resolves paths in CSS and adds assets as dependencies.
      // 3. "style" loader normally turns CSS into JS modules injecting <style>,
      //    but unlike in development configuration, we do something different.
      // 4. `ExtractTextPlugin` first applies the "postcss" and "css" loaders (second argument),
      //     then grabs the result CSS and puts it into a separate file in our build process.
      //     This way we actually ship a single CSS file in production instead of JS code
      //     injecting <style> tags.
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
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
          publicPath: Array(cssFilename.split('/').length).join('../'),
        }),
      },
    ],
  },
  plugins: [
    // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%favicon.ico">
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicPath,
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.publicIndexHtmlPath,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(env),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        screw_ie8: true, // React doesn't support IE8
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
    // Copies the content of the public folder to the build folder (index.html excluded).
    new CopyWebpackPlugin([{ from: paths.publicPath, to: paths.buildPath }], {
      ignore: [paths.publicIndexHtmlPath],
    }),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
