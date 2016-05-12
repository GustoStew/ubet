import {Meteor} from 'meteor/meteor';
import {ThemesEvent} from '../api/themesEvent';
import {SubThemesEvent} from '../api/subThemesEvent';
import {ThemesService} from '../api/themesService';
import {SubThemesService} from '../api/subThemesService';
import {Events} from '../api/events';



Meteor.startup(() => {
/*    if (Events.find().count() === 0) {
        const events = [
            {
                "active": true,
                "creationDate": "2016-05-10T22:00:00.000Z",
                "theme": "culture",
                "subtheme": "art",
                "address": "Halle des sports, allée Pierre de Coubertin",
                "zipCode": 33400,
                "city": "Talence",
                "title": "Roller Derby : Triple Header",
                "date": "2016-05-22T22:00:00.000Z",
                "description": "Le Roller Derby Bordeaux Men organise un triple header le 22 mai 2016 à la Halle des Sports de Talence. Nous aurons le plaisir d’accueillir les Trackass, l’équipe de valeureux skaters venus de Tours, Le Mans et Bourges, ainsi que les Madriders, qui se déplaceront spécialement depuis Madrid à cette occasion.",
                "owner": "moehc9sq54E4pqKC8",
                "icon": "/img/culturels_themes_icon.png",
                "image": "https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/12936549_681510831952122_2067431148304474574_n.jpg?oh=28ba47fd9be4afdd85036331375cd8ee&oe=57AEBB5E"
            }
        ];

        events.forEach((event) => {
            Events.insert(event)
        });
    }*/

    if (ThemesEvent.find().count() === 0) {
        const themesEvent = [
            {
                'key': 'party',
                'description': 'Festifs',
                'icon': '/img/festifs_themes_icon.png'
            }, {
                'key': 'sport',
                'description': 'Sportifs',
                'icon': '/img/sportifs_themes_icon.png'
            }, {
                'key': 'culture',
                'description': 'Culturels',
                'icon': '/img/culturels_themes_icon.png'
            }, {
                'key': 'pro',
                'description': 'Professionels',
                'icon': '/img/professionnels_themes_icon.png'
            }
        ];

        themesEvent.forEach((theme) => {
            ThemesEvent.insert(theme)
        });
    }

    if (SubThemesEvent.find().count() === 0) {
        const subThemesEvent = [
            {
                'theme': 'party',
                'key': 'gala',
                'description': 'Gala / bal'
            }, {
                'theme': 'party',
                'key': 'bar',
                'description': 'Bar / pub'
            }, {
                'theme': 'party',
                'key': 'concert',
                'description': 'Concerts / Spectacles'
            }, {
                'theme': 'sport',
                'key': 'match',
                'description': 'Matchs'
            }, {
                'theme': 'sport',
                'key': 'training',
                'description': 'Entrainement'
            }, {
                'theme': 'culture',
                'key': 'fair',
                'description': 'Salons / Expositions / Foires...'
            }, {
                'theme': 'culture',
                'key': 'art',
                'description': 'Théatre / Cinéma / Danse...'
            }, {
                'theme': 'pro',
                'key': 'seminar',
                'description': 'Journée entreprise / Séminaires / Conférences '
            }, {
                'theme': 'pro',
                'key': 'debate',
                'description': 'Débats / Tables rondes...'
            }
        ];

        subThemesEvent.forEach((theme) => {
            SubThemesEvent.insert(theme)
        });
    }


    if (ThemesService.find().count() === 0) {
        const themesService = [{
            'key': 'home',
            'description': 'Maison',
            'icon': '/img/maison_themes_icon.png'
        }, {
            'key': 'school',
            'description': 'Université',
            'icon': '/img/universite_themes_icon.png'
        }, {
            'key': 'car',
            'description': 'Véhicule',
            'icon': '/img/vehicule_themes_icon.png'
        }, {
            'key': 'pet',
            'description': 'Animaux',
            'icon': '/img/animaux_themes_icon.png'
        }, {
            'key': 'children',
            'description': 'Enfant',
            'icon': '/img/enfant_themes_icon.png'
        }, {
            'key': 'healthcare',
            'description': 'Bien-être',
            'icon': '/img/bien-etre_themes_icon.png'
        }, {
            'key': 'party',
            'description': 'Festivités',
            'icon': '/img/festivites_themes_icon.png'
        }, {
            'key': 'it',
            'description': 'Informatique',
            'icon': '/img/informatique_themes_icon.png'
        }
        ];

        themesService.forEach((theme) => {
            ThemesService.insert(theme)
        });
    }

    if (SubThemesService.find().count() === 0) {
        const subThemesService = [
            {
                'theme': 'home',
                'key': 'chore',
                'description': 'Aide-ménagère (Repassage, Nettoyage...)'
            },
            {
                'theme': 'home',
                'key': 'dyi',
                'description': 'Bricolage (Réparations, Monter un meuble en kit…)'
            },
            {
                'theme': 'home',
                'key': 'shopping',
                'description': 'Courses'
            },
            {
                'theme': 'home',
                'key': 'decoration',
                'description': 'Décoration'
            },
            {
                'theme': 'home',
                'key': 'move',
                'description': 'Déménagement'
            },
            {
                'theme': 'home',
                'key': 'maintenance',
                'description': 'Travaux et entretien (Peinture, plomberie, jardinage….)'
            }, {
                'theme': 'school',
                'key': 'tutoring',
                'description': 'Tutorat'
            },
            {
                'theme': 'school',
                'key': 'privateLessons',
                'description': 'Cours particuliers (Musique, langues...)'
            }, {
                'theme': 'school',
                'key': 'coaching',
                'description': 'Coaching (Rédiger CV, conseils entretien...)'
            }, {
                'theme': 'car',
                'key': 'carpooling',
                'description': 'Covoiturage'
            }, {
                'theme': 'car',
                'key': 'cleaning',
                'description': 'Nettoyage'
            }, {
                'theme': 'car',
                'key': 'repairing',
                'description': 'Réparations (Changement de pièces, Vidange …)'
            }, {
                'theme': 'pet',
                'key': 'keeping',
                'description': 'Garde d’animaux'
            }, {
                'theme': 'pet',
                'key': 'walking',
                'description': 'Promenade d’animaux'
            }, {
                'theme': 'pet',
                'key': 'grooming',
                'description': 'Toilettage (Lavage, Soins, Coiffure…)'
            }, {
                'theme': 'children',
                'key': 'keeping',
                'description': 'Garde d’enfants'
            }, {
                'theme': 'children',
                'key': 'school',
                'description': 'Accompagnements école'
            }, {
                'theme': 'healthcare',
                'key': 'coaching',
                'description': 'Coaching (Cuisine, Sport..)'
            }, {
                'theme': 'healthcare',
                'key': 'beauty',
                'description': 'Soins beauté (Massage, coiffure, maquillage…)'
            }, {
                'theme': 'party',
                'key': 'Assistance',
                'description': 'Aide à la préparation'
            }, {
                'theme': 'party',
                'key': 'musicalEntertainmenet',
                'description': 'Animation musicale'
            }, {
                'theme': 'it',
                'key': 'problemResolution',
                'description': 'Résolution de problèmes (formatage…)'
            }, {
                'theme': 'it',
                'key': 'office',
                'description': 'Bureautique (Rédaction mémoire…)'
            }

        ];

        subThemesService.forEach((theme) => {
            SubThemesService.insert(theme)
        });
    }

});
