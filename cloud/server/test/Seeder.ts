import {Products} from "../collections/Products";
import {Product} from "../models/Product";
import {Prices} from "../collections/Prices";
import {OM} from "../code/General/ObjectManager";
import {Price} from "../models/Price";

export class Seeder {
  run() {
    this.dummyProduct();
    this.dummyPrices();
  }
  
  private dummyProduct(): void {
    if (Products.collection.find().count() > 0)
      return;
    let _product = () => {
      let versions = [];
      for (let i = 0; i < (Math.round(Math.random() * 10)); i++) {
        versions.push({
                        name   : Math.random().toString(36).substring(7),
                        version: "0.0." + Math.round(Math.random() * 10),
                      });
      }
      return {
        name    : Math.random().toString(36).substring(7),
        versions: versions,
      }
    };
    for (let i = 0; i < 30; i++) {
      let _p = OM.create<Product>(Product, false, _product());
      _p.save();
    }
  }
  
  private dummyPrices() {
    if (Prices.collection.find().count() > 0)
      return;
    let _p = () => {
      return {name: Math.random().toString(36).substring(7)};
    };
    for (let i = 0; i < 10; i++) {
      let _price = OM.create<Price>(Price, false, _p());
      _price.save();
    }
  }
}
