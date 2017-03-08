import { AbstractModel } from "./Contract/AbstractModel";

export class ClientStorage extends AbstractModel {
    protected $collection: string = "client_storages";
}