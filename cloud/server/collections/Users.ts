import {UserInterface} from "../models/UserInterface";
import SimpleSchema from 'simpl-schema';
import {CollectionMaker} from "./Contract/CollectionMaker";
import {DateTimeHelper} from "../code/DateTimeHelper";

export const Users = CollectionMaker.makeFromExisting<UserInterface>(Meteor.users);