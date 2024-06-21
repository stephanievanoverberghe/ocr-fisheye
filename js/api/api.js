class Api {
  /**
     * Create an Api instance.
     * @param {string} url - The URL of the API.
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
     * Create a PhotographerApi instance.
     * @param {string} url - The URL of the Photographer API.
     */
  constructor(url) {
    super(url);
  }

  async getPhotographers() {
    const data = await this.get();
    return data ? data.photographers : [];
  }
}

class MediaApi extends Api {
  /**
     * Create a MediaApi instance.
     * @param {string} url - The URL of the Media API.
     */
  constructor(url) {
    super(url);
  }

  async getMedia() {
    const data = await this.get();
    return data ? data.media : [];
  }
}

export { Api, PhotographerApi, MediaApi };