/**
 * Class representing a lightbox.
 */
export class Lightbox {
  constructor() {
    this.$lightboxModal = document.getElementById('lightbox_modal');
    this.$lightboxMedia = this.$lightboxModal.querySelector('.lightbox__media');
    this.$lightboxImg = this.$lightboxMedia.querySelector('.lightbox__img');
    this.$lightboxVideo = this.$lightboxMedia.querySelector('.lightbox__video');
    this.$lightboxTitle = this.$lightboxMedia.querySelector('.card__title');
    this.$closeButton = this.$lightboxModal.querySelector('.lightbox__close');
    this.$nextButton = this.$lightboxModal.querySelector('.lightbox__next');
    this.$prevButton = this.$lightboxModal.querySelector('.lightbox__prev');

    this.focusableElements = [];
    this.firstFocusableElement = null;
    this.lastFocusableElement = null;

    this.currentMediaElement = null;

    this.addEventListeners();
  }

  /**
     * Add event listeners to the lightbox controls.
     */
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

    // Media elements (images and videos)
    const mediaElements = document.querySelectorAll('.card__img, .card__video');
    mediaElements.forEach(element => {
      element.addEventListener('click', (event) => {
        this.openLightbox(event.target);
      });
      element.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          console.log('Enter key pressed on media element:', element);
          this.openLightbox(event.target);
        }
      });
    });
  }

  /**
     * Open the lightbox with the given media element.
     * @param {HTMLElement} mediaElement - The media element to display in the lightbox.
     */
  openLightbox(mediaElement) {
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
    this.$lightboxModal.setAttribute('aria-hidden', 'false');

    this.currentMediaElement = mediaElement;

    // Add keydown event listener for navigation
    document.addEventListener('keydown', this.handleKeydown.bind(this));

    // Set focusable elements for accessibility
    this.focusableElements = this.$lightboxModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    this.firstFocusableElement = this.focusableElements[0];
    this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];

    // Focus on the first focusable element
    setTimeout(() => {
      this.firstFocusableElement.focus();
    }, 100);

    // Add keydown event listener for trapping focus
    document.addEventListener('keydown', this.trapTabKey.bind(this));
  }

  /**
     * Close the lightbox and remove event listeners.
     */
  closeLightbox() {
    this.$lightboxModal.style.display = 'none';
    this.$lightboxModal.setAttribute('aria-hidden', 'true');

    document.removeEventListener('keydown', this.handleKeydown.bind(this));
    document.removeEventListener('keydown', this.trapTabKey.bind(this));
  }

  /**
     * Navigate to the next or previous media element in the lightbox.
     * @param {string} direction - The direction to navigate ('next' or 'prev').
     */
  navigateLightbox(direction) {
    const mediaElements = Array.from(document.querySelectorAll('.card__img, .card__video'));
    let currentIndex = mediaElements.indexOf(this.currentMediaElement);
    if (direction === 'next') {
      currentIndex = (currentIndex + 1) % mediaElements.length;
    } else if (direction === 'prev') {
      currentIndex = (currentIndex - 1 + mediaElements.length) % mediaElements.length;
    }
    this.updateLightboxContent(mediaElements[currentIndex]);
  }

  /**
     * Update the lightbox content with the given media element.
     * @param {HTMLElement} mediaElement - The media element to display in the lightbox.
     */
  updateLightboxContent(mediaElement) {
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
    this.currentMediaElement = mediaElement;
  }

  /**
     * Handle keydown events for lightbox navigation.
     * @param {KeyboardEvent} event - The keydown event.
     */
  handleKeydown(event) {
    if (event.key === 'Escape') {
      this.closeLightbox();
    } else if (event.key === 'ArrowRight') {
      this.navigateLightbox('next');
    } else if (event.key === 'ArrowLeft') {
      this.navigateLightbox('prev');
    }
  }

  /**
     * Trap Tab key navigation within the lightbox for accessibility.
     * @param {KeyboardEvent} event - The keydown event.
     */
  trapTabKey(event) {
    if (event.key === 'Tab') {
      if (event.shiftKey) { // If Shift + Tab
        if (document.activeElement === this.firstFocusableElement) {
          event.preventDefault();
          this.lastFocusableElement.focus();
        }
      } else { // If Tab
        if (document.activeElement === this.lastFocusableElement) {
          event.preventDefault();
          this.firstFocusableElement.focus();
        }
      }
    }
  }
}

// window.Lightbox = Lightbox;

// Initialize the lightbox when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  new Lightbox();
});
