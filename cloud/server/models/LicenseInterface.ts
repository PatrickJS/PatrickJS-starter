export interface LicenseInterface {
  _id?: string;
  key?: string;
  status?: number;
  shop_owner_id?: string;
  shop_owner_username?: string;
  has_product?: LicenseHasProductInterface[];
  has_roles?: LicenseHasRoleInterface[];
  is_auto_generate?: boolean;
  created_by?: string;
  created_at?: Date;
  updated_at?: Date
}
export interface LicenseHasRoleInterface{
  code: string;
  name:string;
  has_permissions: LicenseHasRoleHasPermissionInterface[];
}

export interface LicenseHasRoleHasPermissionInterface{
  code:string;
  group: string;
  permission:string;
  is_active:boolean;
}

export interface LicenseHasProductInterface {
  product_id?: string;
  base_url?: BaseUrl[];
  pricing_id?: string;
  has_user: LicenseHasProductHasUser[];
  start_version?: string;
  purchase_date?: Date;
  expired_date?: Date;
}

export interface BaseUrl{
  status?: number;
  url: string;
}

export interface LicenseHasProductHasUser {
  user_id: string;
  username: string;
}
