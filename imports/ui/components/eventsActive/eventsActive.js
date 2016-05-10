import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Events } from '../../../api/events';
import { name as DetailsEventButton} from '../detailsEventButton/detailsEventButton';
import { name as EditEventButton} from '../editEventButton/editEventButton';

import './eventsActive.html';

class EventsActive {
    constructor($scope, $reactive, $mdDialog) {
        'ngInject';

        $reactive(this).attach($scope);

        this.mdDialog = $mdDialog;

        this.subscribe('events');

        this.helpers({
            events() {
                return Events.find({
                    owner:Meteor.userId(),
                    active: true,
                    date : {
                        $gte: new Date()
                    }
                });
            }
        });
    }

    store(eventId){
        Events.update({
            _id:eventId
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
}

const name = 'eventsActive';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    DetailsEventButton,
    EditEventButton
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: EventsActive
});