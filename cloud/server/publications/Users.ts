import {User} from "../models/user";
import {Users} from "../collections/users";
Meteor.publishComposite('users', function (pattern: string): PublishCompositeConfig<User> {
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
                fields: {profile: 1},
                limit: 15
            });
        }
    };
});