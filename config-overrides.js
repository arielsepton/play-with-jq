const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config, env) {
  // Add Monaco Editor plugin to the webpack plugins array
  config.plugins.push(new MonacoWebpackPlugin({
    languages: ['json', 'plaintext']
  }));

  return config;
}