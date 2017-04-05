import {
  Component,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {ManageUsersService} from "./manage-users.service";

@Component({
             selector : 'z-manage-permissions',
             template : `<div class="row">
    <div class="col-md-3">
        <ul class="nav">
            <li *ngFor="let role of roles" [ngClass]="{'active': role.id == role_id}">
                <a [routerLink]="['/cloud/roles', role.id]" routerLinkActive="active">{{ role.name }}</a>
            </li>
        </ul>
    </div>
<router-outlet></router-outlet>
</div>`,
  providers: [
    ManageUsersService
  ]
           })
export class RolesManagementComponent implements OnInit {
  protected roles: any;
  protected role_id: number;
  constructor(protected toast: ToastsManager,
              private route: ActivatedRoute,
              protected userService: ManageUsersService) { }

  ngOnInit() {
    this.userService.getAllRoles()
        .subscribe((data) => {
          this.roles = data;
        });
    this.route.params.subscribe((p) => {
      this.role_id = p['id'];
    });
  }

}
