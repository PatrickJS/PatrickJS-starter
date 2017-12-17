import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Title {

  public value = 'Angular 2';

  constructor(
    public http: HttpClient
  ) { }

  public getData() {
    console.log('Title#getData(): Get Data');
    return this.http.get('/assets/data.json');
  }

}
