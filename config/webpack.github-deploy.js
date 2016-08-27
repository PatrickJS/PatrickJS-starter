/**
 * @author: @AngularClass
 */
const helpers = require('./helpers');
const ghDeploy = require('./github-deploy');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const ghpages = require('gh-pages');
const webpackConfig = ghDeploy.getWebpackConfigModule(); // the settings that are common to prod and dev


/**
 * Webpack Constants
 */
const GIT_REMOTE_NAME = 'origin';
const COMMIT_MESSAGE = 'Updates';
const GH_REPO_NAME = ghDeploy.getRepoName(GIT_REMOTE_NAME);

const METADATA = webpackMerge(webpackConfig.metadata, {
  /**
   * Prefixing the REPO name to the baseUrl for router support.
   * This also means all resource URIs (CSS/Images/JS) will have this prefix added by the browser
   * unless they are absolute (start with '/'). We will handle it via `output.publicPath`
   */
  baseUrl: '/' + GH_REPO_NAME + '/' + ghDeploy.safeUrl(webpackConfig.metadata.baseUrl)
});

module.exports = webpackMerge(webpackConfig, {
  /**
   * Merged metadata from webpack.common.js for index.html
   *
   * See: (custom attribute)
   */
  metadata: METADATA,


  output: {
    /**
     * The public path is set to the REPO name.
     *
     * `HtmlElementsPlugin` will add it to all resources url's created by it.
     * `HtmlWebpackPlugin` will add it to all webpack bundels/chunks.
     *
     * In theory publicPath shouldn't be used since the browser should automatically prefix the
     * `baseUrl` into all URLs, however this is not the case when the URL is absolute (start with /)
     *
     * It's important to prefix & suffix the repo name with a slash (/).
     * Prefixing so every resource will be absolute (otherwise it will be url.com/repoName/repoName...
     * Suffixing since chunks will not do it automatically (testes against about page)
     */
    publicPath: '/' + GH_REPO_NAME + '/' + ghDeploy.safeUrl(webpackConfig.output.publicPath)
  },

  plugins: [
    function() {
      this.plugin('done', function(stats) {
        console.log('Starting deployment to GitHub.');

        const logger = function (msg) {
          console.log(msg);
        };

        const options = {
          logger: logger,
          remote: GIT_REMOTE_NAME,
          message: COMMIT_MESSAGE
        };

        ghpages.publish(webpackConfig.output.path, options, function(err) {
          if (err) {
            console.log('GitHub deployment done. STATUS: ERROR.');
            throw err;
          } else {
            console.log('GitHub deployment done. STATUS: SUCCESS.');
          }
        });
      });
    }
  ]
});
