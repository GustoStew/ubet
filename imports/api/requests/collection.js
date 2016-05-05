import { Mongo } from 'meteor/mongo';

export const Requests = new Mongo.Collection('requests');

Requests.allow({
    insert(userId, event) {
        return userId && event.owner === userId;
    },
    update(userId, event, fields, modifier) {
        return true;
    },
    remove(userId, event) {
        return userId && event.owner === userId;
    }
});