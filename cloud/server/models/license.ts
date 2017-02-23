import {DataObject} from "../core/DataObject";
export class License extends DataObject {
  _id: string;
  key: string;
  status: string;
  products: LicenseHasProduct;
  is_auto_generate?: boolean;
  created_by?: string;
  created_at: Date;
  updated_at: Date
}

export interface LicenseHasProduct {
  product_id: string;
  base_url: string[];
  pricing_id: string;
  start_version: string;
  purchase_date: Date;
  expired_date: Date;
}