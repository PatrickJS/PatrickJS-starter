import {Component, OnInit} from '@angular/core';

@Component({
             selector: 'cloud-container',
             templateUrl: 'cloud-container.html'
           })
export class CloudContainerComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    this.triigerLoadUI();
    this.initPageJs();
  }

  triigerLoadUI() {
    OneUI.init();
  }

  initPageJs() {
    jQuery(() => {
      // Init page helpers (Slick Slider plugin)
      OneUI.initHelpers('slick');
    });
  }
}