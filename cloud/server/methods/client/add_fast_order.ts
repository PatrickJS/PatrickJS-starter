import {OM} from "../../code/General/ObjectManager";
import {ClientFastOrder} from "../../models/ClientFastOrder";

new ValidatedMethod({
  name    : "client.add_fast_order",
  validate: function (data) {
    
  },
  run     : function (data) {
    let clientFastOrder: ClientFastOrder = OM.create<ClientFastOrder>(ClientFastOrder);
    return clientFastOrder.addData(data)
                          .save();
  }
});
