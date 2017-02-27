import {
  Component,
  OnInit
} from '@angular/core';
import {ManageLicensesService} from "./manage-licenses/manage-licenses.service";

@Component({
             selector: 'z-manage-licenses',
             template: `
 <!-- Page Header -->
                <div class="content bg-gray-lighter">
                    <div class="row items-push">
                        <div class="col-sm-7">
                            <h1 class="page-heading">
                                Manage License <small>Create, update or remove licenses...</small>
                            </h1>
                        </div>
                        <div class="col-sm-5 text-right hidden-xs">
                            <ol class="breadcrumb push-10-t">
                                <li>Licenses</li>
                                <li><a class="link-effect">{{manageLicensesService.viewState.headerText}}</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
<!-- END Page Header -->
<router-outlet></router-outlet>`,
             providers: [
               ManageLicensesService
             ]
           })
export class ManageLicensesComponent implements OnInit {
  constructor(protected manageLicensesService: ManageLicensesService) { }
  
  ngOnInit() { }
  
}
