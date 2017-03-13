import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {AngularMeteorDataTableComponent} from "../../../../code/angular/components/angular-meteor-datatable";
import * as _ from "lodash";
import {Router} from "@angular/router";
import {PriceCollection} from "../../../services/ddp/collections/prices";
import {ManagePricingsService} from "./manage-pricings.service";

@Component({
             selector   : 'manage-pricings-grid',
             templateUrl: 'grid.html'
           })
export class ManagePricingsGridComponent implements OnInit {
  @ViewChild(AngularMeteorDataTableComponent) protected angularMeteorDtTable: AngularMeteorDataTableComponent;
  
  protected tableConfig = {
    actionsColumn: {edit: true, remove: true},
    columns      : [
      {data: "code", title: "Pricing Code"},
      {data: "name", title: "Pricing Name"},
      {data: "display_name", title: "Display Name"},
      {data: "type", title: "Type"},
      {data: "cost", title: "Cost"},
      {data: "visibility", title: "Visibility"},

    ],
    columnDefs   : [
      {className: "hidden-xs", targets: [1]},
      {
        className: "text-center",
        orderable: false, targets: [3],
        render: function (data) {
          if (data == 1)
            return `<span class="label label-success">Monthly</span>`;
          else if (data == 2)
            return `<span class="label label-danger">Yearly</span>`;
          else if (data == 3) {
            return `<span class="label label-default">Lifetime</span>`;
          }
        }
      },
      {
        className: "text-center",
        orderable: false, targets: [5],
        render: function (data) {
          if (data == 0)
            return `<span class="label label-success">Hidden</span>`;
          else if (data == 1)
            return `<span class="label label-danger">Show to customer</span>`;
        }
      }
    ],
    bFilter      : false,
  };
  
  constructor(protected managePricingService: ManagePricingsService,
              protected pricingsCollection: PriceCollection,
              protected router: Router) {
    this.managePricingService.viewState.headerText = "Grid";
  }
  
  ngOnInit(): void {
    this.angularMeteorDtTable.getCallBackObservable().subscribe((data) => {
      if (data.event == "clickEdit") {
        this.router.navigateByUrl('cloud/pricings/edit/' + data.data);
      }
      if (data.event == 'removeRecord') {
        this.managePricingService.removePricing(data.data);
      }
      if (data.event == 'newRecord') {
        this.router.navigate(['/cloud/pricings/create']);
      }
    });
  }
}
