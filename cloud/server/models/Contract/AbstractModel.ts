import {DataObject} from "../../code/DataObject";
import {CollectionMaker} from "../../collections/Contract/CollectionMaker";

export abstract class AbstractModel extends DataObject {
  protected abstract $collection: string;
  
  /*
   * Get Object
   */
  loadById(id: string): any {
    let _data = this.getMongoCollection().findOne({_id: id});
    return !!_data ? this.addData(_data) : null;
  }
  
  load(value: any, field = "_id"): any {
    if (field == "_id")
      return this.loadById(value);
    else {
      let _selector = {};
      _selector[field] = value;
      let _data = this.getMongoCollection().findOne(_selector);
      return !!_data ? this.addData(_data) : null;
    }
  }
  
  save(): Promise<any> {
    if (!this.getMongoCollection())
      throw new Error("Can't get collection name from model");
    
    return new Promise((resolve, reject) => {
      if (!this.getData('_id')) {
        this.getMongoCollection()
            .insert(this.getData(), (err) => {
              return err ? reject(err) : resolve();
            });
      } else {
        this.getMongoCollection()
            .update({_id: this.getData('_id')}, this.getData(), [], (err) => {
              return err ? reject(err) : resolve();
            })
      }
    });
  }
  
  getMongoCollection<T>(): Mongo.Collection<T> {
    return CollectionMaker.getCollection<T>(this.$collection).collection;
  }
}