const path = require('path');
var genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');
module.exports = function(storybookBaseConfig, configType) {

  var config = genDefaultConfig(storybookBaseConfig, configType);

  config.module.loaders.push([
    {
      test   : /\.scss$/,
      exclude: /(node_modules)/,
      loaders: ['style', 'css', 'sass']
    },
  ]);

  config.resolve.modulesDirectories = [
    path.resolve('./src/web'),
    path.resolve('./node_modules')
  ];

  return config;
};
