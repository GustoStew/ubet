import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Events } from '../../../api/events';

import './userEvents.html';

class UserEvents {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.subscribe('events');

        this.helpers({
            events() {
                return Events.find({
                    owner:Meteor.userId()
                });
            }
        });
    }
}

const name = 'userEvents';

// create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller:UserEvents
    })
    .config(config);


function config($stateProvider) {
    'ngInject';

    $stateProvider.state('userEvents', {
        url: '/userEvents',
        template: '<user-events></user-events>'
    });
}