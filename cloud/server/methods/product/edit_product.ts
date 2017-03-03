import {Product} from "../../models/Product";
import * as $q from "q";
import {OM} from "../../code/General/ObjectManager";
import {User} from "../../models/User";
import {Role} from "../../models/Role";
import * as _ from "lodash";

new ValidatedMethod({
  name: "product.edit_product",
  validate: function () {
    const user = OM.create<User>(User).loadById(this.userId);
    if (user.isInRoles([Role.SUPERADMIN, Role.ADMIN, Role.SALES], Role.GROUP_CLOUD)) {
    } else {
      throw new Meteor.Error("product.edit_product_error", "Access denied");
    }
  },
  run: function (data: Object) {
    let defer = $q.defer();
    const product = OM.create<Product>(Product).loadById(data['_id']);
    if(!product){
      throw new Meteor.Error("product.error_edit", "Product Not Found");
    }
    _.forEach(product._data, function(value, key){
        if(key != "_id"){
          product.unsetData(key);
        }
    });
    product.addData(data);
    product.save().then(() => defer.resolve(), (err) => defer.reject(err));
    return defer.promise;
  }
});