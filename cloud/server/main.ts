import {Meteor} from 'meteor/meteor';
import {User} from "./models/User";
import {OM} from "./code/General/ObjectManager";
import {Seeder} from "./test/Seeder";
import {Role} from "./models/Role";

Meteor.startup(() => {
  initSupperAdminAccount();
  
  // seeder for testing
  const seeder = new Seeder();
  seeder.run();
});

let initSupperAdminAccount = () => {
  let su = OM.create<User>(User).load("superadmin", "username");
  if (!su) {
    Accounts.createUser(
      {
        username: "superadmin",
        email: "khoild@smartosc.com",
        password: "admin123"
      });
    OM.create<User>(User).load("superadmin", "username").setRoles([Role.SUPERADMIN], Role.GROUP_CLOUD);
  }
};
