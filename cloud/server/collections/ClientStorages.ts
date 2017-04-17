import {CollectionMaker} from "./Contract/CollectionMaker";
import SimpleSchema from 'simpl-schema';
import {ClientStorageInterface} from "../models/ClientStorageInterface";

export const ClientStorages = CollectionMaker.make<ClientStorageInterface>("client_storages", new SimpleSchema({
  license: String,
  base_url: String,
  data: new SimpleSchema({
    entity: String,
    entity_id: SimpleSchema.oneOf(String,Number),
    type_change: String
  }),
  cache_time: Number,
  created_at: String
}));
