import { Meteor } from 'meteor/meteor';

import { SubThemesService } from './collection';

if (Meteor.isServer) {
    Meteor.publish('subThemesService', function() {
        return SubThemesService.find();
    });
}
