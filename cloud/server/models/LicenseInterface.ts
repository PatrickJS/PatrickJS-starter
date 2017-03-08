export interface LicenseInterface {
  _id?: string;
  key?: string;
  status?: number;
  shop_owner_id?: string;
  shop_owner_username?: string;
  has_product?: LicenseHasProductInterface[];
  is_auto_generate?: boolean;
  created_by?: string;
  created_at?: Date;
  updated_at?: Date
}

export interface LicenseHasProductInterface {
  product_id?: string;
  base_url?: string[];
  pricing_id?: string;
  has_user: LicenseHasProductHasUser[];
  start_version?: string;
  purchase_date?: Date;
  expired_date?: Date;
}

export interface LicenseHasProductHasUser {
  user_id: string;
  username: string;
}
