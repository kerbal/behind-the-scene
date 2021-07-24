const path = require('path');
require('dotenv');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'ts-loader',
        }
      }
    ]
  },  
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  watch: true
};
