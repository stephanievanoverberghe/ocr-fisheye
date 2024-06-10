class MediaSorter {
    constructor(strategy) {
        this.setStrategy(strategy);
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    sort(media) {
        return this.strategy.sort(media);
    }
}
