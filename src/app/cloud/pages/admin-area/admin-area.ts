import {
  Component,
  OnInit
} from '@angular/core';

@Component({
             selector: 'z-admin-area',
             template: `<router-outlet></router-outlet>`
           })
export class AdminAreaComponent implements OnInit {
  constructor() { }
  
  ngOnInit() { }
  
}
