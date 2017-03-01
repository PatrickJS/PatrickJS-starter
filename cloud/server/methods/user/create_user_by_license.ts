import {Users} from "../../collections/Users";

new ValidatedMethod({
  name    : 'user.create_user_by_license',
  validate: function (user) {
    try {
      new Users['$schema'].validate(user);
    } catch (e) {
      throw new Meteor.Error("Error", e.message);
    }
  },
  run     : function (user) {
    // Kiểm tra xem license đã có shop_owner_id chưa?
    
    // insert user with license
    
    return Users.insert(user);
  }
});
DDPRateLimiter.addRule({
                         userId: function (userId) {
                           return true;
                         },
                         type  : "method",
                         name  : "user.create_user_by_license",
                       }, 1, 1000);
