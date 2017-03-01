import {Injectable} from '@angular/core';
import {MeteorObservable} from "meteor-rxjs";
import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";

@Injectable()
export class ManageProductsService {
  viewState: any = {
    headerText: ""
  };
  viewData: any  = {};

  constructor(protected toast: ToastsManager,
              protected router: Router) { }

  createProduct(product: any){
    return new Promise<void>((resolve, reject) => {
      MeteorObservable.call("product.create_product", product).subscribe((res) => {
          this.router.navigate(['cloud/products']);
          resolve();
      }, (err) => {
        this.toast.error(err.reason, err.error);
        return reject(err);
      });
    });

  }
}
