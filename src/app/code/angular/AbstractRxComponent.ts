import {Subscription} from "rxjs";
import * as _ from "lodash";

export abstract class AbstractRxComponent {
  protected _subscription: {
    [propName: string]: Subscription;
  } = {};
  
  ngOnDestroy(): void {
    _.forEach(this._subscription, (sub: Subscription) => sub.unsubscribe());
  }
}
