import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Events } from '../../../api/events';
import { name as DetailsEventButton} from '../detailsEventButton/detailsEventButton';
import { name as LikedEventsFilter} from '../../filters/likedEventsFilter';
import { name as LikeButton } from '../likeButton/likeButton';

import './userLikes.html';

class UserLikes {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.subscribe('events');

        this.helpers({
            events() {
                return Events.find({});
            },
            currentUser(){
                return Meteor.user();
            }
        });
    }
}

const name = 'userLikes';

export default angular.module(name, [
        angularMeteor,
        uiRouter,
        DetailsEventButton,
        LikedEventsFilter,
        LikeButton
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller:UserLikes
    })
    .config(config);


function config($stateProvider) {
    'ngInject';

    $stateProvider.state('userLikes', {
        url: '/userLikes',
        template: '<user-likes></user-likes>'
    });
}