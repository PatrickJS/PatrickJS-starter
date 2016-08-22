import { Injectable } from '@angular/core';
import {SchemaForm} from "./schemaform";
import {SCHEMAFORMS} from "./schemaforms";

@Injectable()
export class FormService {
  getForms(): Promise<SchemaForm[]> {
    return Promise.resolve(SCHEMAFORMS)
  }
}
