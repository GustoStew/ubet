import { Meteor } from 'meteor/meteor';

import { SubThemesEvent } from './collection';

if (Meteor.isServer) {
    Meteor.publish('subThemesEvent', function() {
        return SubThemesEvent.find();
    });
}
