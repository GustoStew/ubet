import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Services } from '../../../api/services';
import { name as EditServiceButton} from '../editServiceButton/editServiceButton';

import './userServices.html';

class UserServices {
    constructor($scope, $reactive, $state, $mdDialog) {
        'ngInject';

        this.$state = $state;

        this.mdDialog = $mdDialog;

        $reactive(this).attach($scope);

        this.subscribe('services');

        this.helpers({
            services() {
                return Services.find({
                    owner:Meteor.userId()
                });
            }
        });
        this.topDirections = ['left', 'up'];
        this.bottomDirections = ['down', 'right'];
        this.isOpen = false;
        this.availableModes = ['md-fling', 'md-scale'];
        this.selectedMode = 'md-scale';
        this.availableDirections = ['up', 'down', 'left', 'right'];
        this.selectedDirection = 'left';
        this.hover = false;
    }

    showConfirm(ev,serviceId){
        var confirm = this.mdDialog.confirm().title('Êtes-vous sûr de vouloir supprimer votre service?').textContent('Une fois supprimé, votre action est irréversible.').ariaLabel('Remove Service').targetEvent(ev).ok('Yup !').cancel('My bad ');
        this.mdDialog.show(confirm).then(function(){ Services.remove({
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
            );},function(){});
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