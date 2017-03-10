import {Product} from "../../models/Product";
import * as $q from "q";
import {OM} from "../../code/General/ObjectManager";
import {User} from "../../models/User";
import {Role} from "../../models/Role";
import * as _ from "lodash";
import {License} from "../../models/License";

new ValidatedMethod({
  name: "license.delete",
  validate: function () {
    const user = OM.create<User>(User).loadById(this.userId);
    if (user.isInRoles([Role.SUPERADMIN, Role.ADMIN, Role.SALES], Role.GROUP_CLOUD)) {
    } else {
      throw new Meteor.Error("license.edit_license_error", "Access denied");
    }
  },
  run: function (data: Object) {
    let defer              = $q.defer();
    const license: License = OM.create<License>(License).loadById(data['id']);
    if (!license) {
      throw new Meteor.Error("license.error_edit", "License Not Found");
    }
    license.delete().then(() => defer.resolve(), (err) => defer.reject(err));
    return defer.promise;
  }
});
