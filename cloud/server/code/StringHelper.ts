import * as uniqueString from "unique-string";

export class StringHelper {
  static getUnique(): string {
    return uniqueString();
  }
}