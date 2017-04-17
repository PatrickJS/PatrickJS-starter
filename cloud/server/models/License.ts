import {AbstractModel} from "./Contract/AbstractModel";
import {LicenseHasProductInterface} from "./LicenseInterface";
import * as _ from "lodash";

export class License extends AbstractModel {
  protected $collection = "licenses";

  static STATUS_BASE_URL_ACTIVE = 1;
  static STATUS_BASE_URL_INACTIVE = 0;

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
  
  /*
   * Retrieve all user id belong to license
   */
  getUserIds(): string[] {
    let _users = [];
    _.forEach(this.getProducts(), p => {
      if (!p.has_user || !_.isArray(p.has_user))
        p.has_user = [];
      _users = _.concat(_users, _.map(p.has_user, 'user_id'));
    });
    return _users;
  }
}
