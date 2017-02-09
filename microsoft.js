Accounts.oauth.registerService('microsoft');

if (Meteor.isClient) {
    /**
     * Meteor.loginWithMicrosoft(options, callback)
     *
     * This method is used on the client side to summon the Microsoft login page
     * just like you would with any other accounts package. It utilizes the
     * Accounts Base package.
     *
     * @param options
     * @param callback
     */
    Meteor.loginWithMicrosoft = function(options, callback) {
        // support a callback without options
        if (! callback && typeof options === "function") {
            callback = options;
            options = null;
        }

        if (typeof Accounts._options.restrictCreationByEmailDomain === 'string') {
            options = _.extend({}, options || {});
            options.loginUrlParameters = _.extend({}, options.loginUrlParameters || {});
            options.loginUrlParameters.hd = Accounts._options.restrictCreationByEmailDomain;
        }

        var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
        Microsoft.requestCredential(options, credentialRequestCompleteCallback);
    };
} else {
    /**
     If autopublish is on, publish these user fields. Login service
     packages (eg accounts-google). Notably, this isn't implemented with
     multiple publishes since DDP only merges only across top-level
     fields, not subfields (such as 'services.microsoft.accessToken')
    */
    Accounts.addAutopublishFields({

        forLoggedInUser: _.map(
            // publish access token since it can be used from the client
            Microsoft.whitelistedFields.concat(['accessToken', 'expiresAt']), // don't publish refresh token
            function (subfield) { return 'services.microsoft.' + subfield; }),

        forOtherUsers: _.map(
            // even with autopublish, no legitimate web app should be
            // publishing all users' emails
            _.without(Microsoft.whitelistedFields, 'emails'),
            function (subfield) { return 'services.microsoft.' + subfield; })
    });
}