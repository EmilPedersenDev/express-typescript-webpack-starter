const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const path = require('path');
const { NODE_ENV = 'production' } = process.env;
module.exports = {
  entry: './src/server.ts',
  mode: NODE_ENV,
  target: 'node',
  devtool: 'cheap-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  watch: NODE_ENV === 'development',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [
    // new WebpackShellPlugin({
    //   onBuildEnd: ['yarn run:dev'],
    // }),
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ['yarn run:dev'],
        parallel: true,
      },
    }),
  ],
};
