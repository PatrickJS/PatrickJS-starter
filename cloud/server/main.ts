import {Meteor} from 'meteor/meteor';
import {Users} from "./collections/Users";
import {Seeder} from "./test/Seeder";

Meteor.startup(() => {
  initSupperAdminAccount();
  // seeder for testing
  // const seeder = new Seeder();
  // seeder.run();
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
  // User.create<User>(su()).addToRoles(Role.SUPERADMIN, Role.GROUP_CLOUD);
};
