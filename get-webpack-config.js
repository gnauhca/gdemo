const path = require('path');
const fse = require('fs-extra');
const webpack = require('webpack');
const getCssLoaders = require('./css-loader');
const workDir = process.cwd();
const cssLoaders = getCssLoaders();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const userWebpackConfigPath = path.join(workDir, 'webpack.config.js');
const webpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function resolveWorkDir(p) {
  return path.resolve(workDir, p);
}


let config = function() {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: resolveWorkDir('index.html'),
      filename: 'index.html'
    }),
    new CleanWebpackPlugin()
  ];

  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'production') {
    plugins.push(
      new webpack.optimize.ModuleConcatenationPlugin()
    );
  }
  

  const config = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
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
            presets: [require.resolve('@babel/preset-env')],
            plugins: [require.resolve('@babel/plugin-proposal-class-properties')]
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
    plugins
  };

  return config
};


module.exports = () => {
  if (fse.pathExistsSync(userWebpackConfigPath)) {
    const userConfig = require(userWebpackConfigPath);
    return webpackMerge(config(), userConfig());;
  } else {
    return config();
  }
};