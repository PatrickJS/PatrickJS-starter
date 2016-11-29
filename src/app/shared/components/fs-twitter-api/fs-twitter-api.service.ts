import { Injectable }     from '@angular/core';
import { Http, Response, Jsonp, URLSearchParams, Headers, RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class FsTwitterAPIService {

  //URL TO WEB API
  private TwitterAPIURL = 'https://syndication.twitter.com/timeline/profile?dnt=false&screen_name=serenityFront&suppress_response_codes=true&lang=en&callback=JSONP_CALLBACK';
  public youtubeData;
  private headers: Headers;
  private options : RequestOptions;

  constructor (private jsonp: Jsonp, private http: Http) {

  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  search () {
    // TODO: Add error handling
    return this.jsonp.get(this.TwitterAPIURL, this.options)
               .map(this.extractData);
  }

}
