
/**
 * Class representing the main application for the photographer page.
 */
class PhotographerApp {
  /**
     * Create a PhotographerApp instance.
     */
  constructor() {
    this.$photographerHeader = document.querySelector('.photograph__header');
    this.$mediaSection = document.querySelector('.result');
    this.$creditSection = document.createElement('div');
    this.$creditSection.className = 'credit';
    document.body.appendChild(this.$creditSection);

    this.photographersApi = new PhotographerApi('data/photographers.json');
    this.mediaApi = new MediaApi('data/photographers.json');
    this.photographerMedia = [];
  }

  /**
     * Main entry point for the application.
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
        this.photographerMedia = mediaData.filter(m => m.photographerId == photographerId)
          .map(m => new Media(m));
        this.displayPhotographerMedia(photographer, this.photographerMedia);

        const photographerCard = new PhotographerCard(photographer);
        const totalLikes = photographerCard.calculateTotalLikes(this.photographerMedia);
        const creditSection = photographerCard.createPhotographerCredit(totalLikes);
        this.$creditSection.innerHTML = '';
        this.$creditSection.appendChild(creditSection);

        this.renderFilter();
        this.initFilterListener();
        this.initLikeListener();

        document.addEventListener('likeAdded', () => {
          this.updateTotalLikes();
        });
      } else {
        console.error('Photographer not found');
      }
    } catch (error) {
      console.error('Error in main:', error);
    }
  }

  /**
     * Display photographer information in the header section.
     * @param {Object} photographer - The photographer data.
     */
  displayPhotographerInfo(photographer) {
    const photographerCard = new PhotographerCard(photographer);
    const infoCard = photographerCard.createPhotographerInfo();

    this.$photographerHeader.innerHTML = '';
    this.$photographerHeader.appendChild(infoCard);
  }

  /**
     * Display the media items for the photographer.
     * @param {Object} photographer - The photographer data.
     * @param {Array} media - The media data.
     */
  displayPhotographerMedia(photographer, media) {
    this.$mediaSection.innerHTML = '';

    media.forEach(mediaItem => {
      const mediaCard = MediaFactory.createMediaCard(mediaItem);
      this.$mediaSection.appendChild(mediaCard.createMediaCard());
    });
    new Lightbox();
  }

  /**
     * Initialize the filter dropdown listener.
     */
  initFilterListener() {
    const filterDropdown = document.getElementById('sort');
    filterDropdown.addEventListener('change', (event) => {
      const value = event.target.value;
      if (value) {
        this.applyFilter(value);
      }
    });
  }

  /**
     * Apply the selected filter to the media items.
     * @param {string} criterion - The selected filter criterion.
     */
  applyFilter(criterion) {
    const strategy = SortStrategyFactory.getStrategy(criterion);
    const sorter = new MediaSorter(strategy);
    const sortedMedia = sorter.sort(this.photographerMedia);
    this.displayPhotographerMedia(null, sortedMedia);
  }

  /**
     * Render the filter dropdown.
     */
  renderFilter() {
    const filterContainer = document.querySelector('.photograph__body');
    const filterTemplate = new FilterTemplate(filterContainer);
    const filterForm = filterTemplate.render();
    filterContainer.insertBefore(filterForm, filterContainer.firstChild);
  }

  /**
     * Initialize the listener for the like events.
     */
  initLikeListener() {
    document.addEventListener('likeAdded', () => {
      this.updateTotalLikes();
    });
  }

  /**
     * Update the total likes count in the photographer credit section.
     */
  updateTotalLikes() {
    const totalLikes = this.photographerMedia.reduce((acc, media) => {
      return acc + media.likes;
    }, 0);
    const totalLikesElement = this.$creditSection.querySelector('.total-likes');
    if (totalLikesElement) {
      totalLikesElement.textContent = totalLikes;
    } else {
      console.error('Total likes element not found');
    }
  }
}

const app = new PhotographerApp();
app.main();
