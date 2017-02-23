import SimpleSchema from 'simpl-schema';
import {Users} from "../collections/users";
new ValidatedMethod({
    name: 'user.create_user_by_license',
    validate: function (user) {
        try {
            return new SimpleSchema({
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
            }).validate(user);
        } catch (e) {
            throw new Meteor.Error("Error", e.message);
        }
    },
    run: function (user) {
        return Users.insert(user);
    }
});
