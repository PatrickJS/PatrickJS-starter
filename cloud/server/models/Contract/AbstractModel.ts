import {DataObject} from "../../code/DataObject";
import {CollectionMaker} from "../../collections/Contract/CollectionMaker";

export abstract class AbstractModel extends DataObject {
  protected abstract $collection: string;
  
  /*
   * Get Object
   */
  loadById(id: string): this {
    let data = this.getMongoCollection().find({_id: id});
    return this.addData(data);
  }
  
  save(): Promise<any> {
    if (!this.getMongoCollection())
      throw new Error("Can't get collection name from model");
    
    return new Promise((resolve, reject) => {
      if (!this.getData('_id')) {
        this.getMongoCollection()
            .insert(this, (err) => {
              return err ? reject(err) : resolve();
            });
      } else {
        this.getMongoCollection()
            .update({_id: this.getData('_id')}, this, [], (err) => {
              return err ? reject(err) : resolve();
            })
      }
    });
  }
  
  getMongoCollection<T>(): Mongo.Collection<T> {
    return CollectionMaker.getCollection<T>(this.$collection).collection;
  }
}