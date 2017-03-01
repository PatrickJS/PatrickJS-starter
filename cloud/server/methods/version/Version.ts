import {Product} from "../../models/Product";
import * as $q from "q";
import {OM} from "../../code/General/ObjectManager";

new ValidatedMethod({
  name: "version.create_product_version",
  validate: function () {

  },
  run: function (product_id: string, data: Object) {
    let defer = $q.defer();

    const product = OM.create<Product>(Product).loadById(product_id);
    if(!product){
      throw new Meteor.Error("version.create", "Product Not Found");
    }
    product.versions.push(data);
    product.setData("versions", product.versions);
    product.save().then(() => defer.resolve(), (err) => defer.reject(err));
    return defer.promise;
  }
});