import {MongoObservable} from "meteor-rxjs";
import {Price} from "../models/price";
export const Prices = new MongoObservable.Collection<Price>('prices');