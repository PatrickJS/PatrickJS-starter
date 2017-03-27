import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contract } from './contract.model';
import { CONTRACTS } from './mock/data.mock';

@Injectable()
export class ContractService {
    private contractsUrl = 'app/contracts';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    public getContracts(): Promise<Contract[]> {
        console.log('getContracts');

        /*
        return this.http.get(this.familiesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
            */
        return Promise.resolve(CONTRACTS);
    }

    public getContractsByChild(childId: Number): Promise<Contract[]> {
        console.log('getContractsByChild');

        /*
        return this.http.get(this.familiesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
            */
        return Promise.resolve(CONTRACTS);

    }

    public getContract(id: Number): Promise<Contract> {
        if (!(id instanceof Number)) {
            id = Number(id);
        }
        return this.getContracts()
            .then((contracts) => contracts.find((contract) => contract.id === id));
    }

    public update(contract: Contract): Promise<Contract> {
        const url = `${this.contractsUrl}/${contract.id}`;
        console.log('Updating contract : ', contract);
        /*
        return this.http
            .put(url, JSON.stringify(child), { headers: this.headers })
            .toPromise()
            .then(() => child)
            .catch(this.handleError);
            */
        return Promise.resolve(contract);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
