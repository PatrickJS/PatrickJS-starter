this.isValidEmail = function(value) {
  let filter = /^([a-zA-Z0-9_.-])+\@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
  if(filter.test(value)) {
    return true;
  }
  return false;
};

JsonRoutes.add('post', '/users/forgotPassword', function (req, res) {
  let options = req.body;
  if (!options.hasOwnProperty('email') || _.isNull(options.email)){
    throw new Meteor.Error('forgot-error', 'Email not empty');
  }
  if (!this.isValidEmail(options.email)){
    throw new Meteor.Error('invalid-email', 'Email is invalid');
  }
  check(options, {
    email: Match.Optional(String),
  });

  const user = Meteor.users.findOne({ "emails.address" : options.email });
  if (!user){
    throw new Meteor.Error('not-found', 'User not found');
  }
  Accounts.sendResetPasswordEmail(user._id);
  JsonRoutes.sendResult(res, {
    data: {
      message: "One reset password link is sent to your email"
    },
  });
});