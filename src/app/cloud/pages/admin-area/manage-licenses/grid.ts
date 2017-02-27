import {Component, OnInit} from '@angular/core';
import {ManageLicensesService} from "./manage-licenses.service";

@Component({
             selector: 'manage-licenses-grid',
             templateUrl: 'grid.html'
           })
export class ManageLicensesGridComponent implements OnInit {
  constructor(protected manageLicensesService: ManageLicensesService) { }
  
  ngOnInit() {
    this.manageLicensesService.viewState.headerText = "Grid";
    this.initDataTable();
  }
  
  initDataTable() {
    let table = jQuery('.product-datatable');
    if (table) {
      table.dataTable({
                        columnDefs: [ { orderable: false, targets: [ 4 ] } ],
                        pageLength: 10,
                        lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]]
                      });
    }
  }
  
}
