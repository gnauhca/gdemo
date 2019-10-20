const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');

module.exports = function getCssLoaders(extractCss) {
  let cssLoader = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 9', 'iOS >= 8', 'Android >= 4'],
          })
        ]
      }
    }
  ];
  let lessLoader = cssLoader.concat([
    {
      loader: 'less-loader',
      options: {
        sourceMap: true,
      },
    },
  ]);
  // if (extractCss) {
  if (true) {
    cssLoader = [MiniCssExtractPlugin.loader].concat(cssLoader);
    lessLoader = [MiniCssExtractPlugin.loader].concat(lessLoader);
  } else {
    const styleLoader = {
      loader: 'vue-style-loader',
    };
    cssLoader.unshift(styleLoader);
    lessLoader.unshift(styleLoader);
  }

  // console.log(cssLoader, lessLoader);
  return [
    {
      test: /\.css$/,
      use: cssLoader,
    },
    {
      test: /\.less$/,
      use: lessLoader,
    },
  ];
}
