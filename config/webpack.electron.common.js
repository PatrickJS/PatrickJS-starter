const helpers = require('./helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {

  return {
    entry: {
      'main': './src/main.desktop.ts',
    },

    target: 'electron',

    node: {
      __dirname: false,
    },

    output: {
      path: helpers.root('dist'),
      filename: '[name].js',
    },

    resolve: {
      extensions: ['', '.ts', '.js', '.json'],
    },

    module: {
      loaders: [
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
        }, {
          test: /\.json$/,
          loader: 'json-loader',
          exclude: 'database.json',
        },
      ],
    },

    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'src/package.json',
        },
      ]),
    ],
  }
}
