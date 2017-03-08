import {User} from "../User";
import {License} from "../License";
import {Role} from "../Role";
import * as _ from "lodash";

export class UserLicense {
  /*
   * Nếu attach license + cashier cần define products được assign
   */
  static attach(user: User, license: License, userHasLicensePermission: string, products: string[] = []): Promise<any> {
    if (user.isInRoles(Role.USER)) {
      
      // Nếu user đã tồn tại license và license đó không phải là cái hiện tại thì báo lỗi
      if (_.size(user.getLicenses()) > 0 && user.getLicenses()[0].license_id != license.getId())
        throw new Meteor.Error("User already has license");
      
      if (_.indexOf([User.LICENSE_PERMISSION_OWNER, User.LICENSE_PERMISSION_CASHIER], userHasLicensePermission) < 0)
        throw new Meteor.Error("Can't set permission");
      
      user.setData('has_license',
                   [
                     {
                       license_id: license.getId(),
                       license_permission: userHasLicensePermission
                     }
                   ]);
      
      if (userHasLicensePermission == User.LICENSE_PERMISSION_OWNER) {
        license.setData("shop_owner_id", user.getId())
               .setData("shop_owner_username", user.getUsername())
      } else if (userHasLicensePermission == User.LICENSE_PERMISSION_CASHIER) {
        if (_.size(products) == 0) {
          throw new Meteor.Error("Please define products");
        }
        
        let licenseHasProduct = license.getProducts();
        _.forEach(products, productId => {
          let _pInLicense = _.find(licenseHasProduct, pInLicense => pInLicense.product_id == productId);
          if (!_pInLicense)
            throw new Meteor.Error("License has not purchased product");
          if (_.isArray(_pInLicense.has_user)) {
            let _isExistedInProduct = _.find(_pInLicense.has_user, _u => _u.user_id == user.getId());
            if (!_isExistedInProduct) {
              _pInLicense.has_user.push({user_id: user.getId(), username: user.getData('username')});
            }
          } else {
            _pInLicense.has_user = [];
            _pInLicense.has_user.push({user_id: user.getId(), username: user.getData('username')});
          }
        });
        
        license.setData('has_product', licenseHasProduct);
      }
      return Promise.all([user.save(), license.save()]);
    } else if (user.isInRoles([Role.SALES, Role.AGENCY])) {
      if (_.indexOf([User.LICENSE_PERMISSION_AGENCY, User.LICENSE_PERMISSION_SALES], userHasLicensePermission) < 0)
        throw new Meteor.Error("Can't set permission");
      
      let _license = _.find(user.getLicenses(), l => l['_id'] == license.getId());
      if (!_license) {
        user.setData('has_license',
                     [
                       {
                         license_id: license.getId(),
                         license_permission: userHasLicensePermission
                       }
                     ]);
      }
      return user.save();
    }
  }
}
