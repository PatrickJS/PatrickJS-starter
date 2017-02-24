import * as moment from 'moment';
import {Products} from "../collections/Products";
import {Product} from "../models/Product";

export class Seeder {
  run() {
    this.dummyProduct();
    
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
    // for (let i = 0; i < 1; i++) {
      let _p = new Product();
      _p.addData(_product())
        .save()
        .then(res => console.log(res), rej => console.log(rej));
    // }
  }
}