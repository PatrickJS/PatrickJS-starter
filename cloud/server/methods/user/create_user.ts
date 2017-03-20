import {User} from "../../models/User";
import {OM} from "../../code/General/ObjectManager";
import {Role} from "../../models/Role";
import {UserLicense} from "../../models/ManyToMany/UserLicense";
import {License} from "../../models/License";
import * as _ from "lodash";
import * as $q from "q";

new ValidatedMethod({
  name: 'user.create_user',
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
    let user = OM.create<User>(User).load(data['username'], "username");
    if (!user)
      Accounts.createUser(data);
    return defer.promise;
  }
});


DDPRateLimiter.addRule({
                         userId: function (userId) {
                           return true;
                         },
                         type: "method",
                         name: "user.create_user",
                       }, 1, 1000);
