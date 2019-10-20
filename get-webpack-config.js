const path = require('path');
const getCssLoaders = require('./css-loader');
const workDir = process.cwd();
const cssLoaders = getCssLoaders();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolveWorkDir(p) {
  return path.resolve(workDir, p);
}

module.exports = function() {
  const config = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: 'inline-source-map',
    entry: {
      'index': resolveWorkDir('index.js')
    },
    output: {
      path: resolveWorkDir('dist'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            sourceMap: true,
            presets: [require.resolve('@babel/preset-env')]
          },
          exclude: /node_modules/
        },
        {
          test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            outputPath: 'images',
            name: '[path][name].[hash].[ext]'
          }
        }
      ].concat(cssLoaders)
    },
    resolve: {
      modules: ['node_modules', path.join(__dirname, 'node_modules')],
      extensions: ['.js', '.vue'],
      alias: {
        '@': workDir
      }
    },
    resolveLoader: {
      modules: ['node_modules', path.join(__dirname, 'node_modules')],
      extensions: ['.js', '.json'],
      mainFields: ['loader', 'main']
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new HtmlWebpackPlugin({
        template: resolveWorkDir('index.html'),
        filename: 'index.html'
      }),
    ],
  };

  return config
};