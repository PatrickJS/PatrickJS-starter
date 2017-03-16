import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

var greetVar;
var welcomeMsgVar;
var btnTextVar;
var beforeMsgVar;
var regardVar;
var followMsgVar;

Accounts.urls.resetPassword = function (token) {
  return Meteor.absoluteUrl('reset-password/' + token);
};


function checkLanguage(user) {
    greetVar = "Hello ";
    welcomeMsgVar = "We got a request to reset you password, if it was you click the button above.";
    btnTextVar = "Reset";
    beforeMsgVar = "If you do not want to change the password, ignore this message."
    regardVar = "Thanks, Iurest team.";
    followMsgVar = "Follow us on social networks";
}

function greet() {
  return function (user, url) {

    checkLanguage(user);
    var greeting = (user.profile && user.profile.first_name) ? (greetVar + user.profile.first_name + ",") : greetVar;

    return `
               <table border="0" width="100%" cellspacing="0" cellpadding="0" bgcolor="#f5f5f5"><tbody><tr><td style="padding: 20px 0 30px 0;"><table style="border-collapse: collapse; box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);" border="0" width="60%" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="padding: 10px 0 10px 0;" align="center" bgcolor="#E53935"><img style="display: block;" src="logo_iurest_white.png" alt="Reset passwd" /></td></tr><tr><td style="padding: 10px 30px 10px 30px;" bgcolor="#ffffff"><table border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="padding: 15px 0 0 0; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold;">${greeting}</td></tr><tr><td style="padding: 15px 0 10px 0; font-family: Arial, sans-serif;">${welcomeMsgVar}</td></tr><tr><td style="padding: 20px 0 20px 0; font-family: Arial, sans-serif;"><div align="center"><a style="background-color: #e53935; color: white; text-align: center; padding: 15px 30px; text-decoration: none;" href="${url}">${btnTextVar}</a></div></td></tr><tr><td style="padding: 0 0 0 0; font-family: Arial, sans-serif;"><p>${beforeMsgVar} <br /> ${regardVar}</p></td></tr></tbody></table></td></tr><tr><td style="padding: 0px 30px 10px 30px;" bgcolor="#ffffff"><hr /><table border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="font-family: Arial, sans-serif;">${followMsgVar}</td><td align="right"><table border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><a href="http://www.facebook.com/"> <img style="display: block;" src="https://s24.postimg.org/ddsjhe0id/facebook.png" alt="Facebook" /> </a></td><td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td><td><a href="http://www.twitter.com/"> <img style="display: block;" src="https://s30.postimg.org/68qpc9wox/twitter.png" alt="Twitter" /> </a></td><td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td><td><a href="http://www.google.com/"> <img style="display: block;" src="https://s28.postimg.org/wmdctg1cd/google.png" alt="Facebook" /> </a></td></tr></tbody></table></td></tr><tr><td style="font-family: Arial, sans-serif; padding: 10px 0 10px 0;"><a style="font-family: Arial, sans-serif; text-decoration: none; float: left;" href="https://www.iurest.com/">https://www.iurest.com</a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>
               `;
  };
}

function greetText() {
  return function (user, url) {

    checkLanguage(user);
    var greeting = (user.profile && user.profile.first_name) ? (greetVar + user.profile.first_name + ",") : greetVar;

    return `    ${greeting}
                    ${welcomeMsgVar}
                    ${url}
                    ${beforeMsgVar}
                    ${regardVar}
               `;
  }
}

Accounts.emailTemplates = {
  from: "Meteor Accounts <bot@smartosc.com>",
  siteName: Meteor.absoluteUrl().replace(/^https?:\/\//, '').replace(/\/$/, ''),
  resetPassword: {
    subject: function (user) {
        return "Reset your password on " + Accounts.emailTemplates.siteName;
    },
    html: greet(),
    text: greetText(),
  },
  verifyEmail: {
    subject: function (user) {
      return "How to verify email address on " + Accounts.emailTemplates.siteName;
    },
    text: greet()
  },
  enrollAccount: {
    subject: function (user) {
      return "An account has been created for you on " + Accounts.emailTemplates.siteName;
    },
    text: greet()
  }
};

