const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// if environment 'ZIP' is set, not run webpack bundle analyzer
if (!process.env.UWZIP) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  common.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(common, {
  mode: 'production',
});
