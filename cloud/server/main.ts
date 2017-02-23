import {Meteor} from 'meteor/meteor';
import {Users} from "./collections/users";
import {User} from "./models/user";
import {Role} from "./models/role";

Meteor.startup(() => {
  initSupperAdminAccount();
  createIndexCollection();
});

let initSupperAdminAccount = () => {
  let _superUser = () => {
    return Users.findOne({"username": "superadmin"})
  };
  if (!_superUser()) {
    Accounts.createUser(
      {
        username: "superadmin",
        email: "khoild@smartosc.com",
        password: "admin123"
      });
  }
  User.create<User>(_superUser()).addToRoles(Role.SUPERADMIN, Role.GROUP_CLOUD);
};

let createIndexCollection = () => {
};