import {MongoObservable} from "meteor-rxjs";
import {ProductInterface} from "../models/ProductInterface";

export const Products = new MongoObservable.Collection<ProductInterface>('products');