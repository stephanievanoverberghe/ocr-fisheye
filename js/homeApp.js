/**
 * Class representing the main application for the homepage.
 */
class HomeApp {
    constructor() {
        this.$photographersWrapper = document.querySelector('.photographers__wrapper');
        this.photographersApi = new PhotographerApi('data/photographers.json');
    }

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

const app = new HomeApp();
app.main();