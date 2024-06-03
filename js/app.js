/**
 * Class representing the main application for the homepage
 */
class HomeApp {
    /**
     * Create an App instance
     */
    constructor() {
        this.$photographersWrapper = document.querySelector('.photographers__wrapper');
        this.photographersApi = new PhotographerApi('/data/photographers.json');
    }

    /**
     * Initialize the application
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
 * Class representing the main application for the photographer page
 */
class PhotographerApp {
    constructor() {
        this.$photographerHeader = document.querySelector('.photograph__header');
        this.photographersApi = new PhotographerApi('/data/photographers.json');
    }

    async main() {
        try {
            const params = new URLSearchParams(window.location.search);
            const photographerId = params.get('id');

            const photographersData = await this.photographersApi.getPhotographers();
            const photographer = photographersData.find(p => p.id == photographerId);

            if (photographer) {
                this.displayPhotographerInfo(photographer);
            } else {
                console.error('Photographer not found');
            }
        } catch (error) {
            console.error('Error in main:', error);
        }
    }

    displayPhotographerInfo(photographer) {
        const photographerCard = new PhotographerCard(photographer);
        const infoCard = photographerCard.createPhotographerInfo();

        this.$photographerHeader.innerHTML = '';
        this.$photographerHeader.appendChild(infoCard);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('home')) {
        const app = new HomeApp();
        app.main();
    } else if (document.body.classList.contains('photographer-page')) {
        const app = new PhotographerApp();
        app.main();
    }
});