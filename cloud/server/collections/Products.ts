import {MongoObservable} from "meteor-rxjs";
import {ProductInterface} from "../models/ProductInterface";
import SimpleSchema from 'simpl-schema';
import {DateTimeHelper} from "../code/DateTimeHelper";

export const Products = new MongoObservable.Collection<ProductInterface>('products');

Products['$schema']   = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  name: String,
  versions: new SimpleSchema({
    name: String,
    version: String,
    created_at: {
      type: Date,
      defaultValue: DateTimeHelper.getCurrentDate()
    },
    updated_at: {
      type: Date,
      defaultValue: DateTimeHelper.getCurrentDate()
    },
  }),
  created_at: {
    type: Date,
    defaultValue: DateTimeHelper.getCurrentDate()
  },
  updated_at: {
    type: Date,
    defaultValue: DateTimeHelper.getCurrentDate()
  }
});

Products.collection['attachSchema'](Products['$schema']);