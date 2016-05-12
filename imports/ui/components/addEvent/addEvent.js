import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';

import { Meteor } from 'meteor/meteor';
import { ThemesEvent} from '../../../api/themesEvent';
import { SubThemesEvent} from '../../../api/subThemesEvent';

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

        this.subscribe('themesEvent');

        this.subscribe('subThemesEvent');

        this.newEvent = {
            active : true,
            creationDate: new Date()
        };

        this.today = new Date();

        this.helpers({
            currentUser(){
                return Meteor.user();
            },

            themes() {
                return ThemesEvent.find();
            },
            subThemes() {
                return SubThemesEvent.find({
                    theme: this.getReactively('newEvent.theme')
                });
            },
            themeSelected() {
                return ThemesEvent.findOne({
                    key: this.getReactively('newEvent.theme')
                });
            },
            subThemeSelected() {
                return SubThemesEvent.findOne({
                    key: this.getReactively('newEvent.subtheme'),
                    theme: this.getReactively('newEvent.theme')
                });
            }

        });

    }

    submit() {
        this.newEvent.owner = Meteor.user()._id;
        switch (this.newEvent.theme){
            case 'party':
                this.newEvent.icon = '/img/festifs_themes_icon.png';
                break;
            case 'sport':
                this.newEvent.icon = '/img/sportifs_themes_icon.png';
                break;
            case 'culture':
                this.newEvent.icon = '/img/culturels_themes_icon.png';
                break;
            case 'pro':
                this.newEvent.icon = '/img/professionnels_themes_icon.png';
                break;
            default:
                break;
        }
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
