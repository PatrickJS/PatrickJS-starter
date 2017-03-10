import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {LicenseCollection} from '../../../services/ddp/collections/licenses';
import {AngularMeteorDataTableComponent} from "../../../../code/angular/components/angular-meteor-datatable";
import * as _ from "lodash";
import {Router} from "@angular/router";
import {ManageLicensesService} from "./manage-licenses.service";

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
      {data: "has_product", title: "Products"},
      {data: "shop_owner_username", title: "Shop owner"},
      {data: "status", title: "Status"}
    ],
    columnDefs: [
      {className: "", "targets": [0]},
      {className: "", orderable: false, "targets": [1]},
      {
        className: "", orderable: false,
        "targets": [2],
        render: function (data, type, row) {
          let _html = "";
          if (_.isArray(data)) {
            _.forEach(data, product => {
              _html += `<span class="label label-warning">${product['product_id']}</span>&nbsp;`;
            });
          }
          return _html;
        }
      },
      {
        targets: [3], render: function (data) {
        return data ? data : "";
      },
      },
      {
        className: "text-center",
        orderable: false, targets: [4],
        render: function (data) {
          if (data == 1)
            return `<span class="label label-success">Activated</span>`;
          else if (data == 0)
            return `<span class="label label-danger">Deactivated</span>`;
          else if (data == 2) {
            return `<span class="label label-default">Fresh</span>`;
          }
        }
      }
    ],
    bFilter: false,
  };
  
  constructor(protected manageLicensesService: ManageLicensesService,
              protected licensesCollection: LicenseCollection,
              protected router: Router) {
    this.manageLicensesService.viewState.headerText = "Grid";
  }
  
  ngOnInit(): void {
    this.angularMeteorDtTable.getCallBackObservable().subscribe((data) => {
      if (data.event == "clickEdit") {
        this.router.navigateByUrl('cloud/licenses/' + data.data);
      }
      if (data.event == 'newRecord') {
        this.router.navigate(['/cloud/licenses/add']);
      }
      if (data.event == "removeRecord") {
        this.manageLicensesService.delete(data.data);
      }
    });
  }
  
}
