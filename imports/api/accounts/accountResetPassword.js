//Defines the template that will be sent to users' email while verifying accounts

Accounts.emailTemplates.siteName = "nusOracle";
Accounts.emailTemplates.from     = "nusOracle <admin@nusOracle.com>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[nusOracle] Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        supportEmail   = "support@nusOracle.com",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${url}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;
    console.log(url);
    return emailBody;
  }
};
