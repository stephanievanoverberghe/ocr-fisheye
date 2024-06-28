export class Photographer {
  /**
   * Create a Photographer instance.
   * @param {Object} data - The photographer data.
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
  }
}