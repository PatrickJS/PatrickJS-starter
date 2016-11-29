import { Injectable }     from '@angular/core';
import { Http, Response, Jsonp, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class FsUsersService {

  //URL TO WEB API
  private mockURL = 'assets/mock-data/mockusers.json';
  public mockData

  constructor (private http: Http) {
    console.log(http);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  search () {
    // TODO: Add error handling
    return this.http.get(this.mockURL)
               .map(this.extractData);
  }

}
