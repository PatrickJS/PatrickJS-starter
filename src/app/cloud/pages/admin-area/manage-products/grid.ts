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
  protected tableConfig = {
    actionsColumn: {edit: true, remove: true},
    columns      : [
      {data: "name", title: "Name"},
      {data: "versions", title: "Versions"},
    ],
    columnDefs   : [
      {className: "hidden-xs", "targets": [0]},
      {className: "text-center", "targets": [1]},
    ],
    bFilter      : false,
  };
  
  constructor(protected manageProductService: ManageProductsService,
              protected productsCollection: ProductCollection) {
    this.manageProductService.viewState.headerText = "Grid";
  }
  
  ngOnInit(): void {
  }
  
}
