import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

import {Project} from './project';
import {PROJECTS} from './mock-projects';

@Injectable()
export class ProjectService {
  getProjects():Observable<Project[]>{
    return Observable.create(observer =>
      observer.next(PROJECTS));
  }

  getProject(id:number):Observable<Project>{
    return Observable.create(observer =>
      observer.next(PROJECTS[id]));
  }

}
