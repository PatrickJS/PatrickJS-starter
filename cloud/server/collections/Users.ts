import {UserInterface} from "../models/UserInterface";
import {CollectionMaker} from "./Contract/CollectionMaker";
import {OM} from "../code/General/ObjectManager";
import {User} from "../models/User";
import {Role} from "../models/Role";

export const Users = CollectionMaker.makeFromExisting<UserInterface>(Meteor.users);

// hook to add default role
CollectionMaker.hookAfterInsert('users', (userId, user) => {
  let userModel = OM.create<User>(User, false, user);
  userModel.setRoles([Role.USER], Role.GROUP_CLOUD);
  return user;
});
