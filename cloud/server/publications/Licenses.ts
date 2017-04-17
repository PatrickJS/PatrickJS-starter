import { User } from "../models/User";
import { Role } from "../models/Role";
import { Licenses } from "../collections/Licenses";
import { LicenseInterface } from "../models/LicenseInterface";
import { OM } from "../code/General/ObjectManager";
import { Users } from "../collections/Users";
import * as _ from "lodash";

Meteor.publishComposite("licenses", function (): PublishCompositeConfig<LicenseInterface> {
  if (!this.userId) {
    return;
  }
  const user: User = OM.create<User>(User).loadById(this.userId);
  if (user.isInRoles([Role.SUPERADMIN, Role.ADMIN], Role.GROUP_CLOUD)) {
    return {
      find: () => {
        return Licenses.collection.find({});
      },
    };
  } else if (user.isInRoles([Role.AGENCY, Role.SALES, Role.USER], Role.GROUP_CLOUD)) {
    return {
      find: () => {
        return Licenses.collection.find({ _id: { $in: user.getLicenses().map(_v => _v.license_id) } });
      },
      children: [{
        find: (license) => {
          if (user.isInRoles([Role.USER]) && user.getLicenses()[0] && user.getLicenses()[0]['license_permission'] == User.LICENSE_PERMISSION_OWNER) {
            let _userIds = [];
            _.forEach(license.has_product, product => {
              _.forEach(product.has_user, _u => { _userIds.push(_u.user_id) });
            });
            return Users.collection.find({ _id: { $in: _userIds } })
          }
          else
            return;
        }
      }]
    }
  }
});
