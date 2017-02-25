import {Injectable} from '@angular/core';
import {AbstractCollection} from "../abstract-collection";

@Injectable()
export class ProductCollection extends AbstractCollection {
  protected $collection: string = "products";
}
