import {Users} from "../collections/Users";
import {OM} from "../code/General/ObjectManager";
import {User} from "../models/User";

new ValidatedMethod({
  name    : 'user.create_user_by_license',
  validate: function (user) {
    try {
      new Users['$schema'].validate(user);
    } catch (e) {
      throw new Meteor.Error("Error", e.message);
    }
  },
  run     : function (user) {
    // Kiểm tra xem license đã có shop_owner_id chưa?
    
    // insert user with license
    
    return Users.insert(user);
  }
});

new ValidatedMethod({
  name    : 'user.get_roles',
  validate: function () {
    if (!this.userId) {
      throw new Meteor.Error("Error", "Access denied");
    }
  },
  run     : function () {
    let userModel: User = OM.create<User>(User).loadById(this.userId);
    console.log(userModel.getData());
    return userModel.getRoles();
  }
});
