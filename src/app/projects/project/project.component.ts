import { Component } from '@angular/core';

import {ActivatedRoute,Router} from '@angular/router';
import {Subscription} from 'rxjs';

import{ProjectService} from '../helpers/project.service';
import {OverlayVideoImg} from '../../videoImageOverlay';

import { Zoom } from 'zoom.ts/lib/Zoom';
import zoomcss = require( 'zoom.ts/dist/zoom.css');

@Component({
  selector:'project',
  providers:[ProjectService,Zoom],
  directives:[OverlayVideoImg],
  templateUrl:'./project.template.html',

  styleUrls:['./project.style.css',zoomcss]
})

export class Project {

  private sub: Subscription;
  private project;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: ProjectService,
              private zoom : Zoom){}

  ngOnInit() {
   this.zoom.listen();

    this.sub = this.route.params.subscribe(params => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.service.getProject(id).subscribe(project =>{
        this.project= project;
        this.project.gallery.map(image => image.isclicked=false);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  //
  // selectImage(image){
  //
  //   this.project.gallery.forEach(image => image.isclicked = false);
  //   image.isclicked=true;
  // }
}
