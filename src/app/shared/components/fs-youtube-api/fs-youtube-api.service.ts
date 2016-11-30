import { Injectable }     from '@angular/core';
import { Http, Response, Jsonp, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class FsYoutubeAPIService {

  public youtubeData;
  // URL TO WEB API
  private youtubeAPIURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAXrOaIA3FiZ_Qp76WIZmU67zNV4mriEkU&channelId=UCVKdSP47XahRYJpvfA7inmg&part=snippet,id&order=date&maxResults=20';

  constructor (private jsonp: Jsonp) {
    console.log(jsonp);
  }

  search () {
    let params = new URLSearchParams();
    params.set('callback', 'JSONP_CALLBACK');
    // TODO: Add error handling
    return this.jsonp
               .get(this.youtubeAPIURL, { search: params })
               .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

}
