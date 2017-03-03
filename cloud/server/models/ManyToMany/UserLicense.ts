import {User} from "../User";
import {License} from "../License";
import {Role} from "../Role";
import * as _ from "lodash";

export class UserLicense {
  /*
   * Nếu attach license + cashier cần define products được assign
   */
  static attach(user: User, license: License, permission: string, products: string[] = []): Promise<any> {
    if (user.isInRoles(Role.USER)) {
      if (_.size(user.getLicenses()) > 0)
        throw new Meteor.Error("Can't attack license to this user");
      
      if (_.indexOf([User.LICENSE_PERMISSION_OWNER, User.LICENSE_PERMISSION_CASHIER], permission) < 0)
        throw new Meteor.Error("Can't set permission");
      
      user.setData('has_license',
                   [
                     {
                       license_id        : license.getId(),
                       license_permission: permission
                     }
                   ]);
      
      if (permission == User.LICENSE_PERMISSION_OWNER) {
        license.setData("shop_owner_id", user.getId())
               .setData("shop_owner_username", user.getUsername())
      } else if (permission == User.LICENSE_PERMISSION_CASHIER) {
        // TODO: need implement
      }
      
      return Promise.all([user.save(), license.save()]);
    } else if (user.isInRoles([Role.SALES, Role.AGENCY])) {
      if (_.indexOf([User.LICENSE_PERMISSION_AGENCY, User.LICENSE_PERMISSION_SALES], permission) < 0)
        throw new Meteor.Error("Can't set permission");
      
      let _license = _.find(user.getLicenses(), l => l['_id'] == license.getId());
      if (!_license) {
        user.setData('has_license',
                     [
                       {
                         license_id        : license.getId(),
                         license_permission: permission
                       }
                     ]);
      }
      return user.save();
    }
  }
}
