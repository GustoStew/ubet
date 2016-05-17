Accounts.onCreateUser(function(options, user) {
    user.profile = options.profile || {};

    user.profile.firstName = options.firstName;
    user.profile.lastName = options.lastName;
    user.profile.phone = options.phone;
    user.profile.campus = options.campus;
    user.profile.civility = options.civility;

    return user;
});