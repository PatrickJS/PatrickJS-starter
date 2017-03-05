import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Family } from './family.model';
import { Child } from './child.model';
import { Parent } from './parent.model';
import { Contact } from './contact.model';
import { FAMILIES } from './mock/data.mock';

@Injectable()
export class ContactService {
    private contactsUrl = '/mv3/contacts';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    /**
     * Update contact
     */
    public update(contact: Contact): Promise<void> {
        const url = `${this.contactsUrl}/${contact.id}`;

        return this.http
            .put(url, JSON.stringify(contact), { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    /**
     * Delete one contact
     * @param id
     */
    public delete(id: number): Promise<void> {
        const url = `${this.contactsUrl}/${id}`;
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
