import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import './detailsEvent.html';
import { ThemesEvent} from '../../../api/themesEvent';
import { SubThemesEvent} from '../../../api/subThemesEvent';
import { name as DisplayNameFilter} from '../../filters/displayNameFilter';

class DetailsEvent {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.subscribe('themesEvent');
        this.subscribe('subThemesEvent');

        this.helpers({
           theme(){
               return ThemesEvent.findOne({
                   key: this.event.theme
               });
           },
            subtheme(){
                return SubThemesEvent.findOne({
                    key: this.event.subtheme,
                    theme: this.event.theme
                })
            },
            owner(){
                return Meteor.users.findOne(this.event.owner);
            }

        });

    }
    isOwner() {
        if (!this.event) {
            return false;
        }

        return this.event.owner === Meteor.userId();
    }
}

const name = 'detailsEvent';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    DisplayNameFilter
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    bindings: {
        event: '<'
    },
    controller: DetailsEvent
});
