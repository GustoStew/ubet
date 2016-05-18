// La gestion des utilisateurs se fait grâce à Meteor, qui fournit l'API Accounts
// La fonction ci-dessous permet de renseigner les informations de l'utilisateur lors de sa création

Accounts.onCreateUser(function(options, user) {
    user.profile = options.profile || {};

    user.profile.firstName = options.firstName;
    user.profile.lastName = options.lastName;
    user.profile.phone = options.phone;
    user.profile.campus = options.campus;
    user.profile.civility = options.civility;

    return user;
});