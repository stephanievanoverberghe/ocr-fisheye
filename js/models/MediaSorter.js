export class MediaSorter {
  /**
     * Create a MediaSorter instance.
     * @param {Object} strategy - The sorting strategy to use.
     */
  constructor(strategy) {
    this.setStrategy(strategy);
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  /**
     * Sort the media items using the current strategy.
     * @param {Array} media - The media items to sort.
     * @return {Array} The sorted media items.
     */
  sort(media) {
    return this.strategy.sort(media);
  }
}
