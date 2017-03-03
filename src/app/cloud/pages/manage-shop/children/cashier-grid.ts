import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {UserCollection} from "../../../services/ddp/collections/users";
import {ManageShopService} from "../manage-shop.service";
import * as _ from "lodash";
import {AuthService} from "../../../services/ddp/auth.service";
import {AngularMeteorDataTableComponent} from "../../../../code/angular/components/angular-meteor-datatable";
import {Router} from "../../../../../../node_modules/@angular/router/src/router";

@Component({
             selector   : 'cashier-grid',
             templateUrl: 'cashier-grid.html'
           })
export class CashierGridComponent implements OnInit {
  @ViewChild(AngularMeteorDataTableComponent) protected angularMeteorDtTable: AngularMeteorDataTableComponent;
  protected collectionSelector = {};
  protected tableConfig        = {
    actionsColumn: {edit: true, remove: true},
    columns      : [
      {data: "username", title: "Name"},
      {data: "emails", title: "Emails"},
      {data: "emails", title: "Verified"},
      {data: "status", title: "Status"},
    ],
    columnDefs   : [
      {className: "", targets: [0]},
      {
        orderable: false,
        targets  : [1],
        render   : function (data, type, row) {
          if (_.isArray(data)) {
            return data[0]['address'];
          } else
            return "";
        }
      },
      {
        orderable: false,
        targets  : [2],
        render   : function (data, type, row) {
          if (_.isArray(data)) {
            return data[0]['verified'];
          } else
            return "";
        }
      },
      {
        orderable: false,
        targets  : [3],
        render   : function (status, type, row) {
          return status == 1 ? "Enabled" : "Disabled";
        }
      },
    ],
    bFilter      : false,
  };
  
  constructor(protected userCollection: UserCollection,
              protected manageShop: ManageShopService,
              protected authService: AuthService,
              protected router: Router) { }
  
  ngOnInit() {
    this.manageShop.viewState.headerText = "Cashiers";
    this.collectionSelector              = {_id: {$ne: this.authService.getCurrentUser()['_id']}};
    
    this.angularMeteorDtTable.getCallBackObservable().subscribe((data: any) => {
      if (data.event == 'newRecord') {
        this.router.navigate(['/cloud/manage-shop/create-cashier']);
      }
    });
  }
  
}
