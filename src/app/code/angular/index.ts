import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AngularMeteorDataTableComponent} from "./components/angular-meteor-datatable";

@NgModule({
            imports     : [CommonModule,
                           FormsModule],
            exports     : [AngularMeteorDataTableComponent],
            declarations: [AngularMeteorDataTableComponent],
            providers   : [],
          })
export class AngularHelperModule {
}
