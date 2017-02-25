import {
  Component,
  OnInit
} from '@angular/core';
import {ManageProductsService} from "./manage-products.service";

@Component({
             selector   : 'manage-products-grid',
             templateUrl: 'grid.html'
           })
export class ManageProductsGridComponent implements OnInit {
  constructor(protected manageProductService: ManageProductsService) {
    this.manageProductService.viewState.headerText = "Grid";
  }
  
  ngOnInit() { }
  
}
