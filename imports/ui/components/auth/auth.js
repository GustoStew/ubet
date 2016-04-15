import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import './auth.html';
import {name as Login} from '../login/login';


const name = 'auth';

class Auth {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.helpers({
            isLoggedIn() {
                return !!Meteor.userId();
            },
            currentUser() {
                return Meteor.user();
            }
        });

        this.error = '';
    }

    logout() {
        Meteor.logout(this.$bindToContext((err) => {
            if (err) {
                this.error = err;
            } else {
                this.$state.go('login');
            }
        }));
    }
}

// create a module
export default angular.module(name, [
    angularMeteor,
    Login
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: Auth
});