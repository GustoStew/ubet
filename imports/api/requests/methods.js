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
    },{
        multi:true
    }, (error) => {
        if (error) {
            console.log('Oops, pas d annulation...');
        } else {
            console.log('Done!');
        }
    });

}

export function removeByServiceId(serviceId){
    check(serviceId, String);

    Requests.remove({
        serviceId:serviceId
    }, (error) => {
        if (error) {
            console.log('Oops, echec suppression requete...');
        } else {
            console.log('Requete supprimé!');
        }
    })

}

Meteor.methods({
    accept,
    removeByServiceId
});
