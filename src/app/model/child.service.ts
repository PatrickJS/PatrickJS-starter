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

    public getChildren(): Promise<Child[]> {
        console.log('getChildren');

        /*
        return this.http.get(this.familiesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
            */
        return Promise.resolve(CHILDREN);

    }

    public getChild(id: Number): Promise<Child> {
        if (!(id instanceof Number)) {
            id = Number(id);
        }
        return this.getChildren()
            .then((children) => children.find((child) => child.id === id));
    }

    public create(child: Child): Promise<Child> {

        return this.http
            .post(this.childrenUrl, JSON.stringify(child), { headers: this.headers })
            .toPromise()
            .then((res) => {
                return res.json() as Child;
            })
            .catch(this.handleError);

    }

    public update(child: Child): Promise<Child> {
        const url = `${this.childrenUrl}/${child.id}`;
        console.log('Updating child : ', child);
        /*
        return this.http
            .put(url, JSON.stringify(child), { headers: this.headers })
            .toPromise()
            .then(() => child)
            .catch(this.handleError);
            */
        return Promise.resolve(child);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
