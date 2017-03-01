import {AbstractModel} from "./Contract/AbstractModel";
import {LicenseHasProductInterface} from "./LicenseInterface";
import * as _ from "lodash";

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
  
  getProducts(): LicenseHasProductInterface[] {
    return this.getData("has_product") ? this.getData("has_product") : [];
  }
  
  getCashierInProduct(productId: string): string[] {
    const _product: LicenseHasProductInterface = _.find(this.getProducts(), p => p['product_id'] == productId);
    return _product ? _product.has_cashier : [];
  }
  
  getCashiers(): string[] {
    let _cashiers = [];
    _.forEach(this.getProducts(), p => {
      if (!p.has_cashier || !_.isArray(p.has_cashier))
        p.has_cashier = [];
      _cashiers = _.concat(_cashiers, p.has_cashier);
    });
    return _cashiers;
  }
}
