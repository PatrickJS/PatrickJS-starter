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
    let table = jQuery('.js-dataTable-simple');
    if (table) {
      table.DataTable({
                        columnDefs: [{orderable: false, targets: [4]}],
                        pageLength: 10,
                        lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]],
                        searching: false,
                        oLanguage: {
                          sLengthMenu: ""
                        },
                        dom: "<'row'<'col-sm-12'tr>>" +
                             "<'row'<'col-sm-6'i><'col-sm-6'p>>"
                      });
    }
  }
  
}