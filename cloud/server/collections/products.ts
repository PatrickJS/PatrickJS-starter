import {MongoObservable} from "meteor-rxjs";
import {Product} from "../models/product";
export const Products = new MongoObservable.Collection<Product>('products');