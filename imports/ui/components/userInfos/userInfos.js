import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './userInfos.html';

class UserInfos {
    constructor($scope, $reactive, $mdDialog) {
        'ngInject';

        $reactive(this).attach($scope);

        // this.subscribe('userData');
        this.mdDialog = $mdDialog;

        this.helpers({
            currentUser(){
                return Meteor.user();
            },

            enableModification (){
                return false;
            },

            modifSuccess(){
                return false;
            }


        });
    }

    show(){

        this.mdDialog.show(
            this.mdDialog.alert().parent(angular.element(document.querySelector('#popupContainer'))).clickOutsideToClose(true).textContent('Modification Enregistré.').ariaLabel('Alert Dialog Demo').ok('Ok!')
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
            } else {
                console.log('Done!');
                this.enableModification = false;
                this.modifSuccess = true;
            }
        });
    }

    enableModif(){
        this.enableModification = true;
        this.modifSuccess = false;
    }

    resetSuccess(){
        this.modifSuccess = false;
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
