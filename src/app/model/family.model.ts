
import { Child } from './child.model';
import { Parent } from './parent.model';
import { Contact } from './contact.model';

export class Family {
    public id?: number;
    public name: string;
    public children?: Child[];
    public parents?: Parent[];
    public contacts?: Contact[];
}
