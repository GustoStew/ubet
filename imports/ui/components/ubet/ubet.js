import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import './ubet.html';
import { name as Navigation } from '../navigation/navigation';
import { name as UserInfos } from '../userInfos/userInfos';
import { name as UserEvents} from '../userEvents/userEvents';
import { name as Register} from '../register/register';
import { name as AddEvent} from '../addEvent/addEvent';
import { name as Home} from '../home/home';
import { name as UserServices } from '../userServices/userServices';
import { name as AddService } from '../addService/addService';
import { name as ListEvents} from '../listEvents/listEvents';
import { name as ListServices} from '../listServices/listServices';
import { name as DetailsService} from '../detailsService/detailsService';
import { name as DetailsEvent} from '../detailsEvent/detailsEvent';

class Ubet {}

const name = 'ubet';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    Navigation,
    UserInfos,
    UserEvents,
    Register,
    AddEvent,
    Home,
    UserServices,
    AddService,
    ListEvents,
    ListServices,
    ngMaterial,
    DetailsEvent,
    DetailsService,
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

    $urlRouterProvider.otherwise('/home');
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
