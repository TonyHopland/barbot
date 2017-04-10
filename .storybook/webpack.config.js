// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require('path');
var webpack = require('webpack');
module.exports = function(storybookBaseConfig, configType) {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  storybookBaseConfig.module.loaders.push([
    {
      test   : /\.scss$/,
      exclude: /(node_modules)/,
      loaders: ['style', 'css', 'sass']
    },
    {
      test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
      exclude: /(node_modules)/,
      loader: 'url?limit=10000'
    },
    {
      test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
      exclude: /(node_modules)/,
      loader: 'file'
    }
  ]);

  storybookBaseConfig.resolve.moduleDirectories = [path.resolve('../src/web')];

    storybookBaseConfig.resolve.extensions.push('.jsx');

  // Return the altered config
  return storybookBaseConfig;
};
