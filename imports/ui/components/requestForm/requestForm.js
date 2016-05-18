import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { ThemesService} from '../../../api/themesService';
import { SubThemesService} from '../../../api/subThemesService';
import { Requests } from '../../../api/requests';


import './requestForm.html';

class RequestForm {
    constructor($scope, $reactive, $state) {
        'ngInject';

        $reactive(this).attach($scope);

        this.$state = $state;

        this.subscribe('themesService');
        this.subscribe('subThemesService');

        this.newRequest = {
            onWait: true,
            confirm: false
        };

        this.helpers({
            themes() {
                return ThemesService.find();
            },
            subThemes() {
                return SubThemesService.find({
                    theme: this.getReactively('newRequest.theme')
                });
            }
        });
    }

    submit() {
        this.newRequest.owner = Meteor.user()._id;
        this.newRequest.serviceCreator = this.service.owner;
        this.newRequest.serviceId = this.service._id;
        Requests.insert(this.newRequest);
        this.$state.go('userRequests');
    }
}

const name = 'requestForm';

export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    bindings: {
        service: '<'
    },
    controller: RequestForm
});