import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Child } from './child.model';
import { CHILDREN } from './mock/data.mock';

@Injectable()
export class ChildService {
    private childrenUrl = '/mv3/children';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    /**
     * Delete one child
     * @param id
     */
    public delete(id: number): Promise<void> {
        const url = `${this.childrenUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    /**
     * Update supplied child
     * @param child
     */
    public update(child: Child): Promise<Child> {
        const url = `${this.childrenUrl}/${child.id}`;
        let objToSend = Object.assign({}, child, {birthDate: child.birthDate.getFullYear()+'-'+(child.birthDate.getMonth()+1)+'-'+child.birthDate.getDate()})
        return this.http
            .put(url, JSON.stringify(objToSend), { headers: this.headers })
            .toPromise()
            .then((response) => {
                return response.json() as Child;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
