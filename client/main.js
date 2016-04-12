/**
 * Created by gleguen on 12/04/2016.
 */

import angular from 'angular';

import { Meteor } from 'meteor/meteor';

// import { name as Socially } from '../imports/ui/components/socially/socially';
// hi from Michael

function onReady() {
    angular.bootstrap(document, [
        Ubet
    ], {
        strictDi: true
    });
}