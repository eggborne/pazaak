const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
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
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: [
            'react-hot-loader/babel',
            'styled-jsx/babel',
            '@babel/proposal-class-properties',
            "@babel/plugin-transform-runtime",
          ]
        }
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: 'template.ejs',
      appMountId: 'react-app-root',
      title: 'Pazaak.online',
      favicon: './src/assets/images/favicon.png',
      filename: resolve(__dirname, "dist", "index.html"),
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

  devtool: '#source-map',

  output: {
    filename: 'app.bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};