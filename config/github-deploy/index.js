const helpers = require('../helpers');
const execSync = require('child_process').execSync;

const REPO_NAME_RE = /Push  URL: https:\/\/github\.com\/.*\/(.*)\.git/;

function getWebpackConfigModule() {
  if (helpers.hasProcessFlag('github-dev')) {
    return require('../webpack.dev.js');
  } else if (helpers.hasProcessFlag('github-prod')) {
    return require('../webpack.prod.js');
  } else {
    throw new Error('Invalid compile option.');
  }
}

function getRepoName(remoteName) {
  remoteName = remoteName || 'origin';

  var stdout = execSync('git remote show ' + remoteName),
      match = REPO_NAME_RE.exec(stdout);

  if (!match) {
    throw new Error('Could not find a repository on remote ' + remoteName);
  } else {
    return match[1];
  }
}

function stripTrailing(str, char) {

  if (str[0] === char) {
    str = str.substr(1);
  }

  if(str.substr(-1) === char) {
    str = str.substr(0, str.length - 1);
  }

  return str;
}

/**
 * Given a string remove trailing slashes and adds 1 slash at the end of the string.
 *
 * Example:
 * safeUrl('/value/')
 * // 'value/'
 *
 * @param url
 * @returns {string}
 */
function safeUrl(url) {
  const stripped = stripTrailing(url || '', '/');
  return stripped ? stripped + '/' : ''
}

exports.getWebpackConfigModule = getWebpackConfigModule;
exports.getRepoName = getRepoName;
exports.safeUrl = safeUrl;
