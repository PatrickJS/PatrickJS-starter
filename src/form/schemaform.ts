export class SchemaForm {
  public id: string;
  public schema: any;
  public model: any;

  constructor(
    id: string,
    schemaPath: string,
    modelPath: string
  ) {
    this.id = id;
    this.schema = require(schemaPath);
    this.model = require(modelPath);
  }

}
