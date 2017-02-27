import {Injectable} from '@angular/core';
import {AbstractCollection} from "../../../../code/meteor/AbstractCollection";

@Injectable()
export class PricingCollection extends AbstractCollection {
  protected $collection: string = "prices";
}
