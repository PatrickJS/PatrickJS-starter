import {User} from "../../models/User";
import {OM} from "../../code/General/ObjectManager";
import {Role} from "../../models/Role";
import {License} from "../../models/License";
import {UserLicense} from "../../models/ManyToMany/UserLicense";

new ValidatedMethod({
  name: 'user.edit_user',
  validate: function () {
    if (!this.userId) {
      throw new Meteor.Error("user.get_roles", "Access denied");
    }
    let userModel: User = OM.create<User>(User).loadById(this.userId);
    if (!userModel.isInRoles([Role.SUPERADMIN, Role.ADMIN], Role.GROUP_CLOUD) && !userModel.isShopOwner()){
      throw new Meteor.Error("user.edit_user_error", "Access denied");
    }
  },
  run: function (data) {
    let currentUser: User = OM.create<User>(User).loadById(this.userId);
    let userModel: User = OM.create<User>(User).loadById(data._id);
    if (userModel) {
      if (data.hasOwnProperty('role') && data.role) {
        userModel.setRoles(data.role, Role.GROUP_SHOP);
      } else {
        let unset = {$unset: {}};
        unset.$unset['roles.shop_group'] = "";
        Meteor.users.update({_id: data._id}, unset);
      }
      if (currentUser.isInRoles([Role.SUPERADMIN, Role.ADMIN], Role.GROUP_CLOUD)) {
        data['emails.0.verified'] = data['email_verified'];
        Meteor.users.update({_id: data._id}, {$set: data});
      }else if (currentUser.isShopOwner()) {
        let new_data = {
          username: data['username'],
          email: data['email'],
          profile: {
            first_name: data['first_name'],
            last_name: data['last_name'],
            is_disabled: data['isDisabled']
          }
        };
        Meteor.users.update({_id: data._id}, {$set: new_data});
        const license = OM.create<License>(License).load(data['license_id']);
        userModel = OM.create<User>(User).loadById(data._id);
        return UserLicense.attach(userModel, license, User.LICENSE_PERMISSION_CASHIER, data['products']);
      }
    }else {
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
