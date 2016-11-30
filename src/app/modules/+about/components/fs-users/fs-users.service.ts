import { Injectable }     from '@angular/core';
import { Http, Response, Jsonp, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class FsUsersService {

  // URL TO WEB API
  private mockURL = 'assets/mock-data/mockusers.json';

  constructor (private http: Http) {
    console.log(http);
  }

  search (): Observable<any> {
    // TODO: Add error handling
    return this.http.get(this.mockURL)
               .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

}
