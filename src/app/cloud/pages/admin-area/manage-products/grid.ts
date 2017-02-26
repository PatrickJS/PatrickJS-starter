import {
  Component,
  OnInit
} from '@angular/core';
import {ManageProductsService} from "./manage-products.service";
import {ProductCollection} from "../../../services/ddp/collections/products";

@Component({
             selector   : 'manage-products-grid',
             templateUrl: 'grid.html'
           })
export class ManageProductsGridComponent implements OnInit {
  protected _dtTable;
  protected products: any;
  
  constructor(protected manageProductService: ManageProductsService,
              protected productsCollection: ProductCollection) {
    this.manageProductService.viewState.headerText = "Grid";
  }
  
  ngOnInit() {
    this.subscribeProducts();
    setTimeout(() => {
      this.initDataTable();
    }, 1000);
  }
  
  subscribeProducts() {
    this.productsCollection
        .getCollectionObservable()
        .subscribe(collection => {
          this.products = collection.find().share();
        });
  }
  
  initDataTable() {
    let table = jQuery('.js-dataTable-simple');
    if (table) {
      this._dtTable = table.dataTable({
                                        pageLength: 10,
                                        lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]]
                                      });
    }
  }
}
