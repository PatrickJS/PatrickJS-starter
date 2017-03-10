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
                                                                 shop_owner_username: {
                                                                   type: String,
                                                                   optional: true
                                                                 },
                                                                 has_product: Array,
                                                                 "has_product.$": new SimpleSchema({
                                                                   product_id: String,
                                                                   base_url: {
                                                                     type: Array,
                                                                     optional: true
                                                                   },
                                                                   'base_url.$': String,
                                                                   has_user: {
                                                                     type: Array,
                                                                     optional: true
                                                                   },
                                                                   "has_user.$": new SimpleSchema({
                                                                     user_id: String,
                                                                     username: String
                                                                   }),
                                                                   pricing_id: String,
                                                                   start_version: String,
                                                                   status: SimpleSchema.Integer,
                                                                   purchase_date: Date,
                                                                   expired_date: Date
                                                                 }),
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
