import {PriceInterface} from "../models/PriceInterface";
import SimpleSchema from 'simpl-schema';
import {CollectionMaker} from "./Contract/CollectionMaker";

export const Prices = CollectionMaker.make<PriceInterface>("prices",
                                                           new SimpleSchema({
                                                             _id: {
                                                               type: String,
                                                               optional: true
                                                             },
                                                             code: String,
                                                             name: String,
                                                             display_name: String,
                                                             type: SimpleSchema.Integer,
                                                             cost: String,
                                                             visibility: SimpleSchema.Integer,
                                                             description: {
                                                               type: String,
                                                               optional: true
                                                             }
                                                           }));
