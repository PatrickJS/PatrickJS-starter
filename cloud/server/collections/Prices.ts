import {MongoObservable} from "meteor-rxjs";
import {PriceInterface} from "../models/PriceInterface";

export const Prices = new MongoObservable.Collection<PriceInterface>('prices');