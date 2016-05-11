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
    restore(eventId){
        Events.update({
            _id:eventId
        },{
            $set: {
                active: true
            }
        }, (error) => {
            if (error) {
                console.log('Oops, echec archivage..');
            } else {
                console.log('Archivé!');
            }
        })
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