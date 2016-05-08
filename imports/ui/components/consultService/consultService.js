import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { ThemesService} from '../../../api/themesService';
import { SubThemesService} from '../../../api/subThemesService';
import {name as DisplayNameFilter} from '../../filters/displayNameFilter';

import './consultService.html';

class ConsultService {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.subscribe('themesService');
        this.subscribe('subThemesService');

        this.helpers({
            theme(){
                return ThemesService.findOne({
                    key: this.service.theme
                });
            },
            subtheme(){
                return SubThemesService.findOne({
                    key: this.service.subtheme,
                    theme: this.service.theme
                })
            },
            owner(){
                return Meteor.users.findOne(this.service.owner);
            }
        });
    }
}

const name = 'consultService';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    DisplayNameFilter
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    bindings: {
        service: '<'
    },
    controller: ConsultService
});