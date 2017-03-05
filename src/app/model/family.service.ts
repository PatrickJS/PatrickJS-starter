import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Family } from './family.model';
import { Child } from './child.model';
import { Parent } from './parent.model';
import { Contact } from './contact.model';
import { FAMILIES } from './mock/data.mock';

@Injectable()
export class FamilyService {
    private familiesUrl = '/mv3/families';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    /**
     * Get all families
     */
    public getFamilies(): Promise<Family[]> {
        console.log('getFamilies : ', FAMILIES);

        return this.http.get(this.familiesUrl)
            .toPromise()
            .then((response) => {
                return response.json() as Family[];
            })
            .catch(this.handleError);
    }

    /**
     * Get children of given familyId
     */
    public getChildren(familyId: number): Promise<Child[]> {

        const url = `${this.familiesUrl}/${familyId}/children`;

        return this.http.get(url)
            .toPromise()
            .then((response) => {
                return response.json() as Child[];
            })
            .catch(this.handleError);
    }

    /**
     * Add child to given familyId
     */
    public addChild(familyId: number, child: Child): Promise<Child> {

        const url = `${this.familiesUrl}/${familyId}/children`;

        return this.http.post(url, JSON.stringify(child), { headers: this.headers })
            .toPromise()
            .then((response) => {
                return response.json() as Child;
            })
            .catch(this.handleError);
    }

    /**
     * Add parent to given familyId
     */
    public addParent(familyId: number, parent: Parent): Promise<Parent> {

        const url = `${this.familiesUrl}/${familyId}/parents`;

        return this.http.post(url, JSON.stringify(parent), { headers: this.headers })
            .toPromise()
            .then((response) => {
                return response.json() as Parent;
            })
            .catch(this.handleError);
    }

    /**
     * Add contact to given familyId
     */
    public addContact(familyId: number, contact: Contact): Promise<Contact> {

        const url = `${this.familiesUrl}/${familyId}/contacts`;

        return this.http.post(url, JSON.stringify(contact), { headers: this.headers })
            .toPromise()
            .then((response) => {
                return response.json() as Contact;
            })
            .catch(this.handleError);
    }

    public getFamily(id: Number): Promise<Family> {
        if (!(id instanceof Number)) {
            id = Number(id);
        }
        const url = `${this.familiesUrl}/${id}`;

        return this.http.get(url)
            .toPromise()
            .then((response) => {
                return response.json() as Family;
            })
            .catch(this.handleError);
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

        return this.http
            .post(this.familiesUrl, JSON.stringify(family), { headers: this.headers })
            .toPromise()
            .then((res) => {
                return res.json() as Family;
            })
            .catch(this.handleError);

//        FAMILIES.push(family);
//        return Promise.resolve(family);
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
