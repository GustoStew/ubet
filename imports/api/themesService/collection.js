import { Mongo } from 'meteor/mongo';

export const ThemesService = new Mongo.Collection('themesService');

ThemesService.allow({
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