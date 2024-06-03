class MediaCard {
    /**
     * 
     * @param {Media} media 
     */
    constructor(media) {
        this.media = media;
    };

    createMediaCard() {
        const card = document.createElement('article');
        card.className = 'card';

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
        } else if (this.media.video) {
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
};