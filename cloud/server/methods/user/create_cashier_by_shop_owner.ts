import {User} from "../../models/User";
import {OM} from "../../code/General/ObjectManager";
import {Role} from "../../models/Role";
import {UserLicense} from "../../models/ManyToMany/UserLicense";
import {License} from "../../models/License";

new ValidatedMethod({
  name: 'user.create_cashier_by_shop_owner',
  validate: function () {
    if (!this.userId) {
      throw new Meteor.Error("user.get_roles", "Access denied");
    }
    let userModel: User = OM.create<User>(User).loadById(this.userId);
    if (!userModel.isShopOwner())
      throw new Meteor.Error("user.create_cashier_by_shop_owner", "You are not shop owner");
  },
  run: function (data) {
    let cashier = OM.create<User>(User).load(data['username'], "username");
    if (!cashier)
      Accounts.createUser(
        {
          username: data['username'],
          email: data['email']
        });
    
    cashier       = OM.create<User>(User).load(data['username'], "username");
    const license = OM.create<License>(License).load(data['license_id']);
    if (cashier) {
      return UserLicense.attach(cashier, license, User.LICENSE_PERMISSION_CASHIER, data['products']);
    }
    else
      throw new Meteor.Error("user.create_cashier_by_shop_owner", "Can't create cashier account");
  }
});
DDPRateLimiter.addRule({
                         userId: function (userId) {
                           return true;
                         },
                         type: "method",
                         name: "user.create_cashier_by_shop_owner",
                       }, 1, 1000);
