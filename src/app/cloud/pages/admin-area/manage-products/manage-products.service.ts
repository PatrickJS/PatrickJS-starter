import {Injectable} from '@angular/core';
import {MeteorObservable, MongoObservable} from "meteor-rxjs";
import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";
import {ProductCollection} from "../../../services/ddp/collections/products";

@Injectable()
export class ManageProductsService {
  viewState: any = {
    headerText: ""
  };
  viewData: any  = {};

  constructor(protected toast: ToastsManager,
              protected router: Router,
              protected productCollection: ProductCollection) { }

  createProduct(product: any){
    return new Promise<void>((resolve, reject) => {
      MeteorObservable.call("product.create_product", product).subscribe((res) => {
          this.router.navigate(['cloud/products']);
          this.toast.success("Create Product Successful");
          resolve();
      }, (err) => {
        this.toast.error(err.reason, err.error);
        return reject(err);
      });
    });
  }

  editProduct(product: any){
    return new Promise<void>((resolve, reject) => {
      MeteorObservable.call("product.edit_product", product).subscribe((res) => {
        this.router.navigate(['cloud/products/' + product._id]);
        this.toast.success("Edit Product Successfully");
        resolve();
      }, (err) => {
        this.toast.error(err.reason, err.error);
        return reject(err);
      });
    });
  }

  createVersion(data: any){
    return new Promise<void>((resolve, reject) => {
      MeteorObservable.call("version.create_product_version", data).subscribe((res) => {
        this.router.navigate(['cloud/products/' + data._id]);
        this.toast.success("Create Version Successfully");
        resolve();
      }, (err) => {
        this.toast.error(err.reason, err.error);
        return reject(err);
      });
    });
  }

  removeProduct(data: any){
    return new Promise<void>((resolve, reject) => {
      MeteorObservable.call("product.remove_product", data).subscribe((res) => {
        this.toast.success("Remove Product Successfully");
        resolve();
      }, (err) => {
        this.toast.error(err.reason, err.error);
        return reject(err);
      });
    });
  }
}
