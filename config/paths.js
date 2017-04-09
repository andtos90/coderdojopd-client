/**
 * The paths used in the webpack configuration.
 */
const path = require('path');

const rootPath = path.join(__dirname, './..');

module.exports = {
  rootPath,
  srcPath: path.resolve(rootPath, 'src'),
  buildPath: path.resolve(rootPath, 'build'),
  publicPath: path.resolve(rootPath, 'public'),
  nodeModulesPath: path.resolve(rootPath, 'node_modules'),
  packageJsonPath: path.resolve(rootPath, 'package.json'),
  doteEnvPath: path.resolve(rootPath, '.env'),
  publicIndexHtmlPath: path.resolve(rootPath, 'public/index.html'),
  srcIndexJsPath: path.resolve(rootPath, 'src/index.js'),
  buildIndexHtmlPath: path.resolve(rootPath, 'build/index.html'),
  buildCssPath: path.resolve(rootPath, 'build/static/app.css'),
};
