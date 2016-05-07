import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import _ from 'underscore';

import { Meteor } from 'meteor/meteor';


import './likeButton.html';

class LikeButton {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);
    }

    isLiked(identifiant){
        if(!identifiant)
            return false;
        return _.contains(Meteor.user().profile.likes, identifiant);
    }

    like(identifiant){
        if(!identifiant)
            return false;
        Meteor.users.update(Meteor.userId(),
            {
                $push:{
                    "profile.likes": identifiant
                }
            }, (error) => {
                if (error) {
                    console.log('Oops, error on like...');
                } else {
                    console.log('Liked!');
                }
            })
    }

    dislike(identifiant){
        if(!identifiant)
            return false;
        Meteor.users.update(Meteor.userId(),
            {
                $pull:{
                    "profile.likes": identifiant
                }
            }, (error) => {
                if (error) {
                    console.log('Oops, error on dislike...');
                } else {
                    console.log('Disliked!');
                }
            })
    }
}

const name = 'likeButton';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    bindings: {
        identifiant: '<'
    },
    controller: LikeButton
});