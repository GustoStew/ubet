import { Mongo } from 'meteor/mongo';

export const SubThemesEvent = new Mongo.Collection('subThemesEvent');

SubThemesEvent.allow({
    insert() {
        return false;
    },
    update() {
        return false;
    },
    remove() {
        return false;
    }
});