import { Mongo } from 'meteor/mongo';

export const SubThemesService = new Mongo.Collection('subThemesService');

SubThemesService.allow({
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