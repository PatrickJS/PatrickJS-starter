import {User} from "../models/User";
import {Role} from "../models/Role";
import {License} from "../models/License";
import {OM} from "../code/General/ObjectManager";
import * as $q from "q";

new ValidatedMethod({
  name    : "license.admin_create_license",
  validate: function () {
    const user = OM.create<User>(User).loadById(this.userId);
    if (user.isInRoles([Role.SUPERADMIN, Role.ADMIN, Role.SALES], Role.GROUP_CLOUD)) {
    } else {
      throw new Meteor.Error("license.create_license", "Access denied");
    }
  },
  run     : function (data: Object) {
    let defer = $q.defer();
    
    data['created_by']       = this.userId;
    data['is_auto_generate'] = false;
    
    let licenseModel = OM.create<License>(License);
    licenseModel.addData(data)
                .save()
                .then(() => defer.resolve(), err => defer.reject(err));
    
    return defer.promise;
  }
});
DDPRateLimiter.addRule({
                         userId: function (userId) {
                           return true;
                         },
                         type  : "method",
                         name  : "user.license.admin_create_license",
                       }, 1, 1000);
