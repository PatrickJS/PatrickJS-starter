import SimpleSchema from 'simpl-schema';
import {LicenseHasProductInterface, LicenseInterface} from "./LicenseInterface";
import {AbstractModel} from "./Contract/AbstractModel";

export class License extends AbstractModel {
  protected $collection = "licenses";
  
  static STATUS_ENABLED  = 1;
  static STATUS_DISABLED = 0;
}

export class LicenseHasProduct {
  $schema = new SimpleSchema({
    product_id: String,
    base_url: [String],
    pricing_id: String,
    start_version: String,
    purchase_date: Date,
    expired_date: Date
  });
}