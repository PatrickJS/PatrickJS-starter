import {Users} from "../collections/Users";
import {
  UserInterface,
  UserHasLicense
} from "../models/UserInterface";
import {OM} from "../code/General/ObjectManager";
import {User} from "../models/User";
import {Role} from "../models/Role";
import * as _ from "lodash";
import {License} from "../models/License";

Meteor.publishComposite('users', function (): PublishCompositeConfig<UserInterface> {
  if (!this.userId) {
    return;
  }
  let userModel: User = OM.create<User>(User).loadById(this.userId);
  if (userModel.isInRoles([Role.ADMIN, Role.SUPERADMIN, Role.SALES])) {
    return {
      find: () => {
        return Users.collection.find({});
      }
    };
  } else if (userModel.isInRoles(Role.USER)) {
    let license: UserHasLicense[] = userModel.getLicenses();
    if (_.isArray(license)
        && _.size(license) == 1
        && _.indexOf([User.LICENSE_PERMISSION_OWNER, User.LICENSE_PERMISSION_CASHIER], license[0].license_permission) > -1) {
      const licenseModel: License = OM.create<License>(License).loadById(license[0].license_id);
      if (!licenseModel) {
        // Wtf error?
        return;
      }
      return {
        find: () => {
          return Users.collection.find({_id: {$in: _.concat(licenseModel.getUserIds(), [this.userId])}},
                                       {fields: {_id: 1, emails: 1, has_license: 1, roles: 1, username: 1}});
        }
      }
    } else {
      return {
        find: () => {
          return Users.collection.find({_id: this.userId}, {fields: {_id: 1, emails: 1, has_license: 1, roles: 1, username: 1}});
        }
      }
    }
  }
});
