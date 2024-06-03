/**
 * Class representing a media card.
 */
class MediaCard {
    /**
     * Create a MediaCard instance.
     * @param {Media} media - The media data.
     */
    constructor(media) {
        this.media = media; // Initialise le média
    }

    createMediaCard() {
        const card = document.createElement('article');
        card.className = 'card';

        // Si le média est une image, crée une structure HTML pour l'image
        if (this.media.image) {
            card.innerHTML = `
                <img src="${this.media.image}" alt="${this.media.title}" class="card__img">
                <div class="card__body">
                    <span>${this.media.title}</span>
                    <div class="card__likes">
                        <span class="likes">${this.media.likes} likes</span>
                        <i class="fa-solid fa-heart likes__icon"></i>
                    </div>
                </div>
            `;
        }
        // Si le média est une vidéo, crée une structure HTML pour la vidéo
        else if (this.media.video) {
            card.innerHTML = `
                <video controls class="card__video">
                    <source src="${this.media.video}" type="video/mp4">
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
        }

        return card;
    }
}
