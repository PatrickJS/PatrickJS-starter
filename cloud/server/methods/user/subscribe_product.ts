import {User} from "../../models/User";
import {OM} from "../../code/General/ObjectManager";
import {Role} from "../../models/Role";
import {UserHasLicense} from "../../models/UserInterface";
import * as _ from "lodash";

new ValidatedMethod({
  name    : "user.subscribe_product",
  validate: function () {
    if (!this.userId) {
      throw new Meteor.Error("user.subscribe_product", "Access denied");
    }
    let userModel: User = OM.create<User>(User).loadById(this.userId);
    
    // check role
    if (!userModel.isInRoles(Role.USER, Role.GROUP_CLOUD)) {
      throw new Meteor.Error("user.subscribe_product", "Can't subscribe");
    }
    
    // check current license
    if (_.isArray(userModel.getData('has_license')) && _.size(userModel.getData('has_license')) > 1) {
      throw new Meteor.Error("user.subscribe_product", "Each user must have only one license");
    } else if (_.isArray(userModel.getData('has_license')) && _.size(userModel.getData('has_license')) == 1) {
      const license: UserHasLicense = userModel.getData('has_license')[0];
      if (license.license_permission != User.LICENSE_PERMISSION_OWNER) {
        throw new Meteor.Error("user.subscribe_product", "Access denied");
      }
    }
  },
  run     : function (data) {
    /*
     * Khi user subscribe product, nếu:
     *  User đó đã có license rồi:
     *  - Kiểm tra xem license đó đã có product đó chưa, nếu chưa thì tạo mới product trong license, nếu có rồi thì update product
     *  User chưa có license:
     *  - Tự động generate ra 1 license , tạo thông tin trong license. Sau đó update license đấy vào user. Nhớ là user sẽ có permission là shop_owner
     * Tính toán để charge tiền khách hàng, làm sau khi có requirment
     */
  }
});
