export interface ProductInterface {
  _id?: string;
  code: string;
  name?: string;
  additional_data?: {
    description?: string;
  };
  pricings: string[],
  versions?: ProductVersion[];
  created_at?: Date;
  updated_at?: Date;
}
export interface ProductVersion {
  name?: string;
  version?: string;
  changelog: string;
  created_at?: Date;
  updated_at?: Date;
}
