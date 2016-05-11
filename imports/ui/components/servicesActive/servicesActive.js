import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Services } from '../../../api/services';
import { name as EditServiceButton} from '../editServiceButton/editServiceButton';

import './servicesActive.html';

class ServicesActive {
    constructor($scope, $reactive, $mdDialog) {
        'ngInject';

        this.mdDialog = $mdDialog;

        $reactive(this).attach($scope);

        this.subscribe('services');

        this.helpers({
            services() {
                return Services.find({
                    owner:Meteor.userId(),
                    active:true,
                    $or:[{
                        date: {
                            $exists:false
                        }
                    },{
                        date : {
                            $gte: new Date()
                        }
                    }]
                });
            }
        });
    }

    store(serviceId){
        Services.update({
            _id:serviceId
        },{
            $set: {
                active: false
            }
        }, (error) => {
            if (error) {
                console.log('Oops, echec archivage..');
            } else {
                console.log('Archivé!');
            }
        })
    }

    showConfirm(ev,serviceId){
        var confirm = this.mdDialog.confirm()
            .title('Êtes-vous sûr de vouloir supprimer votre service?')
            .textContent('Une fois supprimé, votre action est irréversible.')
            .ariaLabel('Remove Service')
            .targetEvent(ev)
            .ok('Oui !')
            .cancel('Non');
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

const name = 'servicesActive';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    EditServiceButton
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: ServicesActive
});