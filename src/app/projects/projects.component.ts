import { Component } from '@angular/core';

import {Router} from '@angular/router';

import {OverlayImg} from '../imageOverlay';

import {Project} from './helpers/project';
import {ProjectService} from './helpers/project.service';

@Component({
  selector: 'projects',
  providers:[ProjectService],
  directives:[OverlayImg],
  styleUrls: [ './projects.style.css' ],
  templateUrl: './projects.template.html',
})
export class Projects {

  projects:Project[];


  constructor(private projectService : ProjectService,private router: Router){
  }


  ngOnInit() {

    this.projectService.getProjects().subscribe(projects => this.projects = projects);
  }

  selectProject(project){
    this.router.navigate(['/project',project.id]);
  }

}
