import {OM} from "../../code/General/ObjectManager";
import {User} from "../../models/User";
import {Role} from "../../models/Role";
import {License} from "../../models/License";
import SimpleSchema from 'simpl-schema';
import {ZValidator} from "../../code/ZValidator";
import {UserLicense} from "../../models/ManyToMany/UserLicense";

new ValidatedMethod({
  name    : "license.assign_to_user",
  validate: function (data) {
    const user = OM.create<User>(User).loadById(this.userId);
    if (user.isInRoles([Role.SUPERADMIN, Role.ADMIN, Role.SALES], Role.GROUP_CLOUD)) {
    } else {
      throw new Meteor.Error("license.assign_to_user", "Access denied");
    }
    
    ZValidator.validate(new SimpleSchema({
      license   : String,
      user      : String,
      permission: String
    }), data);
    
  },
  run     : function (data: Object) {
    const licenseId           = data['license'];
    const userId              = data['user'];
    let licenseModel: License = OM.create<License>(License).loadById(licenseId);
    let userModel: User       = OM.create<User>(User).loadById(userId);
    
    return UserLicense.attach(userModel, licenseModel, data['permission']);
  }
});
DDPRateLimiter.addRule({
                         userId: function (userId) {
                           return true;
                         },
                         type  : "method",
                         name  : "user.license.assign_to_user",
                       }, 3, 1000);
