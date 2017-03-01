import SimpleSchema from 'simpl-schema';
import {AbstractModel} from "./Contract/AbstractModel";

export class License extends AbstractModel {
  protected $collection = "licenses";
  
  /*
   * License nếu được tự động generate hoặc do admin thì sẽ ở trạng thái STATUS_FRESH.
   * Khi user tự subscribe thì sẽ ở trạng thái STATUS_ACTIVATED
   * Admin muốn ngừng quyền sử dụng của 1 license thì chuyển về STATUS_DEACTIVATED
   */
  static STATUS_ACTIVATED   = 1;
  static STATUS_DEACTIVATED = 0;
  static STATUS_FRESH       = 2;
}

export class LicenseHasProduct {
  $schema = new SimpleSchema({
    product_id   : String,
    base_url     : [String],
    pricing_id   : String,
    start_version: String,
    purchase_date: Date,
    expired_date : Date
  });
}
