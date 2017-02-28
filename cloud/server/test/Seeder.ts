import {Products} from "../collections/Products";
import {Product} from "../models/Product";
import {Prices} from "../collections/Prices";
import {Users} from '../collections/Users';
import {OM} from "../code/General/ObjectManager";
import {Price} from "../models/Price";
import {License} from '../models/License';
import {Licenses} from '../collections/Licenses';
import {DateTimeHelper} from "../code/DateTimeHelper";

export class Seeder {
  run() {
    this.dummyProduct();
    this.dummyPrices();
    this.dummyLicenses();
  }
  
  private dummyProduct(): void {
    if (Products.collection.find().count() > 0)
      return;
    let _first   = true;
    let _product = () => {
      let versions = [];
      for (let i = 0; i < (Math.round(Math.random() * 10)); i++) {
        versions.push({
                        name   : Math.random().toString(36).substring(7),
                        version: "0.0." + Math.round(Math.random() * 10),
                      });
      }
      return {
        _id     : _first ? "xpos_xreport" : null,
        name    : _first ? "X-POS & X-Report" : Math.random().toString(36).substring(7),
        versions: versions,
      }
    };
    for (let i = 0; i < 5; i++) {
      let _p = OM.create<Product>(Product, false, _product());
      _first = false;
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
  
  private dummyLicenses() {
    if (Licenses.collection.find().count() > 0)
      return;
    let products = Products.find().fetch();
    let prices   = Prices.find().fetch();
    let users    = Users.find().fetch();
    
    let _license = () => {
      let user_id           = this.randomCheckIdObject(users);
      let licensehasproduct = [];
      let product_ids       = [];
      let user_ids          = [];
      for (let i = 0; i < Math.round(Math.random() * 10); ++i) {
        let product_id = this.randomCheckIdObject(products);
        let price_id   = this.randomCheckIdObject(prices);
        let base_url   = [];
        for (let j = 0; j < Math.round(Math.random() * 5); ++j) {
          base_url.push(Math.random().toString(36).substring(7));
        }
        let start_version = "0.0." + Math.round(Math.random() * 10);
        let purchase_date = DateTimeHelper.getCurrentDate();
        let expired_date  = DateTimeHelper.getCurrentDate();
        
        licensehasproduct.push({
                                 product_id   : product_id,
                                 base_url     : base_url,
                                 pricing_id   : price_id,
                                 start_version: start_version,
                                 purchase_date: purchase_date,
                                 expired_date : expired_date
                               });
      }
      
      return {
        key          : Math.random().toString(36).substring(7),
        status       : Math.floor(Math.random() * 9) % 3,
        has_product  : licensehasproduct,
        created_by   : Users.collection.findOne({"username": "superadmin"})._id
      };
    };
    
    for (let i = 0; i < 10; i++) {
      let _l = OM.create<License>(License, false, _license());
      _l.save();
    }
  }
  
  randomCheckIdObject(array: any[]) {
    let id = this.randomIdObject(array);
    return id;
  }
  
  randomIdObject(arr: any[]) {
    let item = arr[Math.floor(Math.random() * arr.length)];
    return item._id;
  }
}
