import {Meteor} from 'meteor/meteor';
import {User} from "./models/User";
import {OM} from "./code/General/ObjectManager";
import {Seeder} from "./test/Seeder";
import {Role} from "./models/Role";
import { Mongo } from 'meteor/mongo';


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
    OM.create<User>(User).load("superadmin", "username").addToRoles([Role.SUPERADMIN], Role.GROUP_CLOUD);
  }
};
