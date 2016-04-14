import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './userInfos.html';

class UserInfos {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.subscribe('userData');

        this.helpers({

        });
    }

}

const name = 'userInfos';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: UserInfos
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('infos', {
            url: '/infos',
            template: '<user-infos></user-infos>'
        });
}
