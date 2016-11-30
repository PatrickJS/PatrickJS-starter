import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class FsUsersService {

  // URL TO WEB API
  private mockURL:string = 'assets/mock-data/mockusers.json';

  constructor (private http: Http) {
    console.log(http);
  }

  search () {
    // TODO: Add error handling
    return this.http.get(this.mockURL)
               .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

}
