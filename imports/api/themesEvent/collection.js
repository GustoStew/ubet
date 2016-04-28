import { Mongo } from 'meteor/mongo';

export const ThemesEvent = new Mongo.Collection('themesEvent');

ThemesEvent.allow({
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