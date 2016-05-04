import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import './detailsEvent.html';
import { Events } from '../../../api/events';
import { ThemesEvent} from '../../../api/themesEvent';
import { SubThemesEvent} from '../../../api/subThemesEvent';


class DetailsEvent {
    constructor($stateParams, $scope, $reactive) {
        'ngInject';

        $scope.viewModel(this);

        this.subscribe('events');
        this.subscribe('themesEvent');
        this.subscribe('subThemesEvent');

        this.helpers({
            event() {
                return Events.findOne({
                    _id: this.eventId
                });
            }
        });
    }

    getTheme() {
        if (!this.event) {
            return '';
        }
        return ThemesEvent.findOne({
            key: this.event.theme
        });
    }

    getSubTheme() {
        if (!this.event) {
            return '';
        }
        return SubThemesEvent.findOne({
           key : this.event.subtheme
        });
    }

    getOwner() {
        if (!this.event) {
            return '';
        }
        return Meteor.users.findOne({
            _id : this.event.owner
        });
    }

    isLoggedIn() {
        return !!Meteor.userId();
    }

    isOwner() {
        if (!this.event) {
            return false;
        }

        return this.event.owner === Meteor.userId();
    }
}

const name = 'detailsEvent';

// create a module

export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    bindings: {
        event: '<'
    },
    controller: DetailsEvent
});

