import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Services } from '../../../api/services';
import { name as EditServiceButton} from '../editServiceButton/editServiceButton';

import './servicesInactive.html';

class ServicesInactive {
    constructor($scope, $reactive, $mdDialog) {
        'ngInject';

        this.mdDialog = $mdDialog;

        $reactive(this).attach($scope);

        this.subscribe('services');

        this.displayInfos = true;

        this.helpers({
            services() {
                return Services.find({
                    owner:Meteor.userId(),
                    $or:[{
                        active: false
                    },{
                        $and:[{
                            date : {
                                $lt: new Date()
                            }
                        },{
                            date:{
                                $exists: true
                            }
                        }]

                    }]
                });
            }
        });
    }

    restore(service){
        if(!service){
            console.log('Oops, service undefined..');
        }
        else if(!!service.date && service.date<new Date()){
            this.alertDate();
            Services.update({
                _id:service._id
            },{
                $set: {
                    active: false
                }
            }, (error) => {
                if (error) {
                    console.log('Oops, echec modification..');
                } else {
                    console.log('Succes !');
                }
            });
        }
        else {
            Services.update({
                _id:service._id
            },{
                $set: {
                    active: true,
                    creationDate: new Date()
                }
            }, (error) => {
                if (error) {
                    console.log('Oops, echec archivage..');
                } else {
                    console.log('Restauré !');
                }
            });
        }
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

    alertDate(){
        this.mdDialog.show(
            this.mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .textContent('Attention ! Vous ne pouvez pas restaurer un service ayant une date inférieur à aujourd\'hui !')
                .ariaLabel('Alert Dialog Demo')
                .ok('Ok!')
        );
    }

    closeInfos(){
        this.displayInfos=false;
    }


}

const name = 'servicesInactive';

export default angular.module(name, [
    angularMeteor,
    uiRouter,
    EditServiceButton
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: ServicesInactive
});