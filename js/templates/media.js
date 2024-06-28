/**
 * Class representing a media card.
 */
export class MediaCard {
  /**
     * Create a MediaCard instance.
     * @param {Object} media - The media data.
     */
  constructor(media) {
    this.media = media;
  }

  createMediaCard() {
    throw new Error('Method createMediaCard() must be implemented');
  }

  /**
     * Add an event listener for the like button.
     * @param {HTMLElement} card - The media card element.
     */
  addLikeListener(card) {
    const likeIcon = card.querySelector('.likes__icon');
    const likeCount = card.querySelector('.likes');

    likeIcon.addEventListener('click', () => {
      this.toggleLike(likeIcon, likeCount);
    });

    likeIcon.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.toggleLike(likeIcon, likeCount);
      }
    });
  }

  toggleLike(likeIcon, likeCount) {
    if (likeIcon.classList.contains('fa-regular')) {
      this.media.incrementLikes();
      likeIcon.classList.remove('fa-regular');
      likeIcon.classList.add('fa-solid', 'pop');
      setTimeout(() => likeIcon.classList.remove('pop'), 500);
    } else {
      this.media.decrementLikes();
      likeIcon.classList.remove('fa-solid');
      likeIcon.classList.add('fa-regular', 'pop');
      setTimeout(() => likeIcon.classList.remove('pop'), 500);
    }
    likeCount.textContent = `${this.media.likes} likes`;
    document.dispatchEvent(new CustomEvent('likeAdded', {
      detail: {
        likes: this.media.likes
      }
    }));
  }
}

export class ImageMediaCard extends MediaCard {
  createMediaCard() {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
            <img src="./assets/photographers/${this.media.image}" alt="${this.media.title}" class="card__img" tabindex="0" role="img">
            <div class="card__body">
                <span class="card__title">${this.media.title}</span>
                <div class="card__likes">
                    <span class="likes">${this.media.likes} likes</span>
                    <i class="fa-regular fa-heart likes__icon" tabindex="0" role="button" aria-label="Like"></i>
                </div>
            </div>
        `;
    this.addLikeListener(card);
    return card;
  }
}

export class VideoMediaCard extends MediaCard {
  createMediaCard() {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
            <video controls class="card__video" tabindex="0" aria-label="${this.media.title}">
                <source src="./assets/photographers/${this.media.video}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="card__body">
                <span class="card__title">${this.media.title}</span>
                <div class="card__likes">
                    <span class="likes">${this.media.likes} likes</span>
                    <i class="fa-regular fa-heart likes__icon" tabindex="0" role="button" aria-label="Like"></i>
                </div>
            </div>
        `;
    this.addLikeListener(card);
    return card;
  }
}
