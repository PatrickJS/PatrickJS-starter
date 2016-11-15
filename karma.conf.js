/**
 * @author: @AngularClass
 */
const helpers = require('./config/helpers');
const path = require('path');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

const ENV = process.env.NODE_ENV || 'testing';

module.exports = config => {

  config.set({

    // base path that will be used to resolve all patterns (e.g. files, exclude)
    basePath: '',

    /*
     * Frameworks to use
     *
     * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: ['jasmine'],

    // list of files to exclude
    exclude: [],

    /*
     * list of files / patterns to load in the browser
     *
     * we are building the test environment in ./spec-bundle.js
     */
    files: [{
      pattern: './config/spec-bundle.js',
      watched: false
    }],

    /*
     * preprocess matching files before serving them to the browser
     * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: {
      './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
    },

    // Webpack Config at ./webpack.test.js
    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
      },
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.js$/,
            loader: 'source-map-loader',
            exclude: [
              helpers.root('node_modules/rxjs'),
              helpers.root('node_modules/@angular')
            ]
          }, {
            test: /\.ts$/,
            loader: 'awesome-typescript-loader',
            query: {
              sourceMap: false,
              inlineSourceMap: true,
              compilerOptions: {

                // Remove TypeScript helpers to be injected
                // below by DefinePlugin
                removeComments: true

              }
            },
            exclude: [/\.e2e\.ts$/]
          }, {
            test: /\.json$/,
            loader: 'json-loader',
            exclude: [helpers.root('src/index.html')]
          }, {
            test: /\.css$/,
            loaders: ['to-string-loader', 'css-loader'],
            exclude: [helpers.root('src/index.html')]
          }, {
            test: /\.html$/,
            loader: 'raw-loader',
            exclude: [helpers.root('src/index.html')]
          }, {
            enforce: 'post',
            test: /\.(js|ts)$/,
            loader: 'istanbul-instrumenter-loader',
            include: helpers.root('src'),
            exclude: [
              /\.(e2e|spec)\.ts$/,
              /node_modules/
            ]
          }

        ]
      },

      /**
       * Add additional plugins to the compiler.
       *
       * See: http://webpack.github.io/docs/configuration.html#plugins
       */
      plugins: [
        new DefinePlugin({
          'ENV': JSON.stringify(ENV),
          'process.env': JSON.stringify(process.env)
        }),
        new ContextReplacementPlugin(
          // The (\\|\/) piece accounts for path separators in *nix and Windows
          /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
          helpers.root('src') // location of your src
        ),
        new LoaderOptionsPlugin({
          debug: true,
        }),

      ],

      /**
       * Include polyfills or mocks for various node stuff
       * Description: Node configuration
       *
       * See: https://webpack.github.io/docs/configuration.html#node
       */
      node: {
        global: true,
        process: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
      }
    },

    // Webpack please don't spam the console when running in karma!
    webpackMiddleware: {
      stats: 'errors-only'
    },

    /*
     * test results reporter to use
     *
     * possible values: 'dots', 'progress'
     * available reporters: https://npmjs.org/browse/keyword/karma-reporter
     */
    reporters: ['mocha'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    /*
     * level of logging
     * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    /*
     * start these browsers
     * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: !process.env.TRAVIS
      ? ['Chrome']
      : ['ChromeTravisCi'],

    customLaunchers: {
      ChromeTravisCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    /*
     * Continuous Integration mode
     * if true, Karma captures browsers, runs the tests and exits
     */
    singleRun: true
  });
}
