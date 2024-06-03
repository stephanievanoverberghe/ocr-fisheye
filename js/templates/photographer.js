class PhotographerCard {
    /**
     * Create a PhotographerCard instance
     * @param {} photographer 
     */
    constructor(photographer) {
        this.photographer = photographer;
    }

    createPhotographerCard() {
        const card = document.createElement('li');
        card.className = 'photographer__card';
        card.innerHTML = `
            <img src="${this.photographer.portrait}" alt="${this.photographer.name}" class="photographer__picture">
            <h2 class="photographer__title">${this.photographer.name}</h2>
            <p class="city__country">${this.photographer.city}, ${this.photographer.country}</p>
            <p class="tagline">${this.photographer.tagline}</p>
            <p class="price">${this.photographer.price}€/jour</p>
        `;

        const link = document.createElement('a');
        link.href = `photographer.html?id=${this.photographer.id}`;
        link.appendChild(card);

        return link;
    }

    createPhotographerInfo() {
        const card = document.createElement('div');
        card.className = 'photograph__card';
        card.innerHTML = `
            <div class="card__content">
                <h1 class="content__title">${this.photographer.name}</h1>
                <p class="content__country">${this.photographer.city}, ${this.photographer.country}</p>
                <p class="content__citation">${this.photographer.tagline}</p>
            </div>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            <img src="/assets/photographers/${this.photographer.portrait}" alt="${this.photographer.name}" class="photographer__picture">
        `;

        return card;
    }

    createPhotographerCredit(totalLikes) {
        const credit = document.createElement('div');
        credit.className = 'credit';
        credit.innerHTML = `
            <div class="total__likes">
                <span>${totalLikes} likes</span>
                <i class="fa-solid fa-heart"></i>
            </div>
            <span>${this.photographer.price}€/jour</span>
        `;

        return credit;
    }
}
