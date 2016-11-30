import { Injectable }     from '@angular/core';
import { Http, Response, Jsonp, URLSearchParams, Headers, RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class FsTwitterAPIService {

  public youtubeData;
  // URL TO WEB API
  private twitterAPIURL = 'https://syndication.twitter.com/timeline/profile?dnt=false&screen_name=serenityFront&suppress_response_codes=true&lang=en&callback=JSONP_CALLBACK';
  private headers: Headers;
  private options: RequestOptions;

  constructor (private jsonp: Jsonp, private http: Http) {

  }

  search () {
    // TODO: Add error handling
    return this.jsonp.get(this.twitterAPIURL, this.options)
               .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

}
