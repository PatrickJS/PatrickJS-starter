import {
  Component,
  OnInit
} from '@angular/core';
import {ManageShopService} from "../manage-shop.service";

@Component({
             selector   : 'create-cashier',
             templateUrl: 'create-cashier.html'
           })
export class CreateCashierComponent implements OnInit {
  constructor(protected manageShopService: ManageShopService) { }
  
  ngOnInit() {
    this.manageShopService.viewState.headerText = "Create cashier";
  }
  
}
