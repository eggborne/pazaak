const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i
      })
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
            'transform-remove-console',
            '@babel/proposal-class-properties',
            "@babel/plugin-transform-runtime",
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
    publicPath: 'https://mikedonovan.dev/pazaak/dist/',
    filename: 'app.bundle.js'
  }
};