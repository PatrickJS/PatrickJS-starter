import {AbstractModel} from "../code/AbstractModel";
import SimpleSchema from 'simpl-schema';
import {UserInterface} from "./UserInterface";
import {Role} from "./Role";

export class User extends AbstractModel implements UserInterface {
  $collection = "users";
  static LICENSE_PERMISSION_SALES   = 'sales';
  static LICENSE_PERMISSION_AGENCY  = 'agency';
  static LICENSE_PERMISSION_USER    = 'user';
  static LICENSE_PERMISSION_OWNER   = 'owner';
  static LICENSE_PERMISSION_CASHIER = 'cashier';
  
  
  addToRoles(roles: string|string[], group = Role.GROUP_CLOUD): void {
    Roles.addUsersToRoles(this, roles, group);
  }
  
  isInRoles(roles: string|string[], group = Role.GROUP_CLOUD): boolean {
    return Roles.userIsInRole(this, roles, group);
  }
  
  getLicenses() {
    return this.getData('has_license');
  }
}

