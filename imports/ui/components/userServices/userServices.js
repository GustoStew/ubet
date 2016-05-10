import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Services } from '../../../api/services';
import { name as EditServiceButton} from '../editServiceButton/editServiceButton';

import './userServices.html';

class UserServices {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.subscribe('services');

        this.helpers({
            services() {
                return Services.find({
                    owner:Meteor.userId()
                });
            }
        });
    }

    remove(serviceId){
        Services.remove({
            _id: serviceId
        }, (error) => {
            if (error) {
                console.log('Oops, echec suppression..');
            } else {
                console.log('Supprimé!');
            }
        });
        Meteor.call('removeByServiceId',serviceId,
            (error) => {
                if (error) {
                    console.log('Oops, echec suppression requete!');
                } else {
                    console.log('Requete supprimée!');
                }
            }
        );
    }
}

const name = 'userServices';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    EditServiceButton
]).component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: UserServices
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider.state('userServices', {
        url: '/userServices',
        template: '<user-services></user-services>'
    });
}