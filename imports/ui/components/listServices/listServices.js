import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Services } from '../../../api/services';
import { ThemesService} from '../../../api/themesService';
import { SubThemesService} from '../../../api/subThemesService';


import './listServices.html';

class ListServices {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.searchText = '';

        this.theme = '';

        this.subtheme = '';

        this.subscribe('services');

        this.subscribe('themesService');

        this.subscribe('subThemesService');

        this.helpers({
            services() {
                return Services.find({
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
                return ThemesService.find();
            },
            subThemes() {
                return SubThemesService.find({
                    theme: this.getReactively('theme')
                });
            }
        });
    }
    clear() {
        this.theme = '';
        this.searchText = '';
        this.subtheme = '';
    }
}

const name = 'listServices';

// create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: ListServices
    })
    .config(config);


function config($stateProvider) {
    'ngInject';

    $stateProvider.state('listServices', {
        url: '/listServices',
        template: '<list-services></list-services>'
    });
}