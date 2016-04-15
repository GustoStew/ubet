import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
//import ngMdIcons from 'angular-material-icons';

import './ubet.html';
import { name as Auth } from '../auth/auth';
import { name as Navigation } from '../navigation/navigation';
import { name as UserInfos } from '../userInfos/userInfos';
class Ubet {}

const name = 'ubet';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    Auth,
    Navigation,
    UserInfos,
    //ngMdIcons,
    'accounts.ui'
]).component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: Ubet
    })
    .config(config)
    .run(run);

function config($locationProvider, $urlRouterProvider) {
    'ngInject';

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('login');
}

function run($rootScope, $state) {
    'ngInject';

    $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => {
            if (error === 'AUTH_REQUIRED') {
                $state.go('login');
            }
        }
    );
}

