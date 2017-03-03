import {User} from "../../models/User";
import {OM} from "../../code/General/ObjectManager";

new ValidatedMethod({
  name    : 'user.create_cashier_by_shop_owner',
  validate: function () {
    if (!this.userId) {
      throw new Meteor.Error("user.get_roles", "Access denied");
    }
    let userModel: User = OM.create<User>(User).loadById(this.userId);
    if (!userModel.isShopOwner())
      throw new Meteor.Error("user.create_cashier_by_shop_owner", "You are not shop owner");
  },
  run     : function () {
  // attach cashier to license
  }
});
DDPRateLimiter.addRule({
                         userId: function (userId) {
                           return true;
                         },
                         type  : "method",
                         name  : "user.create_cashier_by_shop_owner",
                       }, 1, 1000);
