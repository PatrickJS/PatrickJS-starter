import {UserInterface} from "../models/UserInterface";
import {CollectionMaker} from "./Contract/CollectionMaker";
import {OM} from "../code/General/ObjectManager";
import {User} from "../models/User";
import {Role} from "../models/Role";

export const Users = CollectionMaker.makeFromExisting<UserInterface>(Meteor.users);

// hook after created user to set default role for user
Accounts.onCreateUser(function (options, user) {
  let userModel = OM.create<User>(User, false, user);
  userModel.addToRoles([Role.USER], Role.GROUP_CLOUD);
  return user;
});
