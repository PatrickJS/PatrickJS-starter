import {User} from "../../models/User";
import {OM} from "../../code/General/ObjectManager";
import {Role} from "../../models/Role";
import {UserLicense} from "../../models/ManyToMany/UserLicense";
import {License} from "../../models/License";
import * as _ from "lodash";
import * as $q from "q";

new ValidatedMethod({
  name: 'user.update_profile',
  validate: function () {
    if (!this.userId) {
      throw new Meteor.Error("user.get_roles", "Access denied");
    }
  },
  run: function (data) {
    let defer = $q.defer();
    const user = Meteor.users.findOne({_id: data['_id']});
    if (user)
      Meteor.users.update({_id: user._id}, {$set:data});
    else {
      throw new Meteor.Error("user.update_profile", "Can't find user");
    }
    return defer.promise;
  }
});
