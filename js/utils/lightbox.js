class Lightbox {
    constructor() {
        this.$lightboxModal = document.getElementById('lightbox_modal');
        this.$lightboxMedia = this.$lightboxModal.querySelector('.lightbox__media');
        this.$lightboxImg = this.$lightboxMedia.querySelector('.lightbox__img');
        this.$lightboxVideo = this.$lightboxMedia.querySelector('.lightbox__video');
        this.$lightboxTitle = this.$lightboxMedia.querySelector('.card__title');
        this.$closeButton = this.$lightboxModal.querySelector('.lightbox__close');
        this.$nextButton = this.$lightboxModal.querySelector('.lightbox__next');
        this.$prevButton = this.$lightboxModal.querySelector('.lightbox__prev');

        this.currentMediaElement = null;

        this.addEventListeners();
    }

    addEventListeners() {
        this.$closeButton.addEventListener('click', () => {
            this.closeLightbox();
        });
        this.$nextButton.addEventListener('click', () => {
            this.navigateLightbox('next');
        });
        this.$prevButton.addEventListener('click', () => {
            this.navigateLightbox('prev');
        });

        // Add event listeners to media elements
        const mediaElements = document.querySelectorAll('.card');
        console.log(mediaElements);
        mediaElements.forEach(element => {
            element.addEventListener('click', (event) => {
                this.openLightbox(event.target);
            });
        });
    }

    openLightbox(mediaElement) {
        console.log("Opening lightbox for", mediaElement);
        if (mediaElement.tagName === 'IMG') {
            this.$lightboxImg.src = mediaElement.src;
            this.$lightboxImg.alt = mediaElement.alt;
            this.$lightboxImg.style.display = 'block';
            this.$lightboxVideo.style.display = 'none';
        } else if (mediaElement.tagName === 'VIDEO') {
            const videoSource = mediaElement.querySelector('source');
            if (videoSource) {
                this.$lightboxVideo.querySelector('source').src = videoSource.src;
                this.$lightboxVideo.load();
                this.$lightboxVideo.style.display = 'block';
                this.$lightboxImg.style.display = 'none';
            }
        }

        this.$lightboxTitle.textContent = mediaElement.alt;
        this.$lightboxModal.style.display = 'block';

        this.currentMediaElement = mediaElement;
    }

    closeLightbox() {
        this.$lightboxModal.style.display = 'none';
    }

    navigateLightbox(direction) {
        const mediaElements = Array.from(document.querySelectorAll('.card__img, .card__video'));
        let currentIndex = mediaElements.indexOf(this.currentMediaElement);
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % mediaElements.length;
        } else if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + mediaElements.length) % mediaElements.length;
        }
        this.openLightbox(mediaElements[currentIndex]);
    }
}
