import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Requests } from './collection';

export function accept(serviceId, requestId, ownerRequestId) {
    check(serviceId, String);
    check(requestId, String);
    check(ownerRequestId, String);

    Requests.update({
        _id: requestId
    }, {
        $set: {
            confirm: true,
            onWait: false
        }
    }, (error) => {
        if (error) {
            console.log('Oops, pas de validation..');
        } else {
            console.log('Done!');
        }
    });
    Requests.update({
        serviceId: serviceId,
        onWait: true
    }, {
        $set: {
            confirm: false,
            onWait: false
        }
    }, (error) => {
        if (error) {
            console.log('Oops, pas d annulation...');
        } else {
            console.log('Done!');
        }
    });

}

Meteor.methods({
    accept
});
