import {Role} from "./role";
import {AbstractModel} from "../code/AbstractModel";
import SimpleSchema from 'simpl-schema';
import {UserInterface} from "./UserInterface";

export class User extends AbstractModel implements UserInterface {
  $collection = "users";
  $schema     = new SimpleSchema(
    {
      username: {
        type: String,
        min: 6,
        max: 40
      },
      email: {
        type: String,
        regEx: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      },
      password: {
        type: String,
        min: 6,
        max: 50
      },
      license: {
        type: String
      },
      profile: {
        type: Object,
        optional: true
      },
      'profile.first_name': {
        type: String,
        optional: true
      },
      'profile.last_name': {
        type: String,
        optional: true
      },
    },
    {
      clean: {
        filter: true,
        autoConvert: true,
        removeEmptyStrings: true,
        trimStrings: true,
        getAutoValues: true,
        removeNullsFromArrays: true,
      }
    }
  );
  
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

