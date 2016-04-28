import { Meteor } from 'meteor/meteor';
import { ThemesEvent } from '../api/themesEvent';

Meteor.startup(() => {
  if (ThemesEvent.find().count() === 0) {
    const themes = [{
      'description': 'Festifs',
      'subthemes': [
        {
          'key':'gala',
          'description':'Gala / bal'
        },
        {
          'key':'bar',
          'description':'Bar / pub'
        }
      ]
    }, {
      'description': 'Sportifs',
      'subthemes': [
        {
          'key':'match',
          'description':'Matchs'
        },
        {
          'key':'training',
          'description':'Entrainement'
        }
      ]
    }];

    themes.forEach((theme) => {
      ThemesEvent.insert(theme)
    });
  }
});
