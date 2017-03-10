import {OM} from "../../code/General/ObjectManager";
import {User} from "../../models/User";
import {Role} from "../../models/Role";
import {License} from "../../models/License";
import * as $q from 'q';
import {StringHelper} from "../../code/StringHelper";
import {UserLicense} from "../../models/ManyToMany/UserLicense";

new ValidatedMethod({
  name: "license.admin_create_license",
  validate: function () {
    console.log('run admin create');
    const user = OM.create<User>(User).loadById(this.userId);
    if (user.isInRoles([Role.SUPERADMIN, Role.ADMIN, Role.SALES], Role.GROUP_CLOUD)) {
    } else {
      throw new Meteor.Error("license.create_license", "Access denied");
    }
  },
  run: function (data: Object) {
    let defer = $q.defer();
    
    data['created_by']       = this.userId;
    data['is_auto_generate'] = false;
    data['key']              = StringHelper.getUnique();
    let shopOwnerId          = data['shop_owner_id'];
    delete data['shop_owner_id'];
    let license = OM.create<License>(License);
    license.addData(data)
           .save()
           .then((_id) => {
             console.log(shopOwnerId);
             license  = OM.create<License>(License).load(_id);
             let user = OM.create<User>(User).load(shopOwnerId);
             return UserLicense.attach(user, license, User.LICENSE_PERMISSION_OWNER);
           }, err => defer.reject(err))
           .then(() => defer.resolve(), e => defer.reject(e));
    
    return defer.promise;
  }
});
DDPRateLimiter.addRule({
                         userId: function (userId) {
                           return true;
                         },
                         type: "method",
                         name: "user.license.admin_create_license",
                       }, 1, 1000);
