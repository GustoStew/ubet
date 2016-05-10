import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Events } from '../../../api/events';
import { name as DetailsEventButton} from '../detailsEventButton/detailsEventButton';
import { name as EditEventButton} from '../editEventButton/editEventButton';

import './userEvents.html';

class UserEvents {
    constructor($scope, $reactive, $state, $mdDialog) {
        'ngInject';

        this.$state = $state;
        this.mdDialog = $mdDialog;
        $reactive(this).attach($scope);

        this.subscribe('events');

        this.helpers({
            events() {
                return Events.find({
                    owner:Meteor.userId()
                });
            }
        });
    }

    showConfirm(ev,eventId){
        var confirm = this.mdDialog.confirm().title('Êtes-vous sûr de vouloir supprimer votre événement?').textContent('Une fois supprimé, votre action est irréversible.').ariaLabel('Remove Event').targetEvent(ev).ok('Yes please !').cancel('God no !');
        this.mdDialog.show(confirm).then(function(){ Events.remove({
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
    remove(eventId){
        Events.remove({
            _id: eventId
        }, (error) => {
            if (error) {
                console.log('Oops, echec suppression..');
            } else {
                console.log('Supprimé!');
            }
        })
    }
}

const name = 'userEvents';

// create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter,
        DetailsEventButton,
        EditEventButton
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller:UserEvents
    })
    .config(config);


function config($stateProvider) {
    'ngInject';

    $stateProvider.state('userEvents', {
        url: '/userEvents',
        template: '<user-events></user-events>'
    });
}