import {OM} from "../code/General/ObjectManager";
import {User} from "../models/User";
import {Role} from "../models/Role";
import * as _ from "lodash";
import {License} from "../models/License";
import {ClientFastOrders} from "../collections/ClientFastOrders";

Meteor.publish("client_fast_orders", function () {
  if (!this.userId)
    return;
  const user: User = OM.create<User>(User).loadById(this.userId);
  if (user.isInRoles(Role.USER)) {
    const licenses = user.getLicenses();
    if (_.size(licenses) == 1) {
      const license: License = OM.create<License>(License).loadById(licenses[0].license_id);
      if (license)
        return ClientFastOrders.collection.find({license: license.getData('key')});
    }
  }
});
