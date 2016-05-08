import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './editEventButton.html';
import './editEventModal.html';
import { name as EditEvent } from '../editEvent/editEvent';

class EditEventButton {
  constructor($mdDialog, $mdMedia) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;

  }

  open(event, eventToEdit) {
    this.$mdDialog.show({
      controller($mdDialog) {
        'ngInject';

        this.event = eventToEdit;

        this.close = () => {
          $mdDialog.hide();
        }
      },
      controllerAs: 'editEventModal',
      templateUrl: `imports/ui/components/${name}/editEventModal.html`,
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    });
  }
}

const name = 'editEventButton';

// create a module
export default angular.module(name, [
  angularMeteor,
  EditEvent
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: EditEventButton,
  bindings: {
      event: '<'
  }
});
