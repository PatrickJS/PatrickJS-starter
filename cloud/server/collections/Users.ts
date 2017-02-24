import {MongoObservable} from "meteor-rxjs";
import {UserInterface} from "../models/UserInterface";
import SimpleSchema from 'simpl-schema';

export const Users = MongoObservable.fromExisting<UserInterface>(<any>Meteor.users);
Users['$schema']   = new SimpleSchema(
  {
    username: {
      type: String,
      min: 6,
      max: 40
    },
    email: {
      type: String,
      regEx: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
      type: String,
      min: 6,
      max: 50
    },
    license: {
      type: String
    },
    profile: {
      type: Object,
      optional: true
    },
    'profile.first_name': {
      type: String,
      optional: true
    },
    'profile.last_name': {
      type: String,
      optional: true
    },
  },
  {
    clean: {
      filter: true,
      autoConvert: true,
      removeEmptyStrings: true,
      trimStrings: true,
      getAutoValues: true,
      removeNullsFromArrays: true,
    }
  }
);

Accounts.validateNewUser(function (user) {
  // TODO: checking license key
  
  if (user.username && user.username.length >= 3)
    return true;
  throw new Meteor.Error(403, "Username must have at least 3 characters");
});

(Users.collection as any).before.insert(function (userId, doc) {
  doc.created_at = Date.now();
});