import {MongoObservable} from "meteor-rxjs";
import {LicenseInterface} from "../models/LicenseInterface";

export const Licenses = new MongoObservable.Collection<LicenseInterface>('licenses');