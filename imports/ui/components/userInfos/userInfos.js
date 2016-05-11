import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './userInfos.html';

class UserInfos {
    constructor($scope, $reactive, $mdDialog) {
        'ngInject';

        $reactive(this).attach($scope);

        this.mdDialog = $mdDialog;

        this.enableModification = false;

        this.helpers({
            currentUser(){
                return Meteor.user();
            }
        });
    }

    showSuccess(){
        this.mdDialog.show(
            this.mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .textContent('Modification Enregistrée.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Ok!')
        );
    }

    showFailure(){
        this.mdDialog.show(
            this.mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .textContent('Une erreur est survenue lors de la modification.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Ok!')
        );
    }


    modify() {
        Meteor.users.update(Meteor.userId(), {
            $set: {
                "profile.firstName": this.currentUser.profile.firstName,
                "profile.lastName": this.currentUser.profile.lastName,
                "profile.phone": this.currentUser.profile.phone,
                "profile.campus": this.currentUser.profile.campus,
                "profile.civility": this.currentUser.profile.civility
            }
        }, (error) => {
            if (error) {
                console.log('Oops, unable to update infos...');
                this.showFailure();
            } else {
                console.log('Done!');
                this.showSuccess();
                this.enableModification = false;
            }
        });
    }

    enableModif(){
        this.enableModification = true;
    }

}

const name = 'userInfos';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: UserInfos
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('infos', {
            url: '/infos',
            template: '<user-infos></user-infos>',
            resolve: {
                currentUser($q) {
                    if (Meteor.userId() === null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        });
}
