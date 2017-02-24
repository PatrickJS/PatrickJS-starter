import {AbstractModel} from "../code/AbstractModel";
import SimpleSchema from 'simpl-schema';
import {LicenseHasProductInterface, LicenseInterface} from "./LicenseInterface";

export class License extends AbstractModel implements LicenseInterface {
  $collection = "licenses";
  
  static STATUS_ENABLED  = 'enabled';
  static STATUS_DISABLED = 'disabled';
}

export class LicenseHasProduct implements LicenseHasProductInterface {
  $schema = new SimpleSchema({
    product_id: String,
    base_url: [String],
    pricing_id: String,
    start_version: String,
    purchase_date: Date,
    expired_date: Date
  });
}