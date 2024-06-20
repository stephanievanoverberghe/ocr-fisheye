/**
 * Class representing a media item.
 */
class Media {
    /**
     * Create a Media instance.
     * @param {Object} data - The media data.
     */
    constructor(data) {
        this._id = data.id;
        this._photographerId = data.photographerId;
        this._title = data.title;
        this._image = data.image;
        this._video = data.video;
        this._likes = data.likes;
        this._date = data.date;
        this._price = data.price;
        this._isLiked = false;
    }

    get id() {
        return this._id;
    }

    get photographerId() {
        return this._photographerId;
    }

    get title() {
        return this._title;
    }

    get image() {
        return this._image ? `${this._photographerId}/${this._image}` : null;
    }

    get video() {
        return this._video ? `${this._photographerId}/${this._video}` : null;
    }

    get likes() {
        return this._likes;
    }

    get date() {
        return this._date;
    }

    get price() {
        return this._price;
    }

    incrementLikes() {
        if (!this._isLiked) {
            this._likes += 1;
            this._isLiked = true;
        }
    }
}
