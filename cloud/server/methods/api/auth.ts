import * as _ from "underscore";

this.isValidEmail = function(value) {
  let filter = /^([a-zA-Z0-9_.-])+\@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
  if(filter.test(value)) {
    return true;
  }
  return false;
};

JsonRoutes.add('post', '/users/register', function (req, res) {
  let options = req.body;

  if (!options.hasOwnProperty('email') || _.isNull(options.email)
    ||!options.hasOwnProperty('username') || _.isNull(options.username)){
    throw new Meteor.Error('register-error', 'Username and Email not empty');
  }
  if (!this.isValidEmail(options.email)){
    throw new Meteor.Error('invalid-email', 'Email is invalid');
  }
  check(options, {
    username: Match.Optional(String),
    email: Match.Optional(String),
    password: String,
  });

  let userId = Accounts.createUser(
    _.pick(options, 'username', 'email', 'password'));

  // Log in the new user and send back a token
  let stampedLoginToken = Accounts._generateStampedLoginToken();
  check(stampedLoginToken, {
    token: String,
    when: Date,
  });

  // This adds the token to the user
  Accounts._insertLoginToken(userId, stampedLoginToken);

  let tokenExpiration = Accounts._tokenExpiration(stampedLoginToken.when);
  check(tokenExpiration, Date);

  // Return the same things the login method returns
  JsonRoutes.sendResult(res, {
    data: {
      token: stampedLoginToken.token,
      tokenExpires: tokenExpiration,
      id: userId,
    },
  });
});

JsonRoutes.add('post', '/users/login', function (req, res) {
  let options = req.body;

  let user;
  if (options.hasOwnProperty('email')) {
    check(options, {
      email: String,
      password: String,
    });
    user = Meteor.users.findOne({ 'emails.address': options.email });
  } else {
    check(options, {
      username: String,
      password: String,
    });
    user = Meteor.users.findOne({ username: options.username });
  }

  if (!user) {
    throw new Meteor.Error('not-found',
      'User with that username or email address not found.');
  }

  let result = Accounts._checkPassword(user, options.password);
  check(result, {
    userId: String,
    error: Match.Optional(Meteor.Error),
  });

  if (result.error) {
    throw result.error;
  }

  let stampedLoginToken = Accounts._generateStampedLoginToken();
  check(stampedLoginToken, {
    token: String,
    when: Date,
  });

  Accounts._insertLoginToken(result.userId, stampedLoginToken);

  let tokenExpiration = Accounts._tokenExpiration(stampedLoginToken.when);
  check(tokenExpiration, Date);

  JsonRoutes.sendResult(res, {
    data: {
      id: result.userId,
      token: stampedLoginToken.token,
      tokenExpires: tokenExpiration,
    },
  });
});

