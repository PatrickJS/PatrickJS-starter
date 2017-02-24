import {DataObject} from "./DataObject"

export abstract class AbstractModel extends DataObject {
  $collection: string;
  $schema: any;
  
  /*
   * Get Object
   */
  loadById<T>(id: string): T {
    let data = Mongo.Collection['get'](this.$collection).find({_id: id});
    return data ? AbstractModel.create<T>(data) : null;
  }
  
  /*
   * Get JSON
   */
  retrieveById<T>(id: string): T {
    return Mongo.Collection['get'](this.$collection).find({_id: id});
  }
  
  save(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.getData('_id')) {
        // update
        Mongo.Collection['get'](this.$collection).insert(this, (err) => {
          return err ? err.reject(err) : resolve();
        });
      } else {
        // insert
        Mongo.Collection['get'](this.$collection).update({_id: this.getData('_id')}, this.$schema.clean(), [], (err) => {
          return err ? err.reject(err) : resolve();
        })
      }
    });
  }
}