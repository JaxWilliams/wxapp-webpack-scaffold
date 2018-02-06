const {
  resolve
} = require('path');
const {
  EnvironmentPlugin
} = require("webpack");
const DashboardPlugin = require('webpack-dashboard/plugin');
const WXAppWebpackPlugin = require('wxapp-webpack-plugin').default;
module.exports = {
  entry: {
    app: ['./src/app.js'],
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(wxss|css)$/,
        use: [{
            loader: 'file-loader',
            options: {
              context: resolve('src'),
              name: '[path][name].wxss'
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(wxml|wxs|json|png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            context: resolve('src'),
            name: '[path][name].[ext]'
          }
        }]
      },
    ]
  },
  plugins: [
    new DashboardPlugin(),
    new EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new WXAppWebpackPlugin({
      clear: process.env.NODE_ENV == 'production',
    }),
  ],
  watch: process.env.NODE_ENV == 'production',
  watchOptions: {
    ignored: /dist/,
    aggregateTimeout: 300,
  }
}
