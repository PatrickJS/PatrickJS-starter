
import { Component, Input,HostListener } from '@angular/core';


@Component({
  selector: 'overlay-img',
  styles:[` 
 
     :host{
        position: relative;
        display: block;
        overflow: hidden;
     }
 
 
    .image-img{
        width: 100%;
        height: 100%;
        object-position: 50% 50%;
        object-fit: cover;
    }
    
    .overlay{
      width: 100%;
      height: 100%;
      color: white;
      text-align: center;
      margin: auto;
      position: absolute;
      top: 0;left: 0; bottom:0;right: 0;
      display: flex;
      flex-flow: column;
      justify-content: center;
      background: rgba(0,51,102,0);
      transition: all 0.5s;
      opacity: 0;
      transform: scale3d(1.1,1.1,1);
      overflow: hidden;
    }
    
    .hovered{
      background: rgba(0,51,102,0.6); 
      opacity: 1;
      transform: scale3d(1,1,1);
    }
    
    .overlay-title{
      font-size: 3em;
      margin-bottom: 10px;
    }
    .overlay-description{
      font-size: 1em;
    }
    
    
  `],
  template:`

    <img class="image-img" [src]="source">
    <div class="overlay" [ngClass]="{hovered:isHovered}">
      <div class="overlay-title">
        <ng-content select="overlay-title" ></ng-content>
      </div>
      <div class="overlay-description">
        <ng-content select="overlay-description"></ng-content>
      </div>
    </div>    
    `
})
export class OverlayImg {

  @Input() source : string;
  isHovered:boolean = false;


  constructor(){
  }


  ngOnInit(){
    console.log('slkdfj');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.isHovered = true;
    console.log(this.isHovered);
    return false;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHovered = false;
    console.log(this.isHovered);
    return false;
  }


}
