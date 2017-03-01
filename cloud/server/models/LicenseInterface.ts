export interface LicenseInterface {
  _id?: string;
  key?: string;
  status?: number;
  shop_owner_id?: string;
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
  has_cashier: string[]; // array _id of cashier
  start_version?: string;
  purchase_date?: Date;
  expired_date?: Date;
}
