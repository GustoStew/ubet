import { Meteor } from 'meteor/meteor';

import { ThemesEvent } from './collection';

if (Meteor.isServer) {
    Meteor.publish('themesEvent', function() {
        return ThemesEvent.find();
    });
}
