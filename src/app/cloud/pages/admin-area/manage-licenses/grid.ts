import {Component, OnInit, ViewChild} from '@angular/core';
import {ManageLicensesService} from "./manage-licenses.service";
import { LicenseCollection } from '../../../services/ddp/collections/licenses';
import {AngularMeteorDataTableComponent} from "../../../../code/angular/components/angular-meteor-datatable";

@Component({
             selector: 'manage-licenses-grid',
             templateUrl: 'grid.html'
           })
export class ManageLicensesGridComponent implements OnInit {
  @ViewChild(AngularMeteorDataTableComponent) protected angularMeteorDtTable: AngularMeteorDataTableComponent;

  protected tableConfig = {
    actionsColumn: {edit: true, remove: true},
    columns: [
      {data: "_id", title: "License ID"},
      {data: "key", title: "License Key"},
    ],
    columnDefs   : [
      {className: "hidden-xs", "targets": [0]},
      {className: "text-center", orderable: false, "targets": [1]},
    ],
    bFilter      : false,
  };

  constructor(protected manageLicensesService: ManageLicensesService,
              protected licensesCollection: LicenseCollection) { 
      this.manageLicensesService.viewState.headerText = "Grid";
  }
  
  ngOnInit(): void{
    this.angularMeteorDtTable.getCallBackObservable().subscribe((data) => (console.log(data)));
  }
  
}
