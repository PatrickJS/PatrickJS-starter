new ValidatedMethod({
  name: 'user.update_profile',
  validate: function () {
    if (!this.userId) {
      throw new Meteor.Error("user.get_roles", "Access denied");
    }
  },
  run: function (data) {
    const user = Meteor.users.findOne({_id: data['_id']});
    if (user)
      Meteor.users.update({_id: user._id}, {$set:data});
    else {
      throw new Meteor.Error("user.update_profile", "Can't find user");
    }
  }
});
