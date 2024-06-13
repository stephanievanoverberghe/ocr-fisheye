document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.modal__form');
    const contactButtons = document.querySelectorAll('.contact_button');
    const modalCloseButton = document.querySelector('.modal__close');
    const successButton = document.getElementById('success-btn');
    const modalBody = document.querySelector('.modal__body');
    const modalSuccess = document.querySelector('.modal__success');
    const modal = document.getElementById('contact_modal');
    const firstFocusableElement = modal.querySelector('input, button, textarea');
    const focusableElements = modal.querySelectorAll('input, button, textarea');
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    window.displayModal = () => { // Define displayModal on window object
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        modal.addEventListener('click', outsideClickListener);
        modalCloseButton.addEventListener('click', closeModal);
        successButton.addEventListener('click', closeModal);
        document.addEventListener('keydown', trapTabKey);
        firstFocusableElement.focus();
    };

    const closeModal = () => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        modal.removeEventListener('click', outsideClickListener);
        modalCloseButton.removeEventListener('click', closeModal);
        successButton.removeEventListener('click', closeModal);
        document.removeEventListener('keydown', trapTabKey);
        form.classList.remove('hidden');
        modalSuccess.style.display = 'none';
        modalBody.style.display = 'block';
    };

    const outsideClickListener = (event) => {
        const modalContent = document.querySelector('.modal');
        if (!modalContent.contains(event.target)) {
            closeModal();
        }
    };

    const trapTabKey = (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) { // shift + tab
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault();
                    lastFocusableElement.focus();
                }
            } else { // tab
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }
        if (e.key === 'Escape') {
            closeModal();
        }
    };

    contactButtons.forEach(button => button.addEventListener('click', window.displayModal));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        console.log(data);
        form.classList.add('hidden');
        modalBody.style.display = 'none';
        modalSuccess.style.display = 'flex';
    });
});