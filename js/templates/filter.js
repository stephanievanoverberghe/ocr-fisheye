/**
 * Class representing a filter template.
 */
class FilterTemplate {
    /**
     * Create a FilterTemplate instance.
     * @param {HTMLElement} container - The container where the filter will be rendered.
     */
    constructor(container) {
        this.container = container;
    }

    /**
     * Render the filter template.
     */
    render() {
        const form = document.createElement('form');
        form.className = 'form';
        form.innerHTML = `
            <label for="sort" class="sort-by">Trier par</label>
            <select name="sort" id="sort" class="dropdown">
                <option value="popular">Popularité</option>
                <option value="date">Date</option>
                <option value="title">Titre</option>
            </select>
        `;
        return form;
    }
}
