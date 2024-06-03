class Api {
    /**
     * Create an Api instance
     * @param {string} url 
     */
    constructor(url) {
        this._url = url;
    }

    async get() {
        return fetch(this._url)
            .then(response => response.json())
            .catch(error => {
                console.log('an error occurs', error);
                return null;
            });
    }
}

class PhotographerApi extends Api {
    /**
     * Create a photographerApi instance
     * @param {string} url 
     */
    constructor(url) {
        super(url);
    }

    async getPhotographers() {
        const data = await this.get();
        return data ? data.photographers : [];
    }
}