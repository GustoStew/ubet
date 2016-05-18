import angular from 'angular';

// Filtre prennant un document de la collection users et renvoyant la concaténation de son nom et prénom

const name = 'displayNameFilter';

function DisplayNameFilter(user) {
    if (!user) {
        return '';
    }

    if (user.profile && user.profile.firstName && user.profile.lastName) {
        return user.profile.firstName + ' ' + user.profile.lastName;
    }

    if (user.emails) {
        return user.emails[0].address;
    }

    return user;
}

export default angular.module(name, [])
    .filter(name, () => {
        return DisplayNameFilter;
    });