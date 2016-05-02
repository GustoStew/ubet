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

        this.searchText = '';

        this.themeID = '';

        this.subscribe('events', this.getReactively('themeID'));

        this.subscribe('themesEvent');

        this.helpers({
            events() {
                return Events.find({
                    $or: [
                        {
                            title: {
                                $regex: `.*${this.getReactively('searchText')}.*`,
                                $options: 'i'
                            }
                        },
                        {
                            description: {
                                $regex: `.*${this.getReactively('searchText')}.*`,
                                $options: 'i'
                            }
                        }
                    ]
                });
            },
            themes() {
                return ThemesEvent.find();
            },
            themeSelected() {
                return ThemesEvent.findOne({
                    _id: this.getReactively('themeID')
                });
            }
        });
    }
    clear() {
        this.themeID = '';
        this.searchText = '';
        this.subtheme = '';
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