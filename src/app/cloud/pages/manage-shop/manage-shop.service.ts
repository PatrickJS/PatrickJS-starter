import {Injectable} from '@angular/core';
import {MeteorObservable} from "../../../../../node_modules/meteor-rxjs/dist/MeteorObservable";
import {ToastsManager} from "../../../../../node_modules/ng2-toastr/src/toast-manager";

@Injectable()
export class ManageShopService {
  viewState = {
    headerText: ""
  };
  viewData  = {};
  
  constructor(protected toast: ToastsManager) { }
  
  createCashier(data): Promise<any> {
    return new Promise((res, rej) => {
      MeteorObservable.call("user.create_cashier_by_shop_owner", data).subscribe(res => {
        this.toast.success("OK");
      }, e => {
        console.log(e);
        this.toast.error("Error");
      });
    });
  }
}
