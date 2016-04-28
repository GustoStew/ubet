import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Events } from '../../../api/events';
import { ThemesEvent} from '../../../api/themesEvent';

import './listEvents.html';

class ListEvents {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.subscribe('events');
        this.subscribe('themesEvent')

        this.helpers({
            events() {
                return Events.find();
            },
            themes() {
                return ThemesEvent.find();
            }
        });
    }
}

const name = 'listEvents';

// create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: ListEvents
    })
    .config(config);


function config($stateProvider) {
    'ngInject';

    $stateProvider.state('listEvents', {
        url: '/listEvents',
        template: '<list-events></list-events>'
    });
}