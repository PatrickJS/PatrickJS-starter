export interface UserInterface extends Meteor.User {
  profile?: Profile;
  has_license?: UserHasLicense[];
}
export interface Profile {
  first_name?: String;
  last_name?: String;
  country?: String,
  phone?: String
}
export interface UserHasLicense {
  license_id?: string,
  license_permission?: string;
}