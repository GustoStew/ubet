import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { SubThemesService} from '../../../api/subThemesService';

import './editService.html';

import { Services } from '../../../api/services';


class EditService {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.subscribe('subThemesService');

        this.helpers({
            subThemes() {
                return SubThemesService.find({
                    theme: this.getReactively('service.theme')
                });
            }
        });
    }

    modify() {
        Services.update(this.service._id, {
            $set: {
                subtheme: this.event.subtheme,
                date: this.event.date,
                description: this.event.description,
                zipCode: this.event.zipCode,
                city: this.event.city,
                title: this.event.title
            }
        }, (error) => {
            if (error) {
                console.log('Oops, unable to update event infos...');
            } else {
                console.log('Done!');
            }
        });
        if(this.done)
            this.done();
    }

}

const name = 'editService';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    bindings: {
        done: '&?',
        service: '<'
    },
    controller: EditService
});
