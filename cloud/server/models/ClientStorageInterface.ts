export interface ClientStorageInterface {
  license: String,
  base_url: String,
  data: {
    entity: string,
    entity_id: number,
    type_change: string
  },
  cache_time: String,
}
