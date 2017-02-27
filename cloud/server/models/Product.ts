import {AbstractModel} from "./Contract/AbstractModel";
import {ProductInterface} from "./ProductInterface";

export class Product extends AbstractModel {
  $collection: string = 'products';
}