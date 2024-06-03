/**
 * Class representing the main application for the homepage.
 */
class HomeApp {
    /**
     * Create an App instance.
     */
    constructor() {
        this.$photographersWrapper = document.querySelector('.photographers__wrapper');
        this.photographersApi = new PhotographerApi('/data/photographers.json'); // Initialise l'API des photographes
    }

    /**
     * Initialize the application.
     * Fetches photographers data and displays it on the homepage.
     * @async
     */
    async main() {
        try {
            const photographersData = await this.photographersApi.getPhotographers(); // Récupère les données des photographes
            console.log('Photographers data:', photographersData);

            if (!Array.isArray(photographersData)) {
                throw new TypeError('Expected an array of photographers'); // Vérifie que les données sont un tableau
            }

            photographersData
                .map(data => new Photographer(data)) // Crée des instances de Photographer
                .map(photographer => new PhotographerCard(photographer)) // Crée des cards de photographes
                .forEach(template => {
                    console.log(template);
                    this.$photographersWrapper.appendChild(template.createPhotographerCard()); // Ajoute chaque card au wrapper
                });
        } catch (error) {
            console.error('Error in main:', error);
        }
    }
}

/**
 * Class representing the main application for the photographer page.
 */
class PhotographerApp {
    /**
     * Create an App instance for the photographer page.
     */
    constructor() {
        this.$photographerHeader = document.querySelector('.photograph__header');
        this.$mediaSection = document.querySelector('.result');
        this.$creditSection = document.createElement('div');
        this.$creditSection.className = 'credit';
        document.body.appendChild(this.$creditSection);

        this.photographersApi = new PhotographerApi('/data/photographers.json'); // Initialise l'API des photographes
        this.mediaApi = new MediaApi('/data/photographers.json'); // Initialise l'API des médias
    }

    /**
     * Initialize the application for the photographer page.
     * Fetches photographer and media data, and displays them on the page.
     * @async
     */
    async main() {
        try {
            const params = new URLSearchParams(window.location.search); // Récupère les paramètres de l'URL
            const photographerId = params.get('id'); // Récupère l'ID du photographe

            const photographersData = await this.photographersApi.getPhotographers(); // Récupère les données des photographes
            const photographer = photographersData.find(p => p.id == photographerId); // Trouve le photographe correspondant

            if (photographer) {
                this.displayPhotographerInfo(photographer); // Affiche les informations du photographe
                const mediaData = await this.mediaApi.getMedia(); // Récupère les données des médias
                const photographerMedia = mediaData.filter(m => m.photographerId == photographerId); // Filtre les médias du photographe
                this.displayPhotographerMedia(photographer, photographerMedia); // Affiche les médias du photographe
                const photographerCard = new PhotographerCard(photographer); // Crée une instance de PhotographerCard
                const totalLikes = photographerCard.calculateTotalLikes(photographerMedia); // Calcule le total des likes
                const creditSection = photographerCard.displayPhotographerCredit(photographer, totalLikes); // Crée la section de crédits
                this.$creditSection.innerHTML = '';
                this.$creditSection.appendChild(creditSection); // Ajoute la section de crédits au conteneur
            } else {
                console.error('Photographer not found');
            }
        } catch (error) {
            console.error('Error in main:', error);
        }
    }

    /**
     * Display photographer information in the header.
     * @param {Object} photographer - The photographer data.
     */
    displayPhotographerInfo(photographer) {
        const photographerCard = new PhotographerCard(photographer); // Crée une instance de PhotographerCard
        const infoCard = photographerCard.createPhotographerInfo(); // Crée la card d'informations du photographe

        this.$photographerHeader.innerHTML = '';
        this.$photographerHeader.appendChild(infoCard); // Ajoute la card d'informations à l'en-tête
    }

    /**
     * Display photographer media in the media section.
     * @param {Object} photographer - The photographer data.
     * @param {Array} media - The media data.
     */
    displayPhotographerMedia(photographer, media) {
        this.$mediaSection.innerHTML = '';

        media.forEach(mediaItem => {
            const mediaModel = new Media(mediaItem); // Crée une instance de Media
            const mediaCard = new MediaCard(mediaModel); // Crée une card de média
            this.$mediaSection.appendChild(mediaCard.createMediaCard()); // Ajoute la card de média à la section des résultats
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('home')) {
        const app = new HomeApp(); // Initialise l'application pour la page d'accueil
        app.main(); // Exécute la fonction main de l'application
    } else if (document.body.classList.contains('photographer-page')) {
        const app = new PhotographerApp(); // Initialise l'application pour la page du photographe
        app.main(); // Exécute la fonction main de l'application
    }
});

