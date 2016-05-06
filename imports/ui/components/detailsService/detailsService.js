import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import './detailsService.html';
import { Services } from '../../../api/services';
import { ThemesService} from '../../../api/themesService';
import { SubThemesService} from '../../../api/subThemesService';
import { name as RequestForm} from '../requestForm/requestForm';
import { name as RequestResponse} from '../requestResponse/requestResponse';
import { name as DisplayNameFilter} from '../../filters/displayNameFilter';


class DetailsService {
    constructor($stateParams, $scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.serviceId = $stateParams.serviceId;

        this.subscribe('services');
        this.subscribe('users');
        this.subscribe('themesService');
        this.subscribe('subThemesService');

        this.helpers({
            service() {
                return Services.findOne({
                    _id: $stateParams.serviceId
                });
            }
        });
    }

    getTheme() {
        if (!this.service) {
            return '';
        }
        return ThemesService.findOne({
            key: this.service.theme
        });
    }

    getSubTheme() {
        if (!this.service) {
            return '';
        }
        return SubThemesService.findOne({
            key : this.service.subtheme
        });
    }

    getOwner() {
        if (!this.service) {
            return '';
        }
        return Meteor.users.findOne({
            _id : this.service.owner
        });
    }

    isLoggedIn() {
        return !!Meteor.userId();
    }

    isOwner() {
        if (!this.service) {
            return false;
        }

        return this.service.owner === Meteor.userId();
    }
}

const name = 'detailsService';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    RequestForm,
    RequestResponse,
    DisplayNameFilter
]).component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: DetailsService
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('detailsService', {
        url: '/services/:serviceId',
        template: '<details-service></details-service>',
        resolve: {
            currentUser($q) {
                if (Meteor.userId() === null) {
                    return $q.reject('AUTH_REQUIRED');
                } else {
                    return $q.resolve();
                }
            }
        }
    });
}
