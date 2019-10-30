const webpack = require('webpack');
const getWebpackConfig = require('./get-webpack-config.js');

module.exports = function () {
  process.env.NODE_ENV = 'production';
  
  const webpackConfig = getWebpackConfig();
  webpack(webpackConfig, (err, stats) => { // Stats Object
    if (err) {
      console.log(err.stack || err);
      if (err.details) {
        console.log(err.details);
      }
      return;
    }

    const info = stats.toJson();
    const buildInfo = stats.toString({
      colors: true,
      children: true,
      chunks: false,
      modules: false,
      chunkModules: false,
      hash: false,
      version: false
    });
    console.log(buildInfo);

    if (stats.hasErrors()) {
      done('error occured');
      return;
    }

    if (stats.hasWarnings()) {
      console.log(info.warnings);
    }
  });
}