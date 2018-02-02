const path = require('path');

module.exports = {
  entry: {
    
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.css$/, use: 'style-loader!css-loader!postcss-loader' },
      { test: /\.json5$/, use: 'json5-loader'},
    ]
  }
}
