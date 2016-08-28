import { Component} from '@angular/core';

import {Router} from '@angular/router';
import {NavigationStart} from '@angular/router';


@Component({

  selector: 'banner',
  styleUrls: [ './banner.style.css' ],
  templateUrl: './banner.template.html'
})
export class Banner {

  static bannerImgArr:string[] = [
    "./assets/img/moon_background.jpeg",
    "./assets/img/nightsky.jpg",
    "./assets/img/videos_img.jpg",
    "./assets/img/night time pastry house.jpg",
  ];

  bannerImgUrl:string = Banner.getRandomBannerImgUrl();


  constructor(private router: Router){

  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationStart){
        this.bannerImgUrl = Banner.getRandomBannerImgUrl();
      }
    });
  }


  static getRandomBannerImgUrl():string{
    return this.bannerImgArr[Math.floor(Math.random() * this.bannerImgArr.length)];
  }



}
