import {User} from "../models/User";
import {Role} from "../models/Role";
import {Licenses} from "../collections/Licenses";
import {LicenseInterface} from "../models/LicenseInterface";
import {OM} from "../code/General/ObjectManager";

Meteor.publishComposite("licenses", function (): PublishCompositeConfig<LicenseInterface> {
  if (!this.userId) {
    return;
  }
  const user = OM.create<User>(User).loadById(this.userId);
  if (user.isInRoles([Role.SUPERADMIN, Role.ADMIN], Role.GROUP_CLOUD)) {
    return {
      find: () => {
        return Licenses.collection.find({});
      },
    };
  } else if (user.isInRoles([Role.AGENCY, Role.SALES, Role.USER], Role.GROUP_CLOUD)) {
    return {
      find: () => {
        return Licenses.collection.find({_id: {$in: user.getLicenses().map(_v => _v.license_id)}});
      }
    }
  }
});
