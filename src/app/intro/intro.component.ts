/*
 * Angular 2 decorators and services
 */
import { Component,HostListener} from '@angular/core';

import {Router } from '@angular/router';

import {OverlayVideoImg} from '../videoImageOverlay';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'intro',
  directives:[OverlayVideoImg],
  styleUrls: [
    './intro.style.css'
  ],
  templateUrl:'./intro.template.html'
})
export class Intro {

  constructor(private router: Router){
  }

  @HostListener('click', ['$event'])
  private _scrollListener(event){
    console.log("inside the scroll listener; this: ",this);
    this.router.navigate(['/home']);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
