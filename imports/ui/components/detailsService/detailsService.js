import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import './detailsService.html';
import { Services } from '../../../api/services';
import { Requests } from '../../../api/requests';

import { name as RequestForm} from '../requestForm/requestForm';
import { name as RequestResponse} from '../requestResponse/requestResponse';
import { name as ConsultService} from '../consultService/consultService';

class DetailsService {
    constructor($stateParams, $scope, $reactive, $state) {
        'ngInject';

        $reactive(this).attach($scope);

        this.$state = $state;

        this.serviceId = $stateParams.serviceId;

        this.subscribe('requests');
        this.subscribe('services');
        this.subscribe('users');

        this.helpers({
            service() {
                return Services.findOne({
                    _id: $stateParams.serviceId
                });
            }
        });
    }

    isOwner() {
        if (!this.service) {
            return false;
        }

        return this.service.owner === Meteor.userId();
    }

    serviceActive(){
        return this.service.active && ( !this.service.date || this.service.date >= new Date());
    }

    nbRequestsOnWait(){
        var nbRequest =  Requests.find({
            serviceId: this.service._id,
            onWait: true
        }).count();
        if(nbRequest > 1)
            return nbRequest + ' demandes';
        else if (nbRequest == 1)
            return nbRequest + ' demande';
        else
            return 'Aucune demande'
    }

    back(){
        history.back(-1);
    }
}

const name = 'detailsService';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    RequestForm,
    RequestResponse,
    ConsultService
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
