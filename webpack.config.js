const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: {
    site: ['./src']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    pathinfo: true
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('')
      }
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      title: 'book-app',
      chunksSortMode: 'dependency',
      template: path.resolve(__dirname, './src/index.ejs')
    })
  ],
  module: {
    loaders: [{
    "test": /\.jsx?$/,
    "exclude": /node_modules/,
    "loader": "babel-loader",
    "query": {
      "presets": [
        "react",
        "babel-preset-es2015"
      ],
      "plugins": []
    }
  }, {
      test: /\.css$/,
      use: [
        'style-loader', 'css-loader'
      ]
    }],
    noParse: [/\.min\.js$/]
  },
  watch:true
}
