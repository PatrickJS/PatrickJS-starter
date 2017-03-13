import { ClientStorage } from "../../models/ClientStorage";
import { OM } from "../../code/General/ObjectManager";

new ValidatedMethod({
    name: "client.trigger_realtime",
    validate: function (data) {

    },
    run: function (data) {
        let clientStorageModel: ClientStorage = OM.create<ClientStorage>(ClientStorage);
        clientStorageModel.addData(data)
            .save();
    }
});
DDPRateLimiter.addRule({
    userId: function (userId) {
        return true;
    },
    type: "method",
    name: "client.trigger_realtime",
}, 3, 1000);
