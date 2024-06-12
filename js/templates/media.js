
/**
 * Class representing a media card.
 */
class MediaCard {
    /**
     * Create a MediaCard instance.
     * @param {Media} media - The media data.
     */
    constructor(media) {
        this.media = media;
    }

    /**
     * Create a media card element.
     */
    createMediaCard() {
        throw new Error('Method createMediaCard() must be implemented');
    }
}

/**
 * Class representing an image media card.
 */
class ImageMediaCard extends MediaCard {
    createMediaCard() {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <img src="./../../assets/photographers/${this.media.image}" alt="${this.media.title}" class="card__img">
            <div class="card__body">
                <span>${this.media.title}</span>
                <div class="card__likes">
                    <span class="likes">${this.media.likes} likes</span>
                    <i class="fa-solid fa-heart likes__icon"></i>
                </div>
            </div>
        `;
        return card;
    }
}

/**
 * Class representing a video media card.
 */
class VideoMediaCard extends MediaCard {
    createMediaCard() {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <video controls class="card__video">
                <source src="./../../assets/photographers/${this.media.video}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="card__body">
                <span>${this.media.title}</span>
                <div class="card__likes">
                    <span class="likes">${this.media.likes} likes</span>
                    <i class="fa-solid fa-heart likes__icon"></i>
                </div>
            </div>
        `;
        return card;
    }
}
