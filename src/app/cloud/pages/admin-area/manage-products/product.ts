import {
  Component,
  OnInit
} from '@angular/core';
import {ManageProductsService} from "./manage-products.service";

@Component({
             selector : 'z-product',
             templateUrl : 'product.html',
             providers: [
               ManageProductsService
             ]
           })
export class ProductComponent implements OnInit {
  constructor(protected manageProductService: ManageProductsService) { }
  
  ngOnInit() { }
  
}
