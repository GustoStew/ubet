import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Events } from '../../../api/events';
import { name as DetailsEventButton} from '../detailsEventButton/detailsEventButton';
import { name as EditEventButton} from '../editEventButton/editEventButton';

import './eventsInactive.html';

class EventsInactive {
    constructor($scope, $reactive, $mdDialog) {
        'ngInject';

        $reactive(this).attach($scope);

        this.mdDialog = $mdDialog;

        this.subscribe('events');

        this.displayInfos = true;

        this.helpers({
            events() {
                return Events.find({
                    owner:Meteor.userId(),
                    $or:[{
                        active: false
                    },{
                        date : {
                            $lt: new Date()
                        }
                    }]
                });
            }
        });
    }
    // Restaure l'évènement, affiche une pop-in d'alerte si l'utilisateur souhaite restaurer un évènement ayant une date antérieur à aujourd'hui
    restore(event){
        if(!event){
            console.log('Oops, événement indéfini..');
        }
        else if(event.date<new Date()){
            this.alertDate();
            Events.update({
                _id:event._id
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
            Events.update({
                _id:event._id
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

    showConfirm(ev,eventId){
        var confirm = this.mdDialog.confirm()
            .title('Êtes-vous sûr de vouloir supprimer votre événement?')
            .textContent('Une fois supprimé, votre action est irréversible.')
            .ariaLabel('Remove Event').targetEvent(ev)
            .ok('Yes please !')
            .cancel('God no !');
        this.mdDialog.show(confirm).then(function(){
            Events.remove({
                _id: eventId
            }, (error) => {
                if (error) {
                    console.log('Oops, echec suppression..');
                } else {
                    console.log('Supprimé!');
                }
            })
        },function(){});
    }

    alertDate(){
        this.mdDialog.show(
            this.mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .textContent('Attention ! Vous ne pouvez pas restaurer un événement ayant une date inférieur à aujourd\'hui !')
                .ariaLabel('Alert Dialog Demo')
                .ok('Ok!')
        );
    }

    closeInfos(){
        this.displayInfos=false;
    }
}

const name = 'eventsInactive';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    DetailsEventButton,
    EditEventButton
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: EventsInactive
});