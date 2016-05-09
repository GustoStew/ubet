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
            showPhone : true,
            active : true,
            creationDate: new Date()
        };

        this.helpers({

            currentUser(){
                return Meteor.user();
            },

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
        switch (this.newService.theme){
            case 'home':
                this.newService.icon = '/img/maison_themes_icon.png';
                break;
            case 'school':
                this.newService.icon = '/img/universite_themes_icon.png';
                break;
            case 'car':
                this.newService.icon = '/img/vehicule_themes_icon.png';
                break;
            case 'pet':
                this.newService.icon = '/img/animaux_themes_icon.png';
                break;
            case 'children':
                this.newService.icon = '/img/enfant_themes_icon.png';
                break;
            case 'healthcare':
                this.newService.icon = '/img/soins_themes_icon.png';
                break;
            case 'party':
                this.newService.icon = '/img/festivites_themes_icon.png';
                break;
            case 'it':
                this.newService.icon = '/img/informatique_themes_icon.png';
                break;
            default:
                break;
        }
        Services.insert(this.newService);
        this.$state.go('userServices');
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