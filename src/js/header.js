const header = document.querySelector('.header');
const menuBtn = document.querySelector('.menu_btn');

(() => {
    menuBtn.addEventListener('click', () => {
        header.classList.toggle('menuView')
    })
})();
