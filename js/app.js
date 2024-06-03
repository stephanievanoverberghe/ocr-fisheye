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

class PhotographerApp {
    constructor() {
        this.$photographerHeader = document.querySelector('.photograph__header');
        this.$mediaSection = document.querySelector('.result');
        this.$creditSection = document.createElement('div'); // Créez dynamiquement le conteneur de crédit
        this.$creditSection.className = 'credit';
        document.body.appendChild(this.$creditSection); // Ajoutez-le au body

        this.photographersApi = new PhotographerApi('/data/photographers.json');
        this.mediaApi = new MediaApi('/data/photographers.json');
    }

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
                const totalLikes = this.calculateTotalLikes(photographerMedia);
                this.displayPhotographerCredit(photographer, totalLikes);
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

    displayPhotographerMedia(photographer, media) {
        this.$mediaSection.innerHTML = '';

        media.forEach(mediaItem => {
            const mediaModel = new Media(mediaItem);
            const mediaCard = new MediaCard(mediaModel);
            this.$mediaSection.appendChild(mediaCard.createMediaCard());
        });
    }

    calculateTotalLikes(media) {
        return media.reduce((total, item) => total + item.likes, 0);
    }

    displayPhotographerCredit(photographer, totalLikes) {
        this.$creditSection.innerHTML = `
            <div class="total__likes">
                <span>${totalLikes} likes</span>
                <i class="fa-solid fa-heart"></i>
            </div>
            <span>${photographer.price}€/jour</span>
        `;
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

