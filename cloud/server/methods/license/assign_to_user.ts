import {OM} from "../../code/General/ObjectManager";
import {User} from "../../models/User";
import {Role} from "../../models/Role";
import {License} from "../../models/License";
import * as $q from 'q';
import SimpleSchema from 'simpl-schema';
import {ZValidator} from "../../code/ZValidator";
import {UserHasLicense} from "../../models/UserInterface";
import * as _ from 'lodash';

new ValidatedMethod({
  name    : "license.assign_to_user",
  validate: function (data) {
    const user = OM.create<User>(User).loadById(this.userId);
    if (user.isInRoles([Role.SUPERADMIN, Role.ADMIN, Role.SALES], Role.GROUP_CLOUD)) {
    } else {
      throw new Meteor.Error("license.assign_to_user", "Access denied");
    }
    
    ZValidator.validate(new SimpleSchema({
      license: String,
      user   : String
    }), data);
    
    const userAssign: User = OM.create<User>(User).loadById(data.user);
    if (!userAssign.isInRoles(Role.USER))
      throw new Meteor.Error("license.assign_to_user", "Can't assign to this user");
    else if (_.isArray(userAssign.getLicenses()) && _.size(userAssign.getLicenses()) > 0) {
      throw new Meteor.Error("license.assign_to_user", "User already has license");
    }
  },
  run     : function (data: Object) {
    const licenseId = data['license'];
    const userId    = data['user'];
    
    let assignLicenseToUser = () => {
      let licenseModel: License = OM.create<License>(License).loadById(licenseId);
      if (!licenseModel)
        throw new Meteor.Error("license.assign_to_user", "Can't find license");
      
      return licenseModel.setData('shop_owner_id', userId)
                         .save();
    };
    let assignUserToLicense = () => {
      let userHasLicense: UserHasLicense = {
        license_id        : licenseId,
        license_permission: User.LICENSE_PERMISSION_OWNER
      };
      let userModel: User                = OM.create<User>(User).loadById(userId);
      if (!userModel)
        throw new Meteor.Error("license.assign_to_user", "Can't find license");
      
      return userModel.setData('has_license', [userHasLicense])
                      .save();
    };
    
    return $q.all([assignLicenseToUser(), assignUserToLicense()]);
  }
});
DDPRateLimiter.addRule({
                         userId: function (userId) {
                           return true;
                         },
                         type  : "method",
                         name  : "user.license.assign_to_user",
                       }, 3, 1000);
