/**
 * Factory class for creating sort strategy instances.
 */
class SortStrategyFactory {
    /**
     * Get a sort strategy instance based on the given criterion.
     * @param {string} criterion - The criterion to sort by ('popular', 'date', 'title').
     * @return {Object} An instance of the appropriate sort strategy.
     */
    static getStrategy(criterion) {
        switch (criterion) {
            case 'popular':
                return new PopularitySortStrategy();
            case 'date':
                return new DateSortStrategy();
            case 'title':
                return new TitleSortStrategy();
            default:
                return new PopularitySortStrategy();
        }
    }
}
