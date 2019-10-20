const express = require('express');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const getWebpackConfig = require('./get-webpack-config.js');
const webpackConfig = getWebpackConfig();

module.exports = function () {


  const compiler = webpack(webpackConfig);
  const app = express();

  app.use(
    middleware(compiler, {
      // webpack-dev-middleware options
    })
  );

  app.listen(16666, () => console.log('Example app listening on port 6666, visit http://127.0.0.1:16666!'));
}