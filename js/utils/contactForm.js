const form = document.querySelector(".modal__form");
const contactButtons = document.querySelectorAll(".contact_button");
const modalCloseButton = document.querySelector(".modal__close");
const successButton = document.getElementById("success-btn");
const modalBody = document.querySelector(".modal__body");
const modalSuccess = document.querySelector(".modal__success");

const displayModal = () => {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "flex";
    modal.addEventListener('click', outsideClickListener);
};

const closeModal = () => {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.removeEventListener('click', outsideClickListener);
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

document.addEventListener('DOMContentLoaded', () => {
    contactButtons.forEach(button => button.addEventListener('click', displayModal));
    modalCloseButton.addEventListener('click', closeModal);
    successButton.addEventListener('click', closeModal);

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
