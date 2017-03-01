import {User} from "../../models/User";
import {OM} from "../../code/General/ObjectManager";

new ValidatedMethod({
  name    : 'user.get_roles',
  validate: function () {
    if (!this.userId) {
      throw new Meteor.Error("Error", "Access denied");
    }
  },
  run     : function () {
    let userModel: User = OM.create<User>(User).loadById(this.userId);
    return userModel.getRoles();
  }
});
DDPRateLimiter.addRule({
                         userId: function (userId) {
                           return true;
                         },
                         type  : "method",
                         name  : "user.get_roles",
                       }, 1, 1000);
