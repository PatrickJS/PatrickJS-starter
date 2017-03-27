import {AbstractModel} from "./Contract/AbstractModel";
import {PriceInterface} from "./PriceInterface";

export class Price extends AbstractModel {
  protected $collection = 'prices';
}