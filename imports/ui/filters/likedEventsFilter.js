import angular from 'angular';
import _ from 'underscore';

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
