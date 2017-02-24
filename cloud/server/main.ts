import {Meteor} from 'meteor/meteor';
import {Users} from "./collections/users";
import {User} from "./models/user";
import {Role} from "./models/role";

Meteor.startup(() => {
  initSupperAdminAccount();
  createIndexCollection();
});

let initSupperAdminAccount = () => {
  let su = () => {
    return Users.findOne({"username": "superadmin"})
  };
  if (!su()) {
    Accounts.createUser(
      {
        username: "superadmin",
        email: "khoild@smartosc.com",
        password: "admin123"
      });
  }
  User.create<User>(su()).addToRoles(Role.SUPERADMIN, Role.GROUP_CLOUD);
};

let createIndexCollection = () => {
};