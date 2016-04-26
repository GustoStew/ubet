import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
//import ngMaterial from 'angular-material';

import { Accounts } from 'meteor/accounts-base';

import './register.html';

class Register {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.credentials = {
            email: '',
            password: '',
            civility: 'Monsieur',
            campus: '1',
            lastName: '',
            firstName: '',
            phone: ''

        };

        this.error = '';
    }

    register() {
        Accounts.createUser(this.credentials,
            this.$bindToContext((err) => {
                if (err) {
                    this.error = err;
                } else {
                    this.$state.go('login');
                }
            })
        );
    }
}

const name = 'register';

// create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter
        //ngMaterial
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: Register
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider.state('register', {
        url: '/register',
        template: '<register></register>'
    });
}