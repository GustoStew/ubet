import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Services } from '../../../api/services';
import { Requests } from '../../../api/requests';
import { ThemesService } from '../../../api/themesService';
import { SubThemesService } from '../../../api/subThemesService';


import './userRequests.html';

class UserRequests {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.subscribe('services');
        this.subscribe('requests');
        this.subscribe('themesService');
        this.subscribe('subThemesService');

        this.helpers({
            services() {
                return Services.find({
                    owner:Meteor.userId()
                });
            },
            requests(){
                return Requests.find({
                    owner:Meteor.userId()
                })
            }
        });
    }

    getService(serviceId){
        return Services.findOne({
            _id: serviceId
        })
    }

    getTheme(key){
        return ThemesService.findOne({
            key:key
        })
    }

    getSubTheme(key, theme){
        return SubThemesService.findOne({
            theme: theme,
            key:key
        })
    }

    serviceExist(service){
        return service.active && ( !service.date || service.date >= new Date());
    }

    delete(requestId){
        Requests.remove({
            _id: requestId
        });
    }
}

const name = 'userRequests';

export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: UserRequests
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider.state('userRequests', {
        url: '/userRequests',
        template: '<user-requests></user-requests>'
    });
}