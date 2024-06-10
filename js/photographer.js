/**
 * Class representing the main application for the photographer page.
 */
class PhotographerApp {
    constructor() {
        this.$photographerHeader = document.querySelector('.photograph__header');
        this.$mediaSection = document.querySelector('.result');
        this.$creditSection = document.createElement('div');
        this.$creditSection.className = 'credit';
        document.body.appendChild(this.$creditSection);

        this.photographersApi = new PhotographerApi('data/photographers.json');
        this.mediaApi = new MediaApi('data/photographers.json');
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
                this.photographerMedia = mediaData.filter(m => m.photographerId == photographerId);
                this.displayPhotographerMedia(photographer, this.photographerMedia);

                const photographerCard = new PhotographerCard(photographer);
                const totalLikes = photographerCard.calculateTotalLikes(this.photographerMedia);
                const creditSection = photographerCard.createPhotographerCredit(totalLikes);
                this.$creditSection.innerHTML = '';
                this.$creditSection.appendChild(creditSection);

                this.renderFilter();
                this.initFilterListener();
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
            const mediaCard = MediaFactory.createMediaCard(mediaModel);
            this.$mediaSection.appendChild(mediaCard.createMediaCard());
        });
    }

    initFilterListener() {
        const filterDropdown = document.getElementById('sort');
        filterDropdown.addEventListener('change', (event) => {
            const value = event.target.value;
            if (value) {
                this.applyFilter(value);
            }
        });
    }

    applyFilter(criterion) {
        const strategy = SortStrategyFactory.getStrategy(criterion);
        const sorter = new MediaSorter(strategy);
        const sortedMedia = sorter.sort(this.photographerMedia);
        this.displayPhotographerMedia(null, sortedMedia);
    }

    renderFilter() {
        const filterContainer = document.querySelector('.photograph__body');
        const filterTemplate = new FilterTemplate(filterContainer);
        const filterForm = filterTemplate.render();
        filterContainer.insertBefore(filterForm, filterContainer.firstChild);
    }
}

const app = new PhotographerApp();
app.main();