import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {ManageProductsService} from "./manage-products.service";
import {ProductCollection} from "../../../services/ddp/collections/products";
import {AngularMeteorDataTableComponent} from "../../../../code/angular/components/angular-meteor-datatable";
import * as _ from "lodash";

@Component({
             selector   : 'manage-products-grid',
             templateUrl: 'grid.html'
           })
export class ManageProductsGridComponent implements OnInit {
  @ViewChild(AngularMeteorDataTableComponent) protected angularMeteorDtTable: AngularMeteorDataTableComponent;
  
  protected tableConfig = {
    actionsColumn: {edit: true, remove: true},
    columns      : [
      {data: "name", title: "Name"},
      {data: "versions", title: "Versions"},
    ],
    columnDefs   : [
      {className: "hidden-xs", targets: [0]},
      {
        className: "text-center",
        orderable: false,
        render   : function (data, type, row) {
          let _html = "";
          if (_.isObject(data)) {
            _.forEach(data, version => {
              _html += `<span class="label label-info">${version['version']}</span>&nbsp;`;
            });
          }
          return _html;
        },
        targets  : [1],
      },
    ],
    bFilter      : false,
  };
  
  constructor(protected manageProductService: ManageProductsService,
              protected productsCollection: ProductCollection) {
    this.manageProductService.viewState.headerText = "Grid";
  }
  
  ngOnInit(): void {
    this.angularMeteorDtTable.getCallBackObservable().subscribe((data) => {console.log(data);});
  }
}
