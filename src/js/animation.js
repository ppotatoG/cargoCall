const isMobile = window.innerWidth <= 767;

const compareAnimation = () => {
    const section = document.querySelector('.section-compare');
    const list = section.querySelectorAll('.text_contents');
    const rect = section.getBoundingClientRect();

    section.style.height = `${list.length}00vh`;

    const percent = Math.ceil(Math.abs(rect.top) / rect.height * 100);
    const curIndex = Math.floor(percent / (100 / list.length))
    const curPercent = percent * list.length % 100;

    if (list[curIndex]) {
        list.forEach(item => item.classList.remove('observer'));
        list[curIndex].classList.add('observer');
        section.classList.add('observer');

        if(curPercent <= 20) {
            list[curIndex].style.opacity = `${curPercent / 20}`;
            [...list[curIndex].children].forEach(item => {
                item.style.transform = `translateY(${curPercent - 20}px)`;
            });
        } else if(curPercent >= 80) {
            list[curIndex].style.opacity = `${20 / curPercent}`;
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

let isGifRunning = false;
const mapImg = document.querySelector('.map_img');
const changeGif = () => {
    const originalSrc = mapImg.src;

    if (!isGifRunning) {
        mapImg.src = originalSrc.replace(/jpg/, 'gif');
        isGifRunning = true;

        setTimeout(() => {
            mapImg.src = originalSrc;
            isGifRunning = false;
        }, 3000);
    }
}

const setThreshold = isMobile ? 0 : .2;
const io = new IntersectionObserver((entries, ob) => {
    entries.forEach(entry => {
        const target = entry.target;

        if (Boolean(target.dataset.observerCallback)) {
            switch (target.dataset.observerFucName) {
                case 'changeGif':
                    target.classList.add('observerIn');
                    setTimeout(() => changeGif(), 2500);
                    ob.unobserve(entry.target);
                    break;
                case 'compareAnimation':
                    if (isMobile) {
                        if (entry.isIntersecting) {
                            window.addEventListener('scroll', compareAnimation);
                        } else {
                            window.removeEventListener('scroll', compareAnimation);
                        }
                    } else {
                        return false;
                    }
                    break;
            }
        }

        else if (entry.isIntersecting) {
            target.classList.add('observerIn');
            ob.unobserve(entry.target);
        }
    })
}, { threshold: setThreshold })

const sections = document.querySelectorAll('[data-observer="true"]');

(() => {
    sections.forEach((el) => {
        io.observe(el);
    });

    mapImg.addEventListener('click', e => changeGif(e.target));
})();