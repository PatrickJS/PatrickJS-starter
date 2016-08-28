
import { Component, Input,HostListener } from '@angular/core';
import {DomSanitizationService, SafeResourceUrl} from '@angular/platform-browser';

import {OverlayImg} from '../imageOverlay';

@Component({
  selector: 'overlay-video-img',
  directives:[OverlayImg],
  styles:[`
   :host{
      display: block;
    }
    
    overlay-img,.video-iframe,.video-div{
      width: 100%;
      height: 100%;
    }
  `],
  template:`
    <overlay-img [source]="imgsource" *ngIf="!showVideo">
      <overlay-title>
        <ng-content select="overlay-title"></ng-content>
      </overlay-title>
      <overlay-description>
        <ng-content select="overlay-description"></ng-content>
      </overlay-description>
    </overlay-img>
       
       <div class="video-div" *ngIf="showVideo">
        
          <iframe 
          [src]=videoUrl
          class="video-iframe"
          width="640" height="360" 
          frameborder="0" 
          allowfullscreen>
          </iframe>
                
        </div>
       
       
    `
})
export class OverlayVideoImg {

  @Input() imgsource : string;
  @Input() videosource : string;

  videoUrl:SafeResourceUrl;

  showVideo:boolean = false;



  constructor(private sanitationService:DomSanitizationService){}

  ngOnInit(){
    this.videoUrl = this.sanitationService.bypassSecurityTrustResourceUrl(this.videosource);
  }


  @HostListener('click') onClick() {
    this.showVideo = true;
    console.log(this.videoUrl);
    console.log(this.videosource);
  }



}
