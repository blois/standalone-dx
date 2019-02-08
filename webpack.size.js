const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'dx.min.js',
  },
  optimization: {
    splitChunks: false,
    sideEffects: false,
    minimize: true,
  },
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
});