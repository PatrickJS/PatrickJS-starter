import {ClientFastOrders} from "../collections/ClientFastOrders";

Meteor.publish("client_fast_orders", function () {
  return ClientFastOrders.collection.find({});
});
