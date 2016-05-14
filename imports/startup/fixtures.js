import {Meteor} from 'meteor/meteor';
import {ThemesEvent} from '../api/themesEvent';
import {SubThemesEvent} from '../api/subThemesEvent';
import {ThemesService} from '../api/themesService';
import {SubThemesService} from '../api/subThemesService';
import {Events} from '../api/events';
import {Services} from '../api/services';



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
            },
              {
                "active": true,
                "creationDate": "2015-12-18T22:00:00.000Z",
                "theme": "culture",
                "subtheme": "fair",
                "address": "Aquitaine Cap Métiers Centre régional Vincent Merle 102 Avenue de Canéjan",
                "zipCode": 33610,
                "city": "Pessac",
                "title": "Exposition interactive de découverte des métiers Transformation Les métiers des industries agroalimentaires",
                "date": "2016-06-18T22:00:00.000Z",
                "description": "Les objectifs de l'exposition sont: l'exploration des métiers, la connaissance des formations associées, la découverte des emplois que le secteur des industries agroalimentaires offre en Aquitaine. La durée d'une exposition est de 2 heures.L'exposition concerne tout public, scolaire, personne en reconversion professionnelle ou en recherche d'emploi.",
                "owner": "moehc9sq54E4pqKC8",
                "icon": "/img/festifs_themes_icon.png",
                "image": "http://www.aquitaine-cap-metiers.fr/image/image_gallery?uuid=a016d33d-3262-4037-8092-27f30460386b&groupId=103412&t=1392307573356"
            },
            {
                "active": true,
                "creationDate": "2016-05-9T22:00:00.000Z",
                "theme": "pro",
                "subtheme": "seminar",
                "address": "351 Avenue de la Libération",
                "zipCode": 33400,
                "city": "Talence",
                "title": "Journée Entreprises Miage",
                "date": "2016-06-9T22:00:00.000Z",
                "description":"Comme chaque année, la Journée Entreprises est organisée pour tous les étudiants de MIAGe (Licence 3, Master 1, Master 2) et pour les Master Informatique (Master 1, Master 2). Cette journée est l'occasion de découvrir des entreprises, des métiers et d'échanger avec des professionnels.",
                "owner": "moehc9sq54E4pqKC8",
                "icon": "/img/professionnels_themes_icon.png",
                "image": "https://www.facebook.com/photo.php?fbid=10152008617519450&set=oa.709674575711429&type=3"
            },
            {
                "active": true,
                "creationDate": "2015-05-T22:00:00.000Z",
                "theme": "party",
                "subtheme": "gala",
                "address": "2041 avenue de Bordeaux",
                "zipCode": 33127 ,
                "city": "Saint-Jean-d'Illac",
                "title": "Gala Miage Bordeaux",
                "date": "2016-06-17T22:00:00.000Z",
                "description":"Le Gala MIAGE Bordeaux, pour sa huitième Edition, se déroulera le vendredi 17 Juin 2016, à partir de 19h, à La Provençale. Les précédentes éditions ont permis de rassembler près de 400 étudiants, anciens miagistes, enseignants et partenaires. Cette année, rejoigniez-nous pour une soirée de folie sur le thème des Mille et une Nuits !",
                "owner": "moehc9sq54E4pqKC8",
                "icon": "/img/culturels_themes_icon.png",
                "image": "http://gala.miagebordeaux.fr//images/banner.jpg"
               },
            {
                "active": true,
                "creationDate": "2016-05-10T22:00:00.000Z",
                "theme": "pro",
                "subtheme": "seminar",
                "address": "Campus de Talence, amphi Poincaré A22",
                "zipCode": 33400,
                "city": "Talence",
                "title": "Conférence grand public",
                "date": "2016-05-28T22:00:00.000Z",
                "description": "Première détection d'ondes gravitationnelles. David Smith présentera le mécanisme générant ces ondes gravitationnelles et le principe de leur détection. Ces observations annoncent la naissance d'une nouvelle astronomie et rendent possible l'étude d'un aspect de l'Univers jusqu'à présent voilé.",
                "owner": "moehc9sq54E4pqKC8",
                "icon": "/img/professionnels_themes_icon.png",
                "image": "https://www.sfpnet.fr/uploads/tinymce/dossier%202015-2016/ondesgravitationnelles.png"
            },
            {
                "active": true,
                "creationDate": "2016-05-10T22:00:00.000Z",
                "theme": "party",
                "subtheme": "bar",
                "address": "Grand préfabriqué, Chateau de Thouars",
                "zipCode": 33400,
                "city": "Talence",
                "title": "Barbecue de fin d'année by AMB",
                "date": "2016-06-18T22:00:00.000Z",
                "description": "Comme le veut la tradition, cet événement est co-organisé entre l’ancienne et la nouvelle équipe pour marquer la passation entre les deux bureaux. Cette soirée sera donc l’occasion de rencontrer la nouvelle équipe ultra motivée et de dire au-revoir à l’ancienne qui a été très présente toute l’année à vos côtés. L’entrée est Gratuite et les tarifs sont tous petits !",
                "owner": "moehc9sq54E4pqKC8",
                "icon": "/img/festifs_themes_icon.png",
                "image": "https://www.valpiform.com/wp-content/uploads/2015/07/Fotolia_83545283_S.jpg"
             },
             
             {
                "active": true,
                "creationDate": "2016-05-16T22:00:00.000Z",
                "theme": "sport",
                "subtheme": "Matchs",
                "address": "Place Johnston",
                "zipCode": 33000,
                "city": "Bordeaux",
                "title": "Rencontre Top 14 : UBB Vs Brive",
                "date": "2016-05-28T15:30:00.000Z",
                "description": "Venez chercher vos billets aux guichets uniques du Batiment A21 afin d'assister gratuitement à la rencontre UBB - Brive, comptant pour la 27ème journée du championnat Top 14 et encourager votre équipe pour son dernier match de la saison a Chaban Delmas afin d'obtenir une victoire capitale dans sa course aux phases finales !! ",
                "owner": "9HbRjcsTyqf9Ek9jo",
                "icon": "/img/sportifs_themes_icon.png",
                "image": "http://www.ubbrugby.com/application/uploads/files/ACTUS/UBB%20CAB/Date%20brive.jpg"
            },

            {
                "active": true,
                "creationDate": "2016-05-14T22:00:00.000Z",
                "theme": "sport",
                "subtheme": "Entrainement",
                "address": "Domaine de Rocquencourt, Avenue Jean Babin",
                "zipCode": 33600,
                "city": "Pessac",
                "title": "Entrainement loisir Volley-Ball",
                "date": "2016-05-18T19:00:00.000Z",
                "description": "Venez vous essayer au Volley-ball dans une séance ou plaisir sera le maître mot",
                "owner": "9HbRjcsTyqf9Ek9jo",
                "icon": "/img/sportifs_themes_icon.png",
                "image": "http://www.heritagepatriots.org/wp-content/uploads/2015/09/d35f5df2edd1dfeb2b801ae2c04ed9f2.jpg"
            },
 {
 "active": true,
 "creationDate": "2016-05-10T22:00:00.000Z",
 "theme": "party",
 "subtheme": "concert",
 "address": "740 Cours de la libération",
 "zipCode": 33400,
 "city": "Talence",
 "title": "Convergences Festival",
 "date": "2016-06-22T22:00:00.000Z",
 "description": "Pour la première fois en 2016, Convergences Festival investira l’espace bordelais avec la première édition de son festival de musique et arts urbains. Parce que la culture est un pilier de la démocratie, de la tolérance et de la cohésion sociale, nous avons créé un festival qui représente un moment de concert autour des valeurs du “bien vivre ensemble”, du partage et de la découverte. Notre objectif est de rassembler à l’occasion d’un évènement musical un public et des artistes de tous horizons pour leur faire vivre un moment unique et convivial. Convergences est un projet d’envergure pour la jeunesse bordelaise. Développé chaque jour par les quarante-cinq étudiants qu’il réunit, ce festival cristallise la volonté de la jeunesse de devenir acteur de la métamorphose galopante de la métropole bordelaise.",
 "owner": "moehc9sq54E4pqKC8",
 "icon": "/img/festivites_themes_icon.png",
 "image": "https://www.getupetfaistontruc.carrefour.fr/uploads/images/4d084edecbd8ad2b51956f4cbb147ecf.jpeg"
 }

        ];

        events.forEach((event) => {
            Events.insert(event)
        });
    }*/

    /*if (Services.find().count() === 0) {
        const services = [
                     {
                "active": true,
                "showPhone": true,
                "creationDate": "2016-05-13T22:00:00.000Z",
                "theme": "car",
                "subtheme": "carpooling",
                "address": "2 Rue des Gants",
                "zipCode": 33000,
                "city": "Bordeaux",
                "title": "Trajet Bordeaux-Toulouse",
                "date": "2016-06-30T22:00:00.000Z",
                "description": "Ne voyagez plus seul ! Faites des économies sur vos frais en prenant des passagers lors de vos longs trajets en voiture.",
                "owner": "moehc9sq54E4pqKC8",
                "icon": "/img/vehicule_themes_icon.png",
                "image": "https://d30y9cdsu7xlg0.cloudfront.net/png/40506-200.png"
            },
    {
                "active": true,
                "showPhone": true,
                "creationDate": "2016-05-13T22:00:00.000Z",
                "theme": "pet",
                "subtheme": "keeping",
                "address": "2 Rue Arts et métiers",
                "zipCode": 33400,
                "city": "Talence",
                "title": " Toutou Câlin",
                "date": "2016-05-31T22:00:00.000Z",
                "description": "Garde de chiens et chats à domicile, visite et promenade d'animaux",
                "owner": "moehc9sq54E4pqKC8",
                "icon": "/img/animaux_themes_icon.png",
                "image": "https://www.surewise.com/sww.v4/wp-content/uploads/2015/07/dog-and-cat-02-150x150.png"
            },
     {
                "active": true,
                "showPhone": true,
                "creationDate": "2016-05-13T22:00:00.000Z",
                "theme": "children",
                "subtheme": "keeping",
                "address": "2 Rue de Saige",
                "zipCode": 33600,
                "city": "Pessac",
                "title": " Nounou d'enfer",
                "date": "2016-05-28T22:00:00.000Z",
                "description": "Garde vos enfants pour 1h à quelques heures",
                "owner": "moehc9sq54E4pqKC8",
                "icon": "/img/enfant_themes_icon.png",
                "image": "http://orchardprimaryacademy.org/kgfl/primary/chickenleypri/arenas/websitecontent/web/keepingchildrensafe.png?width=640&height=480&scale=LIMIT_MAXSIZE"
            },
            {
                "active": true,
                "showPhone": true,
                "creationDate": "2016-05-14T22:00:00.000Z",
                "theme": "party",
                "subtheme": "musicalEntertainment",
                "address": "54 Avenue de La libération",
                "zipCode": 33400,
                "city": "Talence",
                "title": "Recherche DJ pour soirée Anniversaire",
                "date": "2016-06-04T22:00:00.000Z",
                "description": "Afin d'ambiancer ma soirée d'anniversaire, je suis à la recherche d'un DJ pouvant amener le manétiel nécessaire : Audio et Lumière, disponibilitée souhaitée : 22h-04h00 ",
                "owner": "moehc9sq54E4pqKC8",
                "icon": "/img/festivites_themes_icon.png",
                "image": "http://campinglescedres.com/wp-content/uploads/2016/03/dj.jpg"
            },

             {
             "active": true,
             "showPhone": true,
             "creationDate": "2016-05-17T14:2800.000Z",
             "theme": "it",
             "subtheme": "problemResolution",
             "address": "124 Cour du Maréchal Ferrand",
             "zipCode": 33600,
             "city": "Pessac",
             "title": "Recherche Informarticien pour réparer Ordinateur",
             "date": "",
             "description": "Mon ordinateur est infesté de virus et tourne au ralenti, je cherche quelqu'un qui puisse m'en débarrasser et mette en place des solutions afin que ca ne se reproduise plus",
             "owner": "moehc9sq54E4pqKC8",
             "icon": "/img/informatique_themes_icon.png",
             "image": "http://hightech-solution-repair.e-monsite.com/medias/images/ordinateur.jpg"
             },
             
             {
             "active": true,
             "showPhone": true,
             "creationDate": "2016-05-13T22:00:00.000Z",
             "theme": "home",
             "subtheme": "move",
             "address": "128, rue dubourdieu",
             "zipCode": 33800,
             "city": "Bordeaux",
             "title": "Location camion déménagement avec chauffeur",
             "date": "2016-07-22T22:00:00.000Z",
             "description": "Bonjour, je loue mon camion de 25m3 avec chauffeur déménageur équiper en déménagement (sangle couverture,etc.....).     Je peux vous aider a faire votre déménagement et tout transport de   1 a 100 Km Sur Bordeaux Metropole." Prix: 5€/10km,
             "owner": "moehc9sq54E4pqKC8",
             "icon": "/img/maison_themes_icon.png",
             "image": "http://ardeur.org/wp-content/uploads/2015/06/aide-demenagenment-boulogne.jpg"
             },
             
            {
            "active": true,
            "showPhone": true,
            "creationDate": "2016-05-13T22:00:00.000Z",
            "theme": "home",
            "subtheme": "chore",
            "address": "13, Rue François Rabelais",
            "zipCode": 33400,
            "city": "Talence",
            "title": "Services Aide ménagère à domicile",
            "date": "2016-05-16T22:00:00.000Z",
            "description": "Mes disponibilités sont de 6h/semaine. Le service : travaux ménagers, accompagnement aux courses, Vitres, Entretien/Rangement général de la maison",
            "owner": "moehc9sq54E4pqKC8",
            "icon": "/img/maison_themes_icon.png",
            "image": "http://cdn.simplesite.com/i/3b/93/285415632225473339/i285415639386082808._szw480h1280_.jpg"
            },
    
            {
            "active": true,
            "showPhone": true,
            "creationDate": "2016-05-13T22:00:00.000Z",
            "theme": "home",
            "subtheme": "shopping",
            "address": "4, Allée des Vignes",
            "zipCode": 33600,
            "city": "Pessac",
            "title": "Shopping & Courses",
            "date": "2016-05-16T22:00:00.000Z",
            "description": "Je propose de faire les courses de personnes âgées habitant dans un rayon de 30 km autour de Bordeaux.",
            "owner": "moehc9sq54E4pqKC8",
            "icon": "/img/maison_themes_icon.png",
            "image": "http://peveleservices.fr/img/p/15-55-large.jpg"
            },
            
            {
            "active": true,
            "showPhone": true,
            "creationDate": "2016-04-13T22:00:00.000Z",
            "theme": "healthcare",
            "subtheme": "beauty",
            "address": "Centre commercial Mériadeck",
            "zipCode": 33000,
            "city": "Bordeaux",
            "title": "'40% de réduction pour l'Institut de Beauté Body'Minute",
            "date": "2016-06-10T22:00:00.000Z",
            "description": "Bon de réduction pour spécial étudiant. Manicure, Pédicure, Massage, etc.",
            "owner": "moehc9sq54E4pqKC8",
            "icon": "/img/bien-etre_themes_icon.png",
            "image": "http://www.passionbeaute-villefranche.com/img/institut-de-beaute-villefranche-de-rouergue.jpg"
            },
             
             {
             "active": true,
             "showPhone": true,
             "creationDate": "2016-04-13T22:00:00.000Z",
             "theme": "car",
             "subtheme": "repairing",
             "address": "20, avenue de bardanac",
             "zipCode": 33600,
             "city": "Pessac",
             "title": "Mécanicien automobile",
             "date": "2016-06-27T22:00:00.000Z",
             "description": "Bonjour, je suis étudiant en master 1 mécanique et je propose mes services en tout ce qui concerne le vidange et le changement de consommable en échange d'un autre service. n'hesitez pas à me contacter pour plus d'infos.",
             "owner": "moehc9sq54E4pqKC8",
             "icon": "/img/vehicule_themes_icon.png",
             "image": "http://www.choisirlartisanat.fr/wp-content/uploads/2015/08/mecanicien-automobile-465x350.jpg"
             }

        ];

        services.forEach((service) => {
            Services.insert(service)
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
