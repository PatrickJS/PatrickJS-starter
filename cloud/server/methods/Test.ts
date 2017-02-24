Meteor.methods(
  {
    "test": function () {
      return "Your number is: " + Math.round(Math.random() * 1000);
    }
  }
);
DDPRateLimiter.addRule({
                         userId: function (userId) {
                           return true;
                         },
                         type: "method",
                         name: "test",
                       }, 5, 1000);