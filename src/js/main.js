const point = window.innerHeight;

const compareAnimation = () => {
    const section = document.querySelector('.section-compare');
    const list = section.querySelectorAll('.text_contents');
    const rect = section.getBoundingClientRect();

    section.style.height = `${list.length}00vh`;

    if(rect.top < 0 && Math.abs(rect.top) < rect.height) {
        const percent = Math.ceil(Math.abs(rect.top) / rect.height * 100);
        const curIndex = Math.floor(percent / (100 / list.length))
        const curPercent = percent * list.length % 100;

        list.forEach(item => item.classList.remove('observer'));
        list[curIndex].classList.add('observer');
        section.classList.add('observer');

        if(curPercent <= 20) {
            list[curIndex].style.opacity = `${curPercent / 20}`;
            [...list[curIndex].children].forEach(item => {
                item.style.transform = `translateY(${curPercent - 20}px)`;
            });
        } else if(curPercent >= 80) {
            list[curIndex].style.opacity = `${20/ curPercent}`;
            [...list[curIndex].children].forEach(item => {
                item.style.transform = `translateY(${curPercent - 80}px)`;
            })
        } else {
            list[curIndex].style.opacity = '1';
        }
    } else {
        return false;
    }
}

(() => {
    if(window.innerWidth <= 767) {
        window.addEventListener('scroll', compareAnimation);
    }
})();