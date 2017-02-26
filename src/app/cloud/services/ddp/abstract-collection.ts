import {
  MongoObservable,
  MeteorObservable
} from "meteor-rxjs";
import {
  Subscription,
  Observable
} from "rxjs";

export abstract class AbstractCollection {
  protected abstract $collection: string;
  protected _collection: MongoObservable.Collection<any>;
  protected _collectionSubscription: Subscription;
  protected _collectionObservable: Observable<MongoObservable.Collection<any>>;
  
  getCollection(): MongoObservable.Collection<any> {
    if (typeof this._collection == "undefined") {
      this._collection = new MongoObservable.Collection(this.$collection);
    }
    return this._collection;
  }
  
  protected subscribeCollection(): void {
    if (typeof this._collectionSubscription == "undefined") {
      this._collectionObservable = new Observable(ob => {
        MeteorObservable.subscribe(this.$collection).subscribe(() => {
          this._collectionSubscription = MeteorObservable.autorun().subscribe(() => {
            ob.next(this.getCollection());
          });
        });
      });
    }
  }
  
  getCollectionObservable(): Observable<MongoObservable.Collection<any>> {
    this.subscribeCollection();
    return this._collectionObservable;
  }
}
