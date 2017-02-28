import {Users} from "../collections/Users";
import {UserInterface} from "../models/UserInterface";

Meteor.publishComposite('users', function (pattern: string): PublishCompositeConfig<UserInterface> {
  if (!this.userId) {
    return;
  }
  
  let selector = {};
  
  if (pattern) {
    selector = {
      'profile.first_name': {$regex: pattern, $options: 'i'}
    };
  }
  
  return {
    find: () => {
      return Users.collection.find(selector, {
        fields: {profile: 1, username: 1, emails: 1, roles: 1},
        limit : 15
      });
    }
  };
});
