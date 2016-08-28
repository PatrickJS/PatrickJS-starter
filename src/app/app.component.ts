/*
 * Angular 2 decorators and services
 */
import { Component, HostListener} from '@angular/core';
import {Router, NavigationStart, NavigationEnd } from '@angular/router';


import {Navbar} from './navbar';
import {About} from './about';
import {Banner} from './Banner';
import {Footer} from './footer';
import {Home} from './home';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  directives:[Navbar,About,Banner,Footer,Home],
  styleUrls: [
    './app.style.css'
  ],
  templateUrl:'./app.template.html'
})
export class App {

  isMenuVisible:boolean = false;
  introPage:boolean = true;
  imgSrc = 'assets/img/night time pastry house.jpg';
  videoSrc = 'https://player.vimeo.com/video/179535585?color=ffffff&title=0&byline=0&portrait=0&badge=0';

  constructor(private router: Router){
  }

  ngOnInit(){

 

    this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        console.log(`the url is ${this.router} `,this.router);
        if(this.router.url === "/"){

          this.introPage = true;
          console.log('intro');
        }
        else{
          this.introPage = false;
          console.log('not intro');
        }
      }
    });
  }

  toggleMenu(){
    this.isMenuVisible = !this.isMenuVisible;
  }
  //
  // @HostListener('scroll', ['$event.target'])
  // onClick(btn) {
  //   console.log("button");
  // }


}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
