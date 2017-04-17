import {AbstractModel} from "./Contract/AbstractModel";

export class Product extends AbstractModel {
  $collection: string = 'products';
}
