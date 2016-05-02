import { Meteor } from 'meteor/meteor';
import { ThemesEvent } from '../api/themesEvent';
import { ThemesService } from '../api/themesService';

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
        },
          {
              'key':'concert',
              'description':'Concerts / Spectacles'
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
    }, {
        'description': 'Culturels',
        'subthemes': [
            {
                'key':'fair',
                'description':'Salons / Expositions / Foires...'
            },
            {
                'key':'art',
                'description':'Théatre / Cinéma / Danse...'
            }
        ]
    }, {
        'description': 'Professionels',
        'subthemes': [
            {
                'key':'seminar',
                'description':'Journée entreprise / Séminaires / Conférences '
            },
            {
                'key':'debate',
                'description':'Débats / Tables rondes...'
            }
        ]
    }
    ];

    themes.forEach((theme) => {
      ThemesEvent.insert(theme)
    });
  }


  if (ThemesService.find().count() === 0) {
    const themes = [{
      'description': 'Maison',
      'subthemes': [
        {
          'key':'chore',
          'description':'Aide-ménagère (Repassage, Nettoyage...)'
        },
        {
          'key':'dyi',
          'description':'Bricolage (Réparations, Monter un meuble en kit…)'
        },
        {
          'key':'shopping',
          'description':'Courses'
        },
          {
              'key':'decoration',
              'description':'Décoration'
          },
          {
              'key':'move',
              'description':'Déménagement'
          },
          {
              'key':'maintenance',
              'description':'Travaux et entretien (Peinture, plomberie, jardinage….)'
          }
      ]
    }, {
      'description': 'Université',
      'subthemes': [
        {
          'key':'tutoring',
          'description':'Tutorat'
        },
        {
          'key':'privateLessons',
          'description':'Cours particuliers (Musique, langues...)'
        },
          {
              'key':'coaching',
              'description':'Coaching (Rédiger CV, conseils entretien...)'
          }
      ]
    }, {
        'description': 'Véhicule',
        'subthemes': [
            {
                'key':'carpooling',
                'description':'covoiturage'
            },
            {
                'key':'cleaning',
                'description':'Nettoyage'
            },
            {
                'key':'repairing',
                'description':'Réparations (Changement de pièces, Vidange …)'
            }
        ]
    }, {
        'description': 'Animaux',
        'subthemes': [
            {
                'key':'keeping',
                'description':'Garde d’animaux'
            },
            {
                'key':'walking',
                'description':'Promenade d’animaux'
            },
            {
                'key':'grooming',
                'description':'Toilettage (Lavage, Soins, Coiffure…)'
            }
        ]
    }, {
        'description': 'Enfant',
        'subthemes': [
            {
                'key':'keeping',
                'description':'Garde d’enfants'
            },
            {
                'key':'school',
                'description':'Accompagnements école'
            }
        ]
    }, {
        'description': 'Soins',
        'subthemes': [
            {
                'key':'coaching',
                'description':'Coaching (Cuisine, Sport..)'
            },
            {
                'key':'beauty',
                'description':'Soins beauté (Massage, coiffure, maquillage…)'
            }
        ]
    }, {
        'description': 'Festivités',
        'subthemes': [
            {
                'key':'Assistance',
                'description':'Aide à la préparation'
            },
            {
                'key':'musicalEntertainmenet',
                'description':'Animation musicale'
            }
        ]
    }, {
        'description': 'Informatique',
        'subthemes': [
            {
                'key':'problemResolution',
                'description':'Résolution de problèmes (formatage…)'
            },
            {
                'key':'office',
                'description':'Bureautique (Rédaction mémoire…)'
            }
        ]
    }
    ];

    themes.forEach((theme) => {
      ThemesService.insert(theme)
    });
  }

});
