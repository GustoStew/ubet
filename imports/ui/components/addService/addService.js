import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';

import { Meteor } from 'meteor/meteor';
import { ThemesService} from '../../../api/themesService';
import { SubThemesService} from '../../../api/subThemesService';


import './addService.html';
import './addServiceForm.html';
import './addServiceResume.html';
import './addServiceTheme.html';

import { Services } from '../../../api/services';

class AddService {
    constructor($scope, $reactive, $state) {
        'ngInject';

        $reactive(this).attach($scope);

        this.$state = $state;

        this.subscribe('themesService');
        this.subscribe('subThemesService');

        this.newService = {
            date: new Date()
        };

        this.helpers({
            themes() {
                return ThemesService.find();
            },
            subThemes() {
                return SubThemesService.find({
                    theme: this.getReactively('newService.theme')
                });
            },
            themeSelected() {
                return ThemesService.findOne({
                    key: this.getReactively('newService.theme')
                });
            },
            subThemeSelected() {
                return SubThemesService.findOne({
                    key: this.getReactively('newService.subtheme'),
                    theme: this.getReactively('newService.theme')
                });
            }
        });

    }

    submit() {
        this.newService.owner = Meteor.user()._id;
        Services.insert(this.newService);
        this.reset();
        this.$state.go('userServices');
    }

    reset() {
        this.service = {};
    }
}

const name = 'addService';

// create a module
export default angular.module(name, [
         angularMeteor,
         uiRouter,
          ngAnimate
    ]).component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: AddService
    })
    .config(config);

function config($stateProvider, $urlRouterProvider) {
    'ngInject';
    $stateProvider
        .state('addService', {
            url: '/addService',
            template: '<add-service></add-service>'
        })
        .state('addService.theme',{
            url: '/theme',
            templateUrl: 'imports/ui/components/addService/addServiceTheme.html'
        })
        .state('addService.form',{
            url: '/form',
            templateUrl: 'imports/ui/components/addService/addServiceForm.html'
        })
        .state('addService.resume', {
            url: '/resume',
            templateUrl: 'imports/ui/components/addService/addServiceResume.html'
        });

    $urlRouterProvider.otherwise('/addService/theme');

}