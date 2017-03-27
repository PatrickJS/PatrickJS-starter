import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {ManageUsersService} from "./manage-users.service";
import {UserCollection} from "../../../services/ddp/collections/users";
import {AngularMeteorDataTableComponent} from "../../../../code/angular/components/angular-meteor-datatable";

@Component({
             selector   : 'manage-users-grid',
             templateUrl: 'grid.html'
           })
export class ManageUsersGridComponent implements OnInit {
  @ViewChild(AngularMeteorDataTableComponent) protected angularMeteorDtTable: AngularMeteorDataTableComponent;

  protected tableConfig = {
    actionsColumn: {edit: true, remove: true},
    columns      : [
      {data: "_id", title: "Name"},
      {data: "emails", title: "Emails"},
    ],
    columnDefs   : [
      {className: "hidden-xs", "targets": [0]},
      {className: "text-center", orderable: false, "targets": [1]},
    ],
    bFilter      : false,
  };

  constructor(protected manageUserService: ManageUsersService,
              protected usersCollection: UserCollection) {
    this.manageUserService.viewState.headerText = "Grid";
  }

  ngOnInit(): void {
    this.angularMeteorDtTable.getCallBackObservable().subscribe((data) => {console.log(data);});
  }
}
