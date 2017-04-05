import {User} from "../../models/User";
import {OM} from "../../code/General/ObjectManager";
import {Role} from "../../models/Role";

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
    let userModel: User = OM.create<User>(User).loadById(data._id);
    data['emails.0.verified'] = data['email_verified'];
    if (userModel) {
      if (data.role){
        userModel.setRoles(data.role, Role.GROUP_SHOP);
      }else{
        let unset = {$unset: {}};
        unset.$unset['roles.shop_group'] = "";
        Meteor.users.update({_id: data._id}, unset);
      }
      Meteor.users.update({_id: data._id}, {$set: data});
    }
    else {
      throw new Meteor.Error("user.edit_user", "Can't find user");
    }
  }
});


DDPRateLimiter.addRule({
                         userId: function (userId) {
                           return true;
                         },
                         type: "method",
                         name: "user.user.edit_user",
                       }, 1, 1000);
