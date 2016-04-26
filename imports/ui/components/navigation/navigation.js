import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
//import ngMaterial from 'angular-material';

import './navigation.html';

class Navigation {
  constructor($scope, $reactive, $state) {
    'ngInject';

    this.$state = $state;

    $reactive(this).attach($scope);

    this.helpers({
      isLoggedIn() {
        return !!Meteor.userId();
      }
    });

  }
}

const name = 'navigation';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
//  ngMaterial
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: Navigation
});
