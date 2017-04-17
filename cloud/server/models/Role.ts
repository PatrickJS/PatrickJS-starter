import {AbstractModel} from "./Contract/AbstractModel";

export class Role extends AbstractModel {
  protected $collection = "roles";
  
  static SUPERADMIN = "super_admin";
  static ADMIN      = "admin";
  static SALES      = "sales";
  static AGENCY     = "agency";
  static USER       = "user";
  
  static GROUP_CLOUD = "cloud_group";
  static GROUP_SHOP  = "shop_group";
  
}
