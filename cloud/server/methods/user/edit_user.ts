import {User} from "../../models/User";
import {OM} from "../../code/General/ObjectManager";
import {Role} from "../../models/Role";
import * as $q from "q";

new ValidatedMethod({
  name: 'user.edit_user',
  validate: function () {
    if (!this.userId) {
      throw new Meteor.Error("user.get_roles", "Access denied");
    }
    let userModel: User = OM.create<User>(User).loadById(this.userId);
    if (!userModel.isInRoles([Role.SUPERADMIN, Role.ADMIN], Role.GROUP_CLOUD)){
      throw new Meteor.Error("user.create_user_error", "Access denied");
    }
  },
  run: function (data) {
    let defer = $q.defer();
    const user = Meteor.users.findOne({_id: data['_id']});
    if (user)
      Meteor.users.update({_id: user._id}, {$set:data});
    else {
      throw new Meteor.Error("user.edit_user", "Can't find user");
    }
    return defer.promise;
  }
});


DDPRateLimiter.addRule({
                         userId: function (userId) {
                           return true;
                         },
                         type: "method",
                         name: "user.user.edit_user",
                       }, 1, 1000);
