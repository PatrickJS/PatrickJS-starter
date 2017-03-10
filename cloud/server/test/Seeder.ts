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
    this.dummyUser();
    this.dummyPrices();
    this.dummyProduct();
    this.dummyLicenses();
  }
  
  private dummyUser() {
    if (Users.collection.find().count() > 1)
      return;
    
    for (let i = 0; i < 10; i++) {
      Accounts.createUser(
        {
          username: "vjcspy" + i,
          email: "mr.vjcspy" + i + "@gmail.com",
          password: "admin123"
        });
    }
  }

  private dummyProduct(): void {
    if (Products.collection.find().count() > 1)
      return;
    const productName = ["X-POS", "X-REPORT", "X-WAREHOUSE", "X-REWARD"];
    let _product      = (ii) => {
      let versions = [];
      let price_ids = [];
      for (let i = 0; i < (Math.round(Math.random() * 10)); i++) {
        this.randomCheckIdObject(Prices.find().fetch(), price_ids);
        versions.push({
                        name: Math.random().toString(36).substring(7),
                        version: "0.0." + i,
                        created_at: DateTimeHelper.getCurrentDate(),
                        updated_at: DateTimeHelper.getCurrentDate()
                      });
      }
      return {
        name: productName[ii],
        additional_data: {
          description: "des"
        },
        pricings: price_ids,
        versions: versions,
      }
    };

    for (let i = 0; i < 4; i++) {
      let _p = OM.create<Product>(Product, false);
      _p.addData(_product(i))
        .save().then(ok => {}, err => {console.log(err)});
    }
  }

  private dummyPrices() {
    if (Prices.collection.find().count() > 0)
      return;
    let _p = () => {
      return {name: Math.random().toString(36).substring(7)};
    };
    for (let i = 0; i < 4; i++) {
      let _price = OM.create<Price>(Price, false, _p());
      _price.save();
    }
  }

  private dummyLicenses() {
    if (Licenses.collection.find().count() > 0)
      return;

    let _license = () => {
      let user_ids          = [];
      let user_id           = this.randomCheckIdObject(Users.find().fetch(), user_ids);
      let licensehasproduct = [];
      let product_ids       = [];
      let price_ids         = [];

      for (let i = 1; i < Math.round(Math.random() * 10); ++i) {
        let product_id = this.randomCheckIdObject(Products.find().fetch(), product_ids);
        let product = Products.findOne({_id: product_id});//
        let price_id   = this.randomCheckIdObject(Prices.find({_id:{$in: product['pricings']}}).fetch(), price_ids);
        let base_url   = [];
        for (let j = 0; j < Math.round(Math.random() * 5); ++j) {
          base_url.push(Math.random().toString(36).substring(7));
        }
        let start_version = "0.0." + Math.round(Math.random() * 10);
        let purchase_date = DateTimeHelper.getCurrentDate();
        let expired_date  = DateTimeHelper.getCurrentDate();

        licensehasproduct.push({
                                 product_id: product_id,
                                 base_url: base_url,
                                 pricing_id: price_id,
                                 start_version: start_version,
                                 status: Math.floor(Math.random() * 9) % 3,
                                 purchase_date: purchase_date,
                                 expired_date: expired_date
                               });
      }

      return {
        key: Math.random().toString(36).substring(7),
        status: Math.floor(Math.random() * 9) % 3,
        has_product: licensehasproduct,
        created_by: Users.collection.findOne({"username": "superadmin"})['username']
      };
    };

    for (let i = 0; i < 10; i++) {
      let _l = OM.create<License>(License, false, _license());
      _l.save();
    }
  }

  randomCheckIdObject(arr: any[], array: any[]) {
    let id = this.randomIdObject(arr);
    while (array.indexOf(id) > -1) {
      id = this.randomIdObject(arr);
    }
    array.push(id);
    return id;
  }

  randomIdObject(arr: any[]) {
    let item = arr[Math.floor(Math.random() * arr.length)];
    return item._id;
  }
}
