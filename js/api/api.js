/**
 * Class representing a general API.
 */
class Api {
    /**
     * Create an Api instance.
     * @param {string} url - The URL of the API.
     */
    constructor(url) {
        this._url = url; // Initialise l'URL de l'API
    }

    async get() {
        return fetch(this._url) // Effectue une requête fetch à l'URL de l'API
            .then(response => response.json()) // Convertit la réponse en JSON
            .catch(error => {
                console.log('an error occurs', error);
                return null;
            });
    }
}

/**
 * Class representing the API for photographers.
 * Extends the general Api class.
 */
class PhotographerApi extends Api {
    /**
     * Create a PhotographerApi instance.
     * @param {string} url - The URL of the API.
     */
    constructor(url) {
        super(url); // Appelle le constructeur de la classe parente Api
    }

    async getPhotographers() {
        const data = await this.get(); // Appelle la méthode get de la classe parente
        return data ? data.photographers : []; // Retourne les données des photographes ou un tableau vide en cas d'erreur
    }
}

/**
 * Class representing the API for media.
 * Extends the general Api class.
 */
class MediaApi extends Api {
    /**
     * Create a MediaApi instance.
     * @param {string} url - The URL of the API.
     */
    constructor(url) {
        super(url); // Appelle le constructeur de la classe parente Api
    }

    async getMedia() {
        const data = await this.get(); // Appelle la méthode get de la classe parente
        return data ? data.media : []; // Retourne les données des médias ou un tableau vide en cas d'erreur
    }
}
