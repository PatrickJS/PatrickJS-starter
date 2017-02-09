import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Family } from './family.model';
import { FAMILIES } from './mock/data.mock';

@Injectable()
export class FamilyService {
    private familiesUrl = 'app/families';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    public getFamilies(): Promise<Family[]> {
        console.log('getFamilies : ', FAMILIES);

        /*
        return this.http.get(this.familiesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
            */
        return Promise.resolve(FAMILIES);

    }

    public getFamily(id: Number): Promise<Family> {
        if (!(id instanceof Number)) {
            id = Number(id);
        }
        return this.getFamilies()
            .then((families) => families.find((family) => family.id === id));
    }

    public update(family: Family): Promise<Family> {
        const url = `${this.familiesUrl}/${family.id}`;
        return this.http
            .put(url, JSON.stringify(family), { headers: this.headers })
            .toPromise()
            .then(() => family)
            .catch(this.handleError);
    }

    public create(family: Family): Promise<Family> {
        /*
        return this.http
            .post(this.familiesUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
            */
        FAMILIES.push(family);
        return Promise.resolve(family);
    }

    public delete(id: number): Promise<void> {
        const url = `${this.familiesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
