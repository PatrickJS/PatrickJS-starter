import {Product} from "../../models/Product";
import * as $q from "q";
import {OM} from "../../code/General/ObjectManager";
import {User} from "../../models/User";
import {Role} from "../../models/Role";

new ValidatedMethod({
  name: "product.edit_product",
  validate: function () {
    const user = OM.create<User>(User).loadById(this.userId);
    if (user.isInRoles([Role.SUPERADMIN, Role.ADMIN, Role.SALES], Role.GROUP_CLOUD)) {
    } else {
      throw new Meteor.Error("product.edit_product_error", "Access denied");
    }
  },
  run: function (product_id, data: Object) {
    let defer = $q.defer();
    const product = OM.create<Product>(Product).loadById(product_id);
    if(!product){
      throw new Meteor.Error("product.error_edit", "Product Not Found");
    }
    product.getData().save().then(() => defer.resolve(), (err) => defer.reject(err));
    return defer.promise;

  }
});