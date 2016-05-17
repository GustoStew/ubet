import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import './login.html';

import {name as Register} from '../register/register';

class Login {
    constructor($scope, $reactive, $state, $mdDialog) {
        'ngInject';

        this.$state = $state;
        
        this.mdDialog = $mdDialog;

        $reactive(this).attach($scope);

        this.credentials = {
            email: '',
            password: ''
        };

        this.error = '';
    }
    
    showFailure(){
        this.mdDialog.show(
            this.mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .textContent('Connexion impossible, email ou mot de passe incorrect')
                .ariaLabel('Alert Dialog Demo')
                .ok('Ok!')
        );
    }
    
    login() {
        Meteor.loginWithPassword(this.credentials.email, this.credentials.password,
            this.$bindToContext((err) => {
                if (err) {
                    console.log('Oops, unable to log in...');
                    this.showFailure();
                } else {
                    this.$state.go('home');
                }
            })
        );
    }
}

const name = 'login';

export default angular.module(name, [
        angularMeteor,
        uiRouter,
        Register
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: Login
    })
    .config(config);


function config($stateProvider) {
    'ngInject';

    $stateProvider.state('login', {
        url: '/login',
        template: '<login></login>'
    });
}

