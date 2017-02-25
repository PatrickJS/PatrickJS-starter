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
  
  constructor(protected manageProductService: ManageProductsService,
              protected productsCollection: ProductCollection) {
    this.manageProductService.viewState.headerText = "Grid";
  }
  
  ngOnInit() {
    setTimeout(() => {
      this.initDataTable();
    }, 1000);
  }
  
  initDataTable() {
    let table = jQuery('.js-dataTable-simple');
    if (table) {
      this._dtTable = table.DataTable({
                                        columnDefs: [{orderable: false, targets: [4]}],
                                        pageLength: 10,
                                        lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]],
                                        searching : false,
                                        oLanguage : {
                                          sLengthMenu: ""
                                        },
                                        dom       : "<'row'<'col-sm-12'tr>>" +
                                                    "<'row'<'col-sm-6'i><'col-sm-6'p>>"
                                      });
    }
  }
}
