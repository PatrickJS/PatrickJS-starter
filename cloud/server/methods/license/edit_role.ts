import * as $q from "q";
import {User} from "../../models/User";
import {OM} from "../../code/General/ObjectManager";
import {License} from "../../models/License";

new ValidatedMethod({
  name: 'license.edit_role',
  validate: function () {
    if (!this.userId) {
      throw new Meteor.Error("user.get_roles", "Access denied");
    }
    let userModel: User = OM.create<User>(User).loadById(this.userId);
    if (!userModel.isShopOwner())
      throw new Meteor.Error("user.create_cashier_by_shop_owner", "You are not shop owner");
  },
  run: function (data) {
    let defer     = $q.defer();
    const license = OM.create<License>(License).load(data['license_id']);
    if (!!data['code']) {
      let findRole = _.find(license.getData('has_roles'), (rol) => {
        return rol['code'] == data['code'];
      });
      if (!!findRole) {
        let has_roles = _.map(license.getData('has_roles'), (rol) => {
          if (rol['code'] == data['code']) {
            rol['name'] = data['name'];
          }
          return rol;
        });
        license.setData('has_roles', has_roles);
        license.save().then(() => defer.resolve(), (err) => defer.reject(err));
        return defer.promise;
      } else
          throw new Meteor.Error("user.edit_role", "Cannot find role");
    }
  }
});
