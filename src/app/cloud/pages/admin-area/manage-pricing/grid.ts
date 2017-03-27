import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {ManagePricingService} from "./manage-pricing.service";
import {PricingCollection} from "../../../services/ddp/collections/pricing";
import {AngularMeteorDataTableComponent} from "../../../../code/angular/components/angular-meteor-datatable";

@Component({
             selector   : 'manage-pricing-grid',
             templateUrl: 'grid.html'
           })
export class ManagePricingGridComponent implements OnInit {
  @ViewChild(AngularMeteorDataTableComponent) protected angularMeteorDtTable: AngularMeteorDataTableComponent;
  
  protected tableConfig = {
    actionsColumn: {edit: true, remove: true},
    columns      : [
      {data: "_id", title: "Pricing ID"},
      {data: "name", title: "Pricing Name"},
    ],
    columnDefs   : [
      {className: "hidden-xs", "targets": [0]},
      {className: "text-center", orderable: false, "targets": [1]},
    ],
    bFilter      : false,
  };
  
  constructor(protected managePricingService: ManagePricingService,
              protected pricingCollection: PricingCollection) {
    this.managePricingService.viewState.headerText = "Grid";
  }
  
  ngOnInit(): void {
    this.angularMeteorDtTable.getCallBackObservable().subscribe((data) => {console.log(data);});
  }
}
