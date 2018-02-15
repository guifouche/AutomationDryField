/**
 * @author: @AngularClass
 */

module.exports = function (config) {
  var testWebpackConfig = require('./webpack.test.js')({ env: 'test' });

  var customLaunchers = {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 10',
      version: '35'
    },
    // sl_firefox: {
    //   base: 'SauceLabs',
    //   browserName: 'firefox',
    //   version: '30'
    // }
  };

  var configuration = {

    sauceLabs: {
      testName: 'Web App Unit Tests'
    },

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

    // client: {
    //   captureConsole: true
    // },

    /*
     * list of files / patterns to load in the browser
     *
     * we are building the test environment in ./spec-bundle.js
     */
    files: [
      { pattern: './src/config/spec-bundle.js', watched: false },
      { pattern: './src/assets/**/*', watched: false, included: false, served: true, nocache: false },
    ],

    /*
     * By default all assets are served at http://localhost:[PORT]/base/
     */
    proxies: {
      "/assets/": "/base/src/assets/"
    },

    /*
     * preprocess matching files before serving them to the browser
     * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: { './src/config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },

    // Webpack Config at ./webpack.test.js
    webpack: testWebpackConfig,

    // reporters: [ 'coverage' ],

    // coverageReporter: {
    //   type: 'in-memory'
    // },
    coverageReporter: { dir: 'coverage/', includeAllSources: true },
    reporters: ['progress', 'junit', 'saucelabs', 'coverage-istanbul'],

    // the default configuration
    junitReporter: {
      outputDir: 'coverage', // results will be saved as $outputDir/$browserName.xml
      outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: true, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
      properties: {}, // key value pair of properties to add to the <properties> section of the report
      xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format
    },

    // remapCoverageReporter: {
    //   'text-summary': null,
    //   json: './coverage/coverage.json',
    //   html: './coverage/html'
    // },

    // Webpack please don't spam the console when running in karma!
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i.e.
      noInfo: true,
      // and use stats to turn off verbose output
      stats: {
        // options i.e.
        chunks: false
      }
    },

    /*
     * test results reporter to use
     *
     * possible values: 'dots', 'progress'
     * available reporters: https://npmjs.org/browse/keyword/karma-reporter
     */
    // reporters: ['mocha', 'coverage', 'remap-coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    /*
     * level of logging
     * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_WARN,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    /*
     * start these browsers
     * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: [
      // 'Chrome',
      // 'PhantomJS'
      Object.keys(customLaunchers)
    ],

    customLaunchers: customLaunchers,

    /*
     * Continuous Integration mode
     * if true, Karma captures browsers, runs the tests and exits
     */
    singleRun: true
  };

  config.set(configuration);
};
