export class Product {
    _id: string;
    name: string;
    versions: ProductVersion[];
    created_at: Date;
    updated_at: Date;
}

export interface ProductVersion {
    name: string;
    version: string;
    created_at: Date;
    updated_at: Date;
}
