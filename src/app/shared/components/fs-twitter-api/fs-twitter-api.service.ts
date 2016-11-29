import { Injectable }     from '@angular/core';
import { Http, Response, Jsonp, URLSearchParams, Headers, RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class FsTwitterAPIService {

  //URL TO WEB API
  private TwitterAPIURL = 'https://api.twitter.com/1.1/search/tweets.json?q=josh2code&callback=JSONP_CALLBACK';
  public youtubeData;
  private headers: Headers;
  private options : RequestOptions;

  constructor (private jsonp: Jsonp, private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer HHYzW9GbUbN6GNANoTPvaCRLliSntBHEfheGZMRIoIAhhYVnh2'
    });

    this.options = new RequestOptions({
      headers: this.headers
    });

    // var req = new Request(options);
    // console.log('------------------------', RequestMethod[req.method]);
    // console.log(this.headers);
    // this.headers.append('Authorization', 'Bearer HHYzW9GbUbN6GNANoTPvaCRLliSntBHEfheGZMRIoIAhhYVnh2');
    // console.log(this.headers);
    // this.headers.append();
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  search () {
    console.log('this', this)
    // let params = new URLSearchParams();
    // params.set('callback', 'JSONP_CALLBACK');
    // TODO: Add error handling
    return this.jsonp.get(this.TwitterAPIURL, this.options)
               .map(this.extractData);
  }

}