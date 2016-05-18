import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { ThemesService} from '../../../api/themesService';
import { SubThemesService} from '../../../api/subThemesService';
import { Requests } from '../../../api/requests';
import { name as DisplayNameFilter } from '../../filters/displayNameFilter';

import './requestResponse.html';

class RequestResponse {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.subscribe('requests');

        this.helpers({
            requests(){
                return Requests.find({
                    serviceCreator:Meteor.userId()
                })
            }
        });
    }
    getRequestOwner(userId) {
        if(!userId){
            return  '';
        }
        return Meteor.users.findOne(userId) || 'Inconnu';
    }

    getTheme(key){
        return ThemesService.findOne({
            key:key
        })
    }

    getSubTheme(key, theme){
        return SubThemesService.findOne({
            theme: theme,
            key:key
        })
    }

    accept(serviceId, requestId, ownerRequestId){
        Meteor.call('accept',serviceId, requestId, ownerRequestId,
            (error) => {
                if (error) {
                    console.log('Oops, erreur lors de l acceptation!');
                } else {
                    console.log('Accepté!');
                }
            }
        );
    }
    
    decline(requestId){
        Requests.update({
            _id: requestId
        }, {
            $set: {
                confirm: false,
                onWait: false
            }
        }, (error) => {
            if (error) {
                console.log('Oops, pas d annulation..');
            } else {
                console.log('Succes!');
            }
        });
    }
}

const name = 'requestResponse';

export default angular.module(name, [
    angularMeteor,
    uiRouter,
    DisplayNameFilter
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    bindings: {
        service: '<'
    },
    controller: RequestResponse
});