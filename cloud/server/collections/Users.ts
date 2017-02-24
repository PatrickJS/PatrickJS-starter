import {MongoObservable} from "meteor-rxjs";
import {UserInterface} from "../models/UserInterface";

export const Users = MongoObservable.fromExisting<UserInterface>(<any>Meteor.users);

Accounts.validateNewUser(function (user) {
  // TODO: checking license key
  
  if (user.username && user.username.length >= 3)
    return true;
  throw new Meteor.Error(403, "Username must have at least 3 characters");
});

(Users.collection as any).before.insert(function (userId, doc) {
  doc.created_at = Date.now();
});