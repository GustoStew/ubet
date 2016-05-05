import { Meteor } from 'meteor/meteor';

import { Requests } from './collection';

if (Meteor.isServer) {
    Meteor.publish('requests', function() {
            return Requests.find();
    });
}


