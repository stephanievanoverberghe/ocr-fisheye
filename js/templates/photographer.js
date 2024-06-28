/**
 * Class representing a photographer card.
 */
export class PhotographerCard {
  /**
   * Create a PhotographerCard instance.
   * @param {Object} photographer - The photographer data.
   */
  constructor(photographer) {
    this.photographer = photographer;
  }

  createPhotographerCard() {
    const card = document.createElement('li');
    card.className = 'photographer__card';
    card.innerHTML = `
            <img src="./assets/photographers/${this.photographer.portrait}" alt="${this.photographer.name}" class="photographer__picture" role="img">
            <h2 class="photographer__title">${this.photographer.name}</h2>
            <p class="city__country">${this.photographer.city}, ${this.photographer.country}</p>
            <p class="tagline">${this.photographer.tagline}</p>
            <p class="price">${this.photographer.price}€/jour</p>
        `;

    const link = document.createElement('a');
    link.href = `photographer.html?id=${this.photographer.id}`;
    link.tabIndex = 0;
    link.setAttribute('role', 'link');
    link.setAttribute('aria-label', `Voir le profil du photographe ${this.photographer.name}`);

    // Handle keyboard events
    link.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        window.location.href = link.href;
      }
    });

    link.appendChild(card);
    return link;
  }

  createPhotographerInfo() {
    const card = document.createElement('div');
    card.className = 'photograph__card';
    card.innerHTML = `
            <div class="card__content">
                <h1 class="content__title">${this.photographer.name}</h1>
                <p class="content__country">${this.photographer.city}, ${this.photographer.country}</p>
                <p class="content__citation">${this.photographer.tagline}</p>
            </div>
            <button class="contact_button" onclick="displayModal()" tabindex="0">Contactez-moi</button>
            <img src="./assets/photographers/${this.photographer.portrait}" alt="${this.photographer.name}" class="photographer__picture" role="img">
        `;

    return card;
  }

  /**
   * Create a photographer credit element.
   * @param {number} totalLikes - The total number of likes.
   * @return {HTMLElement} The photographer credit element.
   */
  createPhotographerCredit(totalLikes) {
    const credit = document.createElement('div');
    credit.className = 'credit';
    credit.innerHTML = `
            <div class="total__likes">
                <span class="total-likes">${totalLikes}</span> likes
                <i class="fa-solid fa-heart"></i>
            </div>
            <span>${this.photographer.price}€/jour</span>
        `;
    return credit;
  }

  /**
   * Calculate the total likes of all media items.
   * @param {Array} media - The media data.
   * @return {number} The total likes.
   */
  calculateTotalLikes(media) {
    return media.reduce((total, item) => total + item.likes, 0);
  }
}