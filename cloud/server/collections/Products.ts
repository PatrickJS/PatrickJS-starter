import {ProductInterface} from "../models/ProductInterface";
import SimpleSchema from 'simpl-schema';
import {DateTimeHelper} from "../code/DateTimeHelper";
import {CollectionMaker} from "./Contract/CollectionMaker";

export const Products = CollectionMaker.make<ProductInterface>("products",
                                                               new SimpleSchema({
                                                                 _id: {
                                                                   type: String,
                                                                   optional: true
                                                                 },
                                                                 code: String,
                                                                 name: String,
                                                                 additional_data: {
                                                                   type: Object,
                                                                   optional: true
                                                                 },
                                                                 'additional_data.description': String,
                                                                 pricings: {
                                                                   type: Array
                                                                 },
                                                                 'pricings.$': String,
                                                                 versions: [new SimpleSchema({
                                                                   name: String,
                                                                   version: String,
                                                                   changelog: {
                                                                     type: String,
                                                                     optional: true
                                                                   },
                                                                   created_at: {
                                                                     type: Date,
                                                                   },
                                                                   updated_at: {
                                                                     type: Date,
                                                                   },
                                                                 })],
                                                                 created_at: {
                                                                   type: Date,
                                                                   defaultValue: DateTimeHelper.getCurrentDate()
                                                                 },
                                                                 updated_at: {
                                                                   type: Date,
                                                                   defaultValue: DateTimeHelper.getCurrentDate()
                                                                 }
                                                               }));
