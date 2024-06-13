class MediaCard {
    constructor(media) {
        this.media = media;
    }

    createMediaCard() {
        throw new Error('Method createMediaCard() must be implemented');
    }

    addLikeListener(card) {
        const likeIcon = card.querySelector('.likes__icon');
        const likeCount = card.querySelector('.likes');

        likeIcon.addEventListener('click', () => {
            if (!this.media.isLiked) {
                this.media.incrementLikes();
                likeCount.textContent = `${this.media.likes} likes`;
                document.dispatchEvent(new CustomEvent('likeAdded', {
                    detail: {
                        likes: this.media.likes
                    }
                }));
            } else {
                console.log('This media has already been liked.');
            }
        });
    }
}

class ImageMediaCard extends MediaCard {
    createMediaCard() {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <img src="./assets/photographers/${this.media.image}" alt="${this.media.title}" class="card__img">
            <div class="card__body">
                <span>${this.media.title}</span>
                <div class="card__likes">
                    <span class="likes">${this.media.likes} likes</span>
                    <i class="fa-solid fa-heart likes__icon"></i>
                </div>
            </div>
        `;
        this.addLikeListener(card);
        return card;
    }
}

class VideoMediaCard extends MediaCard {
    createMediaCard() {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <video controls class="card__video">
                <source src="./assets/photographers/${this.media.video}" type="video/mp4">
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
        this.addLikeListener(card);
        return card;
    }
}
