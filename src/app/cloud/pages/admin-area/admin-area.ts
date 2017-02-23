import {Component, OnInit} from '@angular/core';

@Component({
             selector: 'z-admin-area',
             template: `<ui-view></ui-view>`
           })
export class AdminAreaComponent implements OnInit {
  constructor() { }
  
  ngOnInit() { }
  
}