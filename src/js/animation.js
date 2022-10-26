const isMobile = window.innerWidth <= 767;

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

    if( isMobile ) {
        $(".slick").slick({
            vertical: true,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: false,
            verticalSwiping: true
        });
    }
})();