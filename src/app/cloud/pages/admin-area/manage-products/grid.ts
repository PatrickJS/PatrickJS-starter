import {
  Component,
  OnInit
} from '@angular/core';
import {ManageProductsService} from "./manage-products.service";
import {ProductCollection} from "../../../services/ddp/collections/products";
import {AbstractRxComponent} from "../../../../code/angular/AbstractRxComponent";
import {MeteorDataTable} from '../../../../code/meteor-datatable/MeteorDataTable';

@Component({
             selector   : 'manage-products-grid',
             templateUrl: 'grid.html'
           })
export class ManageProductsGridComponent extends AbstractRxComponent implements OnInit {
  protected _time = 0;
  
  constructor(protected manageProductService: ManageProductsService,
              protected productsCollection: ProductCollection) {
    super();
    this.manageProductService.viewState.headerText = "Grid";
  }
  
  ngOnInit(): void {
    this.initDataTable();
  }
  
  initDataTable() {
    this._subscription['dataTable'] = new MeteorDataTable(".js-dataTable-simple", {
      columns   : [
        {data: "name", title: "Name"},
        {data: "versions", title: "Versions"},
      ],
      columnDefs: [
        // {className: "hidden-xs", "targets": [0]},
        // {className: "text-center", "targets": [1]},
      ],
      bFilter   : false,
      // "scrollX": true,
      "paging": true,
      scrollCollapse: true,
      responsive: true,
    }, this.productsCollection.getCollectionObservable()).meteorDataTableSubscription;
  }
}
