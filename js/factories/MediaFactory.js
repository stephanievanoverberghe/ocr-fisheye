class MediaFactory {
    /**
     * Create a MediaFactory instance
     * @param {Object} media - The media data
     * @return {MediaCard} - The appropriate media card instance
     */
    static createMediaCard(media) {
        if (media.image) {
            return new ImageMediaCard(media);
        } else if (media.video) {
            return new VideoMediaCard(media);
        }
        throw new Error('Unknown media type');
    }
}
