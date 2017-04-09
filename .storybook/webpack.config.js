/* @flow */
const webpack = require('webpack');
const postcssImport = require('postcss-import');
const postcssCssNext = require('postcss-cssnext');
const paths = require('../config/paths')

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?modules=1!postcss'
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
    ],
  },
  // $FlowFixMe
  postcss: (instance) => [
    postcssImport({ addDependencyTo: instance, path: [paths.rootPath] }),
    postcssCssNext()
  ]
};
