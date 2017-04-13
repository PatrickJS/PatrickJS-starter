import * as $q from "q";
import {User} from "../../models/User";
import {OM} from "../../code/General/ObjectManager";
import {License} from "../../models/License";
import {StringHelper} from "../../code/StringHelper";

new ValidatedMethod({
  name: 'license.create_role',
  validate: function () {
    if (!this.userId) {
      throw new Meteor.Error("user.get_roles", "Access denied");
    }
    let userModel: User = OM.create<User>(User).loadById(this.userId);
    if (!userModel.isShopOwner())
      throw new Meteor.Error("user.create_cashier_by_shop_owner", "You are not shop owner");
  },
  run: function (data) {
    let defer = $q.defer();
    const license = OM.create<License>(License).load(data['license_id']);
    let role = {
      name: data['name']
    };
    role['code'] = StringHelper.getUnique();

    if (!!license.getData('has_roles') && _.isArray(license.getData('has_roles'))){
      let has_roles = license.getData('has_roles');
      has_roles.push(role);
      license.setData('has_roles', has_roles);
    }else{
      license.setData('has_roles', [role]);
    }
    license.save().then(() => defer.resolve(), (err) => defer.reject(err));
    return defer.promise;
  }
});
