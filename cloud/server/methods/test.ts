Meteor.methods(
    {
        "test": function () {
            return "Your number is: " + Math.round(Math.random() * 1000);
        }
    }
);