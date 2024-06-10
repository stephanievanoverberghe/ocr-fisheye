class SortStrategyFactory {
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
