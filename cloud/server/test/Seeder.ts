import * as moment from 'moment';
import {Products} from "../collections/Products";
import {Product} from "../models/Product";
import {Prices} from "../collections/Prices";
import {OM} from "../code/General/ObjectManager";
import {Price} from "../models/Price";

export class Seeder {
  run() {
    this.dummyProduct();
    this.dummyPricies();
  }
  
  private dummyProduct(): void {
    if (Products.collection.find().count() > 0)
      return;
    
    let _product = () => {
      return {
        // name: Math.random().toString(36).substring(7),
        versions: [
          {
            name: Math.random().toString(36).substring(7),
            version: "0.0." + Math.round(Math.random() * 10),
            created_at: moment().toDate(),
            updated_at: moment().toDate(),
          }
        ],
        created_at: moment().toDate(),
        updated_at: moment().toDate(),
      }
    };
    for (let i = 0; i < 1; i++) {
      let _p = OM.getInstance().create<Product>(Product, false, _product());
      _p.save()
        .then(res => console.log(res), rej => console.log(rej));
    }
  }
  
  private dummyPricies() {
    if (Prices.collection.find().count() > 0)
      return;
    let _p = () => {
      return {name: Math.random().toString(36).substring(7)};
    };
    for (let i = 0; i < 1; i++) {
      let _price = OM.getInstance().create<Price>(Price, false, _p());
      _price.addData(_p())
            .save()
            .then(res => console.log(res), rej => console.log(rej));
    }
  }
}