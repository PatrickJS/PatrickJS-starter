export interface UserInterface extends Meteor.User {
  profile?: Profile;
  has_license?: UserHasLicense[];
  created_at?: Date;
  updated_at?: Date;
}
export interface Profile {
  first_name?: String;
  last_name?: String;
  country?: String,
  phone?: String
}

/*
 * Nếu là tài khoản user thì mỗi user chỉ có tối đa 1 license.
 * Tài khoản sales và agency thì có nhiều license
 */
export interface UserHasLicense {
  license_id?: string,
  license_permission?: string;
}
