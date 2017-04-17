import {Product} from "../../models/Product";
import * as $q from "q";
import {OM} from "../../code/General/ObjectManager";
import {User} from "../../models/User";
import {Role} from "../../models/Role";

new ValidatedMethod({
  name: "product.create_product",
  validate: function () {
    const user = OM.create<User>(User).loadById(this.userId);
    if (user.isInRoles([Role.SUPERADMIN, Role.ADMIN, Role.SALES], Role.GROUP_CLOUD)) {
    } else {
      throw new Meteor.Error("product.create_product_error", "Access denied");
    }
  },
  run: function (data: Object) {
    let defer = $q.defer();

    let productModel = OM.create<Product>(Product);
    if (data['versions'].length == 0){
      throw new Meteor.Error("Create Error", "Product need at least one version");
    }

    productModel.addData(data)
                .save()
                .then(() => defer.resolve(), (err) => defer.reject(err));
    return defer.promise;
  }
});