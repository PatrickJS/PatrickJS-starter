import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {ToastsManager} from "ng2-toastr";

@Injectable()
export class RequestService {
    
    constructor(protected http: Http,
                protected notify: ToastsManager) { }
    
    makeGet(url, option?: any) {
        return this.http.get(url, option)
                   .map(
                       (res: Response) => {
                           return res.json();
                       })
                   .catch(
                       (error: any) => {
                           // In a real world app, we might use a remote logging infrastructure
                           // We'd also dig deeper into the error to get a better message
                           let errMsg = (
                               error.message) ? error.message :
                               error.status ? `${error.status} - ${error.statusText}` : 'Server not responding';
                           this.notify.error(errMsg, "Opp!");
                           return Observable.throw(errMsg);
                       });
    }
    
    makePost(url, data: any, showError: boolean = true) {
        return this.http
                   .post(url, data)
                   .map(
                       (res: Response) => {
                           return res.json();
                       })
                   .catch(
                       (error: any) => {
                           if (showError) {
                               if (error.status == 400 && error.hasOwnProperty('_body')) {
                                   let _mess = JSON.parse(error['_body']);
                                   if (_mess.error == true) {
                                       this.notify.warning(_mess['message']);
                                   } else {
                                       this.notify.warning("Unknown error from server");
                                   }
                               } else {
                                   this.notify.error("Server not responding");
                               }
                           }
                           return Observable.throw(error);
                       });
    }
    
    makeDelete(url) {
        return this.http
                   .delete(url)
                   .map(
                       (res: Response) => {
                           return res.json();
                       })
                   .catch(
                       (error: any) => {
                           return Observable.throw(error);
                       });
    }
    
    makePut(url, data: any) {
        return this.http
                   .put(url, data)
                   .map(
                       (res: Response) => {
                           return res.json();
                       })
                   .catch(
                       (error: any) => {
                           // In a real world app, we might use a remote logging infrastructure
                           // We'd also dig deeper into the error to get a better message
                           let errMsg = (
                               error.message) ? error.message :
                               error.status ? `${error.status} - ${error.statusText}` : 'Server not responding';
                           return Observable.throw(errMsg);
                       });
    }
    
    ping(url, multiplier = 1) {
        let request_image = function (url) {
            return new Promise(function (resolve, reject) {
                var img     = new Image();
                img.onload  = function () { resolve(img); };
                img.onerror = function () { reject(url); };
                img.src     = url + '?random-no-cache=' + Math.floor((1 + Math.random()) * 0x10000).toString(16);
            });
        };
        
        /**
         * Pings a url.
         * @param  {String} url
         * @param  {Number} multiplier - optional, factor to adjust the ping by.  0.3 works well for HTTP servers.
         * @return {Promise} promise that resolves to a ping (ms, float).
         */
        return new Promise(function (resolve, reject) {
            var start    = (new Date()).getTime();
            var response = function () {
                var delta = ((new Date()).getTime() - start);
                delta *= (multiplier || 1);
                resolve(delta);
            };
            request_image(url).then(response).catch(response);
            
            // Set a timeout for max-pings, 5s.
            setTimeout(function () { reject(Error('Timeout')); }, 3000);
        });
        
    }
}
