import {ProductInterface} from "../models/ProductInterface";
import {Products} from "../collections/Products";

Meteor.publishComposite("products", function (): PublishCompositeConfig<ProductInterface> {
  return {
    find: function () {
      return Products.collection.find();
    }
  };
});
