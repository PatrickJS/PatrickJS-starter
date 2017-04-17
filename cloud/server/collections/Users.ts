import {UserInterface} from "../models/UserInterface";
import {CollectionMaker} from "./Contract/CollectionMaker";
import {OM} from "../code/General/ObjectManager";
import {User} from "../models/User";
import {Role} from "../models/Role";

export const Users = CollectionMaker.makeFromExisting<UserInterface>(Meteor.users);

// hook to add default role and send verify email
CollectionMaker.hookAfterInsert('users', (userId, user) => {
  let userModel = OM.create<User>(User, false, user);
  userModel.addToRoles([Role.USER], Role.GROUP_CLOUD);
  Accounts.sendVerificationEmail(user['_id'])
});
