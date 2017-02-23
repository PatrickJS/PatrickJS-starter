var testMethodRule = {
    userId: function (userId) {
        return true;
    },
    type: "method",
    name: "test",
};


DDPRateLimiter.addRule(testMethodRule, 5, 1000);