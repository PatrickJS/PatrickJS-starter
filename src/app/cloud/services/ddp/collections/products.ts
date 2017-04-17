import {Injectable} from '@angular/core';
import {AbstractCollection} from "../../../../code/meteor/AbstractCollection";

@Injectable()
export class ProductCollection extends AbstractCollection {
  protected _data = {};
  
  protected $collection: string = "products";
}
