import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filter',
    pure: true
})
export class FilterPipe implements PipeTransform {

  keys: any;

    transform(items: any[], args: any): any {
      // console.log(args);
        if (!items) return items;
        this.keys = Object.keys(args);
        if (this.keys.length === 0) return items;
        return items.filter(item => this.checkItem(item, args));
    }

    checkItem(item: any, arg: any): boolean {
        let res = false;
        for (let key of this.keys) {
            let value = <string>item[key];
            let a = <string>arg[key];
            if ((!value || value === '') && !a) { res = false; continue; }
            if (value) value = value.toUpperCase();
            if (!a) res = true; else {
                if (value && value.indexOf(a.toUpperCase()) !== -1) return true;
                res = false;
            }
        }
        return res;

    }
}
