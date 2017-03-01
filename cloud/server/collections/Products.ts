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
                                                                 name: String,
                                                                 additional_data: {
                                                                   type: Object,
                                                                   optional: true
                                                                 },
                                                                 versions: [new SimpleSchema({
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