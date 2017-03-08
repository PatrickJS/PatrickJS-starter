import {CollectionMaker} from "./Contract/CollectionMaker";
import SimpleSchema from 'simpl-schema';

export const ClientFastOrders = CollectionMaker.make("client_fast_orders", new SimpleSchema({
  license        : String,
  client_order_id: String,
  data           : Object
}));
