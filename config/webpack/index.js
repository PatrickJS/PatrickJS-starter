/*
 * @author: Michael De Abreu
 *
 * Made for @AngularClass
 */

/**
 * Main webpack config file.
 *
 * You can add here more configurations and set the target in the script.
 */

module.exports = (env) => {
  env = env || {};
  switch (env.target) {
    case 'github':
      return require('./github')(env);
    case 'web':
    default:
      return require('./browser')(env);
  }
}
