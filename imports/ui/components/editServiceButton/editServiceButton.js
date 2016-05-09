import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './editServiceButton.html';
import './editServiceModal.html';
import { name as EditService } from '../editService/editService';

class EditServiceButton {
  constructor($mdDialog, $mdMedia) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;

  }

  open(event, serviceToEdit) {
    this.$mdDialog.show({
      controller($mdDialog) {
        'ngInject';

        this.service = serviceToEdit;

        this.close = () => {
          $mdDialog.hide();
        }
      },
      controllerAs: 'editServiceModal',
      templateUrl: `imports/ui/components/${name}/editServiceModal.html`,
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    });
  }
}

const name = 'editServiceButton';

// create a module
export default angular.module(name, [
  angularMeteor,
  EditService
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: EditServiceButton,
  bindings: {
      service: '<'
  }
});
