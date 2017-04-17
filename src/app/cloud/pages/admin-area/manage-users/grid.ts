import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {ManageUsersService} from "./manage-users.service";
import {UserCollection} from "../../../services/ddp/collections/users";
import {AngularMeteorDataTableComponent} from "../../../../code/angular/components/angular-meteor-datatable";
import * as _ from "lodash";
import {Router} from "@angular/router";

@Component({
             selector   : 'manage-users-grid',
             templateUrl: 'grid.html',
           })
export class ManageUsersGridComponent implements OnInit {
  @ViewChild(AngularMeteorDataTableComponent) protected angularMeteorDtTable: AngularMeteorDataTableComponent;
  
  protected tableConfig = {
    actionsColumn: {edit: true, remove: true},
    columns      : [
      {data: "username", title: "Name"},
      {data: "emails", title: "Emails"},
      {data: "emails", title: "Verified"},
      {data: "roles", title: "Roles"},
      {data: "profile", title: "Disabled"},
    ],
    columnDefs   : [
      {className: "hidden-xs", "targets": [0]},
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
        render   : function (roles, type, row) {
          if (_.isObject(roles) && roles.hasOwnProperty("cloud_group")) {
            return roles['cloud_group'];
          } else
            return "";
        }
      },
      {
        className: "col-status",
        targets  : [4],
        render   : function (data) {
          if (data && data.is_disabled && data.is_disabled == 1) {
            return `<span class="label label-danger">Yes</span>&nbsp;`;
          } else
            return `<span class="label label-info">No</span>&nbsp;`;
        }
      }
    ],
    bFilter      : false,
  };
  
  constructor(protected manageUserService: ManageUsersService,
              protected usersCollection: UserCollection,
              protected router: Router) {
    this.manageUserService.viewState.headerText = "Grid";
  }
  
  ngOnInit(): void {
    this.angularMeteorDtTable.getCallBackObservable().subscribe((data) => {
      if (data.event == 'newRecord') {
        this.router.navigate(['/cloud/users/create']);
      }
      if (data.event == 'removeRecord') {
        this.manageUserService.removeUser(data.data);
      }
      if (data.event == "clickEdit") {
        this.router.navigate(['/cloud/users/edit/' + data.data]);
      }
    });
  }
}
