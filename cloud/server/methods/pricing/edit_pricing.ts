import {Price} from "../../models/Price";
import * as $q from "q";
import {OM} from "../../code/General/ObjectManager";
import {User} from "../../models/User";
import {Role} from "../../models/Role";
import * as _ from "lodash";

new ValidatedMethod({
  name: "pricing.edit_pricing",
  validate: function () {
    const user = OM.create<User>(User).loadById(this.userId);
    if (user.isInRoles([Role.SUPERADMIN, Role.ADMIN, Role.SALES], Role.GROUP_CLOUD)) {
    } else {
      throw new Meteor.Error("pricing.edit_pricing_error", "Access denied");
    }
  },
  run: function (data: Object) {
    let defer = $q.defer();
    const pricing = OM.create<Price>(Price).loadById(data['_id']);
    if(!pricing){
      throw new Meteor.Error("pricing.error_edit", "Product Not Found");
    }
    _.forEach(pricing._data, function(value, key){
      pricing.unsetData(key);
    });
    pricing.addData(data);
    pricing.save().then(() => defer.resolve(), (err) => defer.reject(err));
    return defer.promise;
  }
});