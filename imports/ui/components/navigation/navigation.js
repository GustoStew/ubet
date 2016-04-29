import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './navigation.html';

import {name as Login} from '../login/login';


class Navigation {
  constructor($scope, $reactive, $state, $mdSidenav) {
    'ngInject';

    this.$state = $state;

    $reactive(this).attach($scope);

    this.showMobileMainHeader = true;

    this.$mdSidenav = $mdSidenav;

    this.helpers({
      isLoggedIn() {
        return !!Meteor.userId();
      }
    });

  }
  openSideNavPanel() {
    this.$mdSidenav('left').open();
  }
  closeSideNavPanel() {
    this.$mdSidenav('left').close();
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

const name = 'navigation';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  Login
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: Navigation
});
