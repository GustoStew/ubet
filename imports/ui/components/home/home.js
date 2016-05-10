import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import { Meteor } from 'meteor/meteor';
import { Services } from '../../../api/services';
import { Events } from '../../../api/events';
import { name as DetailsEventButton} from '../detailsEventButton/detailsEventButton';
import { name as LikeButton} from '../likeButton/likeButton';

import './home.html';

class Home {
    constructor($scope, $reactive, $state) {
        'ngInject';

        $reactive(this).attach($scope);

        this.$state = $state;

        this.subscribe('services');
        this.subscribe('events');

        this.helpers({
            events() {
                return Events.find();
            },
            services() {
                return Services.find();
            },
            currentUser(){
                return Meteor.user();
            }
        });
    }
}

const name = 'home';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    ngMaterial,
    DetailsEventButton,
    LikeButton
]).component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: Home
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider.state('home', {
            url: '/home',
            template: '<home></home>',
            resolve: {
                currentUser($q) {
                    if (Meteor.userId() === null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        });
}