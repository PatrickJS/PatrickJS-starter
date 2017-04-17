import {AbstractModel} from "./Contract/AbstractModel";

export class Price extends AbstractModel {
  protected $collection = 'prices';

  static TYPE_MONTHLY   = 1;
  static TYPE_YEARLY   = 2;
  static TYPE_LIFETIME = 3;

  static VISIBILITY_HIDDEN = 0;
  static VISIBILITY_SHOW = 1;
}
