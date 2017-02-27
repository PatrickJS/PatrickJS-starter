import {AbstractModel} from "./Contract/AbstractModel";
import {
  UserInterface,
  UserHasLicense
} from "./UserInterface";
import {Role} from "./Role";

export class User extends AbstractModel {
  protected $collection             = "users";
  static LICENSE_PERMISSION_SALES   = 'sales';
  static LICENSE_PERMISSION_AGENCY  = 'agency';
  static LICENSE_PERMISSION_USER    = 'user';
  static LICENSE_PERMISSION_OWNER   = 'owner';
  static LICENSE_PERMISSION_CASHIER = 'cashier';
  
  addToRoles(roles: string|string[], group = Role.GROUP_CLOUD): void {
    Roles.addUsersToRoles(this.getData(), roles, group);
  }
  
  setRoles(roles, group = Role.GROUP_CLOUD): void {
    Roles.setUserRoles(this.getData(), roles, group);
  }
  
  isInRoles(roles: string|string[], group = Role.GROUP_CLOUD): boolean {
    return Roles.userIsInRole(this.getData(), roles, group);
  }
  
  getLicenses(): UserHasLicense[] {
    return this.getData('has_license');
  }
  
  getRoles(group = Role.GROUP_CLOUD): string[] {
    return Roles.getRolesForUser(this.getData(), group);
  }
}

