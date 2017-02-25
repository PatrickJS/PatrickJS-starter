import {PriceInterface} from "../models/PriceInterface";
import SimpleSchema from 'simpl-schema';
import {CollectionMaker} from "./Contract/CollectionMaker";

export const Prices = CollectionMaker.make<PriceInterface>("prices",
                                                           new SimpleSchema({
                                                             _id: {
                                                               type: String,
                                                               optional: true
                                                             },
                                                             name: String
                                                           }));
