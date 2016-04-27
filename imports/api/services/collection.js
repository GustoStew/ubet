import { Mongo } from 'meteor/mongo';

export const Services = new Mongo.Collection('services');

Services.allow({
    insert(userId, service) {
        return userId && service.owner === userId;
    },
    update(userId, service, fields, modifier) {
        return userId && service.owner === userId;
    },
    remove(userId, service) {
        return userId && service.owner === userId;
    }
});