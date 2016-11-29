import { Injectable }     from '@angular/core';
import { Http, Response, Jsonp, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class FsYoutubeAPIService {

  //URL TO WEB API
  private YoutubeAPIURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAXrOaIA3FiZ_Qp76WIZmU67zNV4mriEkU&channelId=UCVKdSP47XahRYJpvfA7inmg&part=snippet,id&order=date&maxResults=20';
  public youtubeData

  constructor (private jsonp: Jsonp) {
    console.log(jsonp);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  search () {
    let params = new URLSearchParams();
    params.set('callback', 'JSONP_CALLBACK');
    // TODO: Add error handling
    return this.jsonp
               .get(this.YoutubeAPIURL, { search: params })
               .map(this.extractData);
  }

}
