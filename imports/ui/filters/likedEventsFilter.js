import angular from 'angular';
import _ from 'underscore';

// Filtre prennant une liste de documents de la collection events et renvoie uniquement ceux que l'utilisateur (paramètre user) a aimé

const name = 'likedEventsFilter';

function LikedEventsFilter(events, user) {
    if (!user) {
        return false;
    }

    return events.filter((event) => {
        return _.contains(user.profile.likes, event._id) && event.active && event.date >= new Date();
    });
}

export default angular.module(name, [])
    .filter(name, () => {
        return LikedEventsFilter;
    });
