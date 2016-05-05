import angular from 'angular';

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

// create a module
export default angular.module(name, [])
    .filter(name, () => {
        return DisplayNameFilter;
    });