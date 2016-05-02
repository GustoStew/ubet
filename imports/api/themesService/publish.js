import { Meteor } from 'meteor/meteor';

import { ThemesService } from './collection';

if (Meteor.isServer) {
    Meteor.publish('themesService', function() {
        return ThemesService.find();
    });
}
