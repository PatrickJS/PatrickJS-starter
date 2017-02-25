import SimpleSchema from 'simpl-schema';
import {User} from "../models/User";
import {Role} from "../models/Role";
import {LicenseHasProduct} from "../models/License";

new ValidatedMethod({
  name: "license.create_license",
  validate: function (data) {
    const user = new User().loadById(this.userId());
    if (user.isInRoles([Role.SUPERADMIN, Role.ADMIN, Role.SALES], Role.GROUP_CLOUD)) {
      try {
        return new SimpleSchema({
          has_product: [new LicenseHasProduct().$schema],
          status: String
        }).validate(data);
      } catch (e) {
        throw new Meteor.Error("Error", e.message);
      }
    } else {
      throw new Meteor.Error("license.create_license", "Access denied");
    }
  },
  run: function (data) {
    
  }
});