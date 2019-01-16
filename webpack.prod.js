const { resolve } = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true
      }),
    ]
  },
  entry: [
    resolve(__dirname, 'src', 'index.jsx')
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            'styled-jsx/babel',
            'transform-remove-console'
          ]
        }
      }
    ]
  },

  devtool: '',

  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: 'template.ejs',
      appMountId: 'react-app-root',
      title: 'Pazaak.online',
      favicon: './src/assets/images/favicon.png',
      filename: resolve(__dirname, "./", "index.html"),
      meta: {
        'viewport': 'width=device-width, height=device-height, initial-scale=1, minimum-scale=1, user-scalable=no, user-scalable=0',
        'mobile-web-app-capable': 'yes',
        'theme-color': '#560000'
      }
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: 'https://pazaak.online/dist/',
    filename: 'app.bundle.js'
  }
};