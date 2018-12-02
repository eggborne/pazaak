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
            'styled-jsx/babel'
          ]
        }
      },
      {
        test: /\.(png|gif|jp(e*)g|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[hash]-[name].[ext]'
          }
        }
      },
      {
        test: /\.(wav)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'sounds/[hash]-[name].[ext]'
          }
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
      title: 'Pazaak',
      favicon: './src/assets/images/favicon.png',
      filename: resolve(__dirname, "dist", "index.html"),
      meta: {
        'viewport': 'width=device-width, height=device-height, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
        'mobile-web-app-capable': 'yes',
        'theme-color': '#004'
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