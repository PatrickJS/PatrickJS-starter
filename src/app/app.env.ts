import { Inject, Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AppEnv {

    private env: Object = null;

    constructor(private http: HttpClient) {}

    /**
     * Get value of environemtn variable
     */
    public getKey(key: any) {
        return this.env ? this.env[ key ] : undefined;
    }

    /**
     * Load ENV variables from assets/.env
     * @returns {Promise<T>}
     */
    public load() {
        return new Promise((resolve, reject) => {
            this.http.get('.env', { responseType: 'text' }).map((res) => res)
            .catch((error: any): any => {
                console.log('Configuration file ".env" could not be read');
                resolve(true);
                return Observable.throw(error.message || 'Server error');
            }).subscribe((env: String) => {
                this.env = this.parseEnvToObject(env);
                console.log('ENV loaded:', this.env);
                resolve(true);
            });

        });
    }

    /**
     * Parse .env file to js object (including env comments detection '#')
     * @param envText
     * @returns {{}}
     */
    private parseEnvToObject(envText) {

        let lines = envText.split(/[\r\n]+/g);
        let result = {};

        for (let line of lines) {
            // this regexp detect '#'(hash) as comment, and omits its escape '\#'
            let match = /(.*?)=(([^\\#]|\\#?)*)?(#.*)?/.exec(line);

            if (match) {
                let val: any = match[ 2 ].trim();

                if (val) {
                    if (val[ 0 ] === '"' && val[ val.length - 1 ] === '"') { // quoted string case

                        val = val.replace(/\\/g, ''); // remove backslashes (escape char)
                        val = val.slice(1, -1); // remove quotes at the beginning and end of string
                    } else {
                        // if string is not quoted then try to detect non-string value

                        let valLowerCase  = val.toLowerCase();

                        if (valLowerCase === 'true') {
                            val = true;
                        } else  if (valLowerCase === 'false') {
                            val = false;
                        } else  if (valLowerCase === 'null') {
                            val = null;
                        } else  if (!isNaN(valLowerCase)) { // detect number
                            val = Number(val);
                        }
                    }
                }

                result[ match[ 1 ] ] = val;
            }
        }

        return result;
    }

}
