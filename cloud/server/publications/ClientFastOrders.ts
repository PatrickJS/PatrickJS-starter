import {ClientFastOrders} from "../collections/ClientFastOrders";

Meteor.publish("client_fast_orders", function () {
  if (!this.userId)
    return;
  return ClientFastOrders.collection.find({user_id: this.userId});
});
