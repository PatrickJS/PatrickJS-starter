export class ZValidator {
  static validate(schema: any, data: any) {
    try {
      schema.validate(data);
    } catch (e) {
      throw new Meteor.Error("Error", e.message);
    }
  }
}
