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
    if(!!license.getData('shop_owner_id')){
      const user: User = OM.create<User>(User).loadById(license.getData('shop_owner_id'));
      if (!!user){
        user.unsetData('has_license');
        user.save();
      }
      let cashiers = [];
      _.forEach(license['has_product'], (product) => {
        if (product.hasOwnProperty('has_user')){
          let cashier_list = _.map(product['has_user'], (user) => {
            return user['user_id'];
          });
          _.concat(cashiers, cashier_list);
        }
      });
      _.forEach(cashiers, (cashier) => {
        const cash: User = OM.create<User>(User).loadById(cashier);
        if (!!cash){
          cash.unsetData('has_license');
          cash.save();
        }
      });
    }
    license.delete().then(() => defer.resolve(), (err) => defer.reject(err));
    return defer.promise;
  }
});
