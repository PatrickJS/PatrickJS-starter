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
    if (_.isArray(license) && _.size(license) == 1 && license[0].license_permission == User.LICENSE_PERMISSION_OWNER) {
      const licenseModel: License = OM.create<License>(License).loadById(license[0].license_id);
      return {
        find: () => {
          return Users.collection.find({_id: {$in: licenseModel.getCashiers()}});
        }
      }
    } else {
      return;
    }
  }
});
