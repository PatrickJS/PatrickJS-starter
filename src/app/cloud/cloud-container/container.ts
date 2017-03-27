import {Component, OnInit} from '@angular/core';

@Component({
             selector: 'container',
             templateUrl: 'container.html'
           })
export class ContainerComponent implements OnInit {
  constructor() { }
  
  ngOnInit() {
    this.triigerLoadUI();
  }
  
  triigerLoadUI() {
    if (typeof OneUI != "undefined")
      OneUI.init();
  }
}