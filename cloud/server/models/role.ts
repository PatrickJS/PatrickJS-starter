import {DataObject} from "../core/DataObject";
export class Role extends DataObject {
  static SUPERADMIN = "super_admin";
  static ADMIN      = "admin";
  static SALES      = "sales";
  static AGENCY     = "agency";
  static USER       = "user";
  
  static GROUP_CLOUD = "cloud_group";
  static GROUP_SHOP  = "shop_group";
  
  
}