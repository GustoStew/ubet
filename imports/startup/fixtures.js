import { Meteor } from 'meteor/meteor';
import { ThemesEvent } from '../api/themesEvent';
import { ThemesService } from '../api/themesService';

Meteor.startup(() => {
  if (ThemesEvent.find().count() === 0) {
    const themesEvent = [{
      'description': 'Festifs',
      'icon': '/img/festifs_themes_icon.png',
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
      'icon': '/img/sportifs_themes_icon.png',
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
        'icon': '/img/culturels_themes_icon.png',
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
        'icon': '/img/professionnels_themes_icon.png',
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

    themesEvent.forEach((theme) => {
      ThemesEvent.insert(theme)
    });
  }


  if (ThemesService.find().count() === 0) {
    const themesService = [{
      'description': 'Maison',
      'icon': '/img/maison_themes_icon.png',
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
      'icon': '/img/universite_themes_icon.png',
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
        'icon': '/img/vehicule_themes_icon.png',
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
        'icon': '/img/animaux_themes_icon.png',
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
        'icon': '/img/enfant_themes_icon.png',
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
        'icon': '/img/soins_themes_icon.png',
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
        'icon': '/img/festivites_themes_icon.png',
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
        'icon': '/img/informatique_themes_icon.png',
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

    themesService.forEach((theme) => {
      ThemesService.insert(theme)
    });
  }

});
