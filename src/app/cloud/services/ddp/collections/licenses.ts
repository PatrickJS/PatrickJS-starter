import {Injectable} from '@angular/core';
import {AbstractCollection} from "../../../../code/meteor/AbstractCollection";

@Injectable()
export class LicenseCollection extends AbstractCollection {
  protected $collection: string = "licenses";
}
