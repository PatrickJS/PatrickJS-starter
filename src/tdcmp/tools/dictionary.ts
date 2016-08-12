export interface IDictionary {
    keys: string[];
    add(key: string, value: any): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    values(): any[];
}

export class Dictionary implements IDictionary {

    _keys: string[] = [];
    _values: any[] = [];

    constructor(init: { key: string; value: any; }[]) {

        for (let x = 0; x < init.length; x++) {
            this[init[x].key] = init[x].value;
            this._keys.push(init[x].key);
            this._values.push(init[x].value);
        }
    }

    add(key: string, value: any) {
       let index = this._keys.indexOf(key);
       if (index !== -1) {
         this._values[index] = value;
         this[key] = value;
         return;
       }
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }

    remove(key: string) {
        let index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this[key];
    }

    public get keys(): string[] {
        return this._keys;
    }

    values(): any[] {
        return this._values;
    }

    containsKey(key: string) {
        if (typeof this[key] === 'undefined') {
            return false;
        }

        return true;
    }

    toLookup(): IDictionary {
        return this;
    }
}
