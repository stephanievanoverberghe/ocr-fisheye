/**
 * Class representing the main application for the home page.
 */
class HomeApp {
  /**
     * Create a HomeApp instance.
     */
  constructor() {
    this.$photographersWrapper = document.querySelector('.photographers__wrapper');
    this.photographersApi = new PhotographerApi('data/photographers.json');
  }

  /**
     * Main entry point for the application.
     * Fetches and displays photographers data.
     */
  async main() {
    try {
      const photographersData = await this.photographersApi.getPhotographers();

      if (!Array.isArray(photographersData)) {
        throw new TypeError('Expected an array of photographers');
      }

      photographersData
        .map(data => new Photographer(data))
        .map(photographer => new PhotographerCard(photographer))
        .forEach(template => {
          this.$photographersWrapper.appendChild(template.createPhotographerCard());
        });
    } catch (error) {
      console.error('Error in main:', error);
    }
  }
}

const app = new HomeApp();
app.main();
