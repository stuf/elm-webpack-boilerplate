const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PROD = 'production';
const DEV = 'development';

const TARGET_ENV =
  process.env.npm_lifecycle_event === 'build'
    ? PROD
    : DEV;

const IS_DEV = TARGET_ENV === DEV;
const IS_PROD = TARGET_ENV === PROD;

//

const entryPath = path.join(__dirname, 'src/static/index.js');
const outputPath = path.join(__dirname, 'dist');
const outputFilename = IS_PROD ? '[name]-[hash].js' : '[name].js';

console.log(`Webpack: Starting webpack for ${TARGET_ENV}`);

//

const baseConfig = {
  output: {
    path: outputPath,
    filename: `static/js/${outputFilename}`
  },
  resolve: {
    extensions: ['.js', '.elm'],
    modules: ['node_modules']
  },
  module: {
    noParse: /\.elm$/,
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: 'file-loader?publicPath=../../&name=static/css/[hash].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()]
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/static/index.html',
      inject: 'body',
      filename: 'index.html'
    })
  ]
};

if (IS_DEV) {
  module.exports = merge(baseConfig, {
    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      entryPath
    ],
    devServer: {
      historyApiFallback: true,
      contentBase: './src',
      hot: true
    },
    module: {
      rules: [
        {
          test: /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          use: [
            {
              loader: 'elm-webpack-loader',
              options: {
                verbose: true,
                warn: true,
                debug: true
              }
            }
          ]
        },
        {
          test: /\.sc?ss$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        }
      ]
    }
  });
}
