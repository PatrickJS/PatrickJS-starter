import {
  MongoObservable,
  MeteorObservable
} from "meteor-rxjs";
import {
  Subscription,
  Observable,
  ReplaySubject
} from "rxjs";

export abstract class AbstractCollection {
  protected abstract $collection: string;
  protected $collectionExisted: boolean = false;
  protected _collection: MongoObservable.Collection<any>;
  protected _collectionSubscription: Subscription;
  protected _collectionObservable: ReplaySubject<MongoObservable.Collection<any>>;
  
  getCollection(): MongoObservable.Collection<any> {
    if (typeof this._collection == "undefined") {
      if (this.$collectionExisted) {
        this._collection = MongoObservable.fromExisting(Meteor.users);
      }
      else {
        this._collection = new MongoObservable.Collection(this.$collection);
      }
    }
    return this._collection;
  }
  
  protected subscribeCollection(): void {
    if (typeof this._collectionObservable == "undefined") {
      this._collectionObservable = new ReplaySubject(1);
      MeteorObservable.subscribe(this.$collection).subscribe(() => {
        this._collectionSubscription = MeteorObservable.autorun().subscribe(() => {
          this._collectionObservable.next(this.getCollection());
        });
      });
    }
  }
  
  getCollectionObservable(): Observable<MongoObservable.Collection<any>> {
    this.subscribeCollection();
    return this._collectionObservable.asObservable().share();
  }
}
