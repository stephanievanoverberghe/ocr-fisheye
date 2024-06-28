/* eslint-disable no-unused-vars */
// SortStrategy.js
class SortStrategy {
  /**
     * @param {Array} media - The media items to sort.
     */
  sort(media) {
    throw new Error("Method 'sort()' must be implemented.");
  }
}

// PopularitySortStrategy.js
class PopularitySortStrategy extends SortStrategy {
  sort(media) {
    return media.sort((a, b) => b.likes - a.likes);
  }
}

// DateSortStrategy.js
class DateSortStrategy extends SortStrategy {
  sort(media) {
    return media.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
}

// TitleSortStrategy.js
class TitleSortStrategy extends SortStrategy {
  sort(media) {
    return media.sort((a, b) => a.title.localeCompare(b.title));
  }
}

export { SortStrategy, PopularitySortStrategy, DateSortStrategy, TitleSortStrategy };