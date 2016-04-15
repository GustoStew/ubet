/**
 * Created by gleguen on 12/04/2016.
 */

import angular from 'angular';

import { Meteor } from 'meteor/meteor';

import { name as Ubet } from '../imports/ui/components/ubet/ubet';

function onReady() {
    angular.bootstrap(document, [
        Ubet
    ], {
        strictDi: true
    });
}

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}

