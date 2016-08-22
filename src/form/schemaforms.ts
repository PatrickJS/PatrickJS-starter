import { SchemaForm } from './schemaform';

let someForm = new SchemaForm('long', './form-templates/sampleschema.json', './form-templates/samplemodel.json');
let anotherForm = new SchemaForm('short', './form-templates/sampleschema2.json', './form-templates/samplemodel2.json');

export const SCHEMAFORMS: SchemaForm[] = [ someForm, anotherForm ];
