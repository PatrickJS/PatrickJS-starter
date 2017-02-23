import {MongoObservable} from "meteor-rxjs";
import {License} from "../models/license";
export const Licenses = new MongoObservable.Collection<License>('licenses');