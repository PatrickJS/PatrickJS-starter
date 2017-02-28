import {LicenseInterface} from "../models/LicenseInterface";
import {CollectionMaker} from "./Contract/CollectionMaker";
import SimpleSchema from 'simpl-schema';
import {DateTimeHelper} from "../code/DateTimeHelper";

export const Licenses = CollectionMaker.make<LicenseInterface>("licenses",
                                                               new SimpleSchema({
                                                                 key: String,
                                                                 status: SimpleSchema.Integer,
                                                                 shop_owner_id: {
                                                                   type: String,
                                                                   optional: true
                                                                 },
                                                                 has_product: [new SimpleSchema({
                                                                   product_id: String,
                                                                   base_url: {
                                                                     type: Array,
                                                                     optional: true
                                                                   },
                                                                   'base_url.$': String,
                                                                   pricing_id: String,
                                                                   start_version: String,
                                                                   purchase_date: {
                                                                     type: Date,
                                                                     defaultValue: DateTimeHelper.getCurrentDate()
                                                                   },
                                                                   expired_date: Date
                                                                 })],
                                                                 is_auto_generate: {
                                                                   type: Boolean,
                                                                   defaultValue: true
                                                                 },
                                                                 created_by: String,
                                                                 created_at: {
                                                                   type: Date,
                                                                   defaultValue: DateTimeHelper.getCurrentDate()
                                                                 },
                                                                 updated_at: {
                                                                   type: Date,
                                                                   defaultValue: DateTimeHelper.getCurrentDate()
                                                                 }
                                                               }));