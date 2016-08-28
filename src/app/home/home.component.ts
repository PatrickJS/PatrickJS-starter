import { Component } from '@angular/core';
import { OverlayVideoImg } from '../videoImageOverlay';



@Component({
  selector: 'home',  // <home></home>
  directives:[OverlayVideoImg],
  styleUrls: [ './home.style.css' ],
  templateUrl: './home.template.html'
})
export class Home {

  somebool = false;

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.somebool = true;
  }

}
