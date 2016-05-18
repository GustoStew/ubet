import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './detailsEventButton.html';
import './detailsEventModal.html';
import { name as DetailsEvent } from '../detailsEvent/detailsEvent';

class DetailsEventButton {
  constructor($mdDialog, $mdMedia) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;

  }

  // Fonction ouvrant la pop-in contenant le composant detailsEvent
  open(event, eventToDisplay) {
    this.$mdDialog.show({
      controller($mdDialog) {
        'ngInject';

        this.event = eventToDisplay;

        this.close = () => {
          $mdDialog.hide();
        }
      },
      controllerAs: 'detailsEventModal',
      templateUrl: `imports/ui/components/${name}/detailsEventModal.html`,
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    });
  }
}

const name = 'detailsEventButton';

export default angular.module(name, [
  angularMeteor,
  DetailsEvent
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: DetailsEventButton,
  bindings: {
      event: '<'
  }
});
