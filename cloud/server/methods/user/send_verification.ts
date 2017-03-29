new ValidatedMethod({
  name: 'user.send_verification',
  validate: function () {
  },
  run: function () {
    let userId = Meteor.userId();
    if ( userId ) {
      Accounts.sendVerificationEmail( userId );
    }
  }
});