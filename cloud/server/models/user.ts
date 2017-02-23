export class User implements Meteor.User {
    static LICENSE_PERMISSION_SALES   = 'sales';
    static LICENSE_PERMISSION_AGENCY  = 'agency';
    static LICENSE_PERMISSION_USER    = 'user';
    static LICENSE_PERMISSION_OWNER   = 'owner';
    static LICENSE_PERMISSION_CASHIER = 'cashier';

    profile?: Profile;
    licenses: UserHasLicense[]
}
export interface Profile {
    first_name: String;
    last_name: String;
    country: String,
    phone: String
}
export interface UserHasLicense {
    license_id: string,
    license_permission: string;
}

