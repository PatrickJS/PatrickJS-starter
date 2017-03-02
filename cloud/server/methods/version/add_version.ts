import {Product} from "../../models/Product";
import * as $q from "q";
import {OM} from "../../code/General/ObjectManager";
import {User} from "../../models/User";
import {Role} from "../../models/Role";
import * as _ from "lodash";

new ValidatedMethod({
  name: "version.create_product_version",
  validate: function () {
    const user = OM.create<User>(User).loadById(this.userId);
    if (user.isInRoles([Role.SUPERADMIN, Role.ADMIN, Role.SALES], Role.GROUP_CLOUD)) {
    } else {
      throw new Meteor.Error("product.create_version_error", "Access denied");
    }
  },
  run: function (data: Object) {
    let defer = $q.defer();
    const product = OM.create<Product>(Product).loadById(data['_id']);
    if(!product){
      throw new Meteor.Error("version.create.error", "Product Not Found");
    }
    _.forEach(product._data, function(value, key){
      if(key != "_id" && key != "versions"){
        product.unsetData(key);
      }
    });
    product.versions.push(data['versions']);
    product.setData("versions", product.versions);
    product.save().then(() => defer.resolve(), (err) => defer.reject(err));
    return defer.promise;
  }
});