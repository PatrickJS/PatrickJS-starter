import {Prices} from "../collections/Prices";
import {PriceInterface} from "../models/PriceInterface";

Meteor.publishComposite("prices", function (): PublishCompositeConfig<PriceInterface> {
  return {
    find(){
      return Prices.collection.find();
    }
  };
});
