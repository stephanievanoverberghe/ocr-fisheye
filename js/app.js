/**
 * Class representing the main application for the homepage.
 */
class HomeApp {
    /**
     * Create an App instance for the homepage.
     */
    constructor() {
        this.$photographersWrapper = document.querySelector('.photographers__wrapper');
        this.photographersApi = new PhotographerApi('/data/photographers.json');
    }

    /**
     * Initialize the application for the homepage.
     */
    async main() {
        try {
            const photographersData = await this.photographersApi.getPhotographers();
            console.log('Photographers data:', photographersData);

            if (!Array.isArray(photographersData)) {
                throw new TypeError('Expected an array of photographers');
            }

            photographersData
                .map(data => new Photographer(data))
                .map(photographer => new PhotographerCard(photographer))
                .forEach(template => {
                    console.log(template);
                    this.$photographersWrapper.appendChild(template.createPhotographerCard());
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

        this.photographersApi = new PhotographerApi('/data/photographers.json');
        this.mediaApi = new MediaApi('/data/photographers.json');
    }

    /**
     * Initialize the application for the photographer page.
     */
    async main() {
        try {
            const params = new URLSearchParams(window.location.search);
            const photographerId = params.get('id');

            const photographersData = await this.photographersApi.getPhotographers();
            const photographer = photographersData.find(p => p.id == photographerId);

            if (photographer) {
                this.displayPhotographerInfo(photographer);
                const mediaData = await this.mediaApi.getMedia();
                const photographerMedia = mediaData.filter(m => m.photographerId == photographerId);
                this.displayPhotographerMedia(photographer, photographerMedia);
                const photographerCard = new PhotographerCard(photographer);
                const totalLikes = photographerCard.calculateTotalLikes(photographerMedia);
                const creditSection = photographerCard.createPhotographerCredit(totalLikes);
                this.$creditSection.innerHTML = '';
                this.$creditSection.appendChild(creditSection);
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
        const photographerCard = new PhotographerCard(photographer);
        const infoCard = photographerCard.createPhotographerInfo();

        this.$photographerHeader.innerHTML = '';
        this.$photographerHeader.appendChild(infoCard);
    }

    /**
     * Display photographer media in the media section.
     * @param {Object} photographer - The photographer data.
     * @param {Array} media - The media data.
     */
    displayPhotographerMedia(photographer, media) {
        this.$mediaSection.innerHTML = '';

        media.forEach(mediaItem => {
            const mediaModel = new Media(mediaItem);
            const mediaCard = MediaFactory.createMediaCard(mediaModel);
            this.$mediaSection.appendChild(mediaCard.createMediaCard());
        });
    }
}

/**
 * Initialize the appropriate application when the DOM content is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('home')) {
        const app = new HomeApp();
        app.main();
    } else if (document.body.classList.contains('photographer-page')) {
        const app = new PhotographerApp();
        app.main();
    }
});
