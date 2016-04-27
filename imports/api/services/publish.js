import { Meteor } from 'meteor/meteor';

import { Services } from './collection';

if (Meteor.isServer) {
    Meteor.publish('services', function() {
        return Services.find();
    });
}
