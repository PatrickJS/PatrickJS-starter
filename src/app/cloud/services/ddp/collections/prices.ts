import {Injectable} from '@angular/core';
import {AbstractCollection} from "../../../../code/meteor/AbstractCollection";

@Injectable()
export class PriceCollection extends AbstractCollection {
  protected $collection: string = "prices";
}
