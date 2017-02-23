import {Component, OnInit} from '@angular/core';

@Component({
             selector: 'z-dashboard',
             templateUrl: 'dashboard.html'
           })
export class DashboardComponent implements OnInit {
  constructor() { }
  
  ngOnInit() {
    this.initPageJs();
  }
  
  initPageJs() {
    jQuery(() => {
      // Init page helpers (Slick Slider plugin)
      if (typeof OneUI != "undefined")
        OneUI.initHelpers('slick');
    });
  }
}