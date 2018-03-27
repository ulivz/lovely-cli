const { resolve } = require('path')

module.exports = {
  entry: resolve(__dirname, 'entry.js'),
  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  }
}