class PhotographerCard {
    /**
     * Create a PhotographerCard instance
     * @param {} photographer 
     */
    constructor(photographer) {
        this.photographer = photographer;
    }

    createPhotographerCard() {
        const card = document.createElement('article');
        card.className = 'photographer__card';
        card.innerHTML = `
            <img src="${this.photographer.portrait}" alt="${this.photographer.name}" class="photographer__picture">
            <h2>${this.photographer.name}</h2>
            <p class="city__country">${this.photographer.city}, ${this.photographer.country}</p>
            <p class="tagline">${this.photographer.tagline}</p>
            <p class="price">${this.photographer.price}€/jour</p>
        `;

        const link = document.createElement('a');
        link.href = `photographer.html?id=${this.photographer.id}`;
        link.appendChild(card);

        return link;
    }
}