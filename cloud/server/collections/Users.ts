import {UserInterface} from "../models/UserInterface";
import SimpleSchema from 'simpl-schema';
import {CollectionMaker} from "./Contract/CollectionMaker";
import {DateTimeHelper} from "../code/DateTimeHelper";

export const Users = CollectionMaker.makeFromExisting<UserInterface>(Meteor.users,
                                                                     new SimpleSchema(
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
                                                                     ));