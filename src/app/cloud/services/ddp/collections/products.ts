import {Injectable} from '@angular/core';
import {AbstractCollection} from "../../../../code/meteor/AbstractCollection";

@Injectable()
export class ProductCollection extends AbstractCollection {
  protected $collection: string = "products";
}
