const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'controls.min.js',
  },
  optimization: {
    splitChunks: false,
    sideEffects: false,
    minimize: true,
  },
});