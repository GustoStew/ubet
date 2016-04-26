import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';

import { Meteor } from 'meteor/meteor';

import './addEvent.html';
import './addEventTheme.html';
import './addEventForm.html';
import './addEventResume.html';

import { Events } from '../../../api/events';


class AddEvent {
    constructor($scope, $reactive, $state) {
        'ngInject';

        $reactive(this).attach($scope);

        this.$state = $state;

        this.newEvent = {};

    }

    submit() {
        this.newEvent.owner = Meteor.user()._id;
        Events.insert(this.newEvent);
        this.$state.go('userEvents');
    }

}

const name = 'addEvent';

// create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter,
        ngAnimate
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: AddEvent
    })
    .config(config);


function config($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
        .state('addEvent', {
            url: '/addEvent',
            template: '<add-event></add-event>'
        })
        .state('addEvent.theme',{
            url: '/theme',
            templateUrl: 'imports/ui/components/addEvent/addEventTheme.html'
        })
        .state('addEvent.form',{
            url: '/form',
            templateUrl: 'imports/ui/components/addEvent/addEventForm.html'
        })
        .state('addEvent.resume', {
            url: '/resume',
            templateUrl: 'imports/ui/components/addEvent/addEventResume.html'
        });

    $urlRouterProvider.otherwise('/addEvent/theme');
}
