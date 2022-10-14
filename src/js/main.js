const point = window.innerHeight;

const mainSubAnimation = () => {
    const el = document.querySelector('.js-test');
    const rect = el.getBoundingClientRect();

    if((rect.top < point * -1 || rect.top > point)) {
        return false;
    }

    if(rect.top <= point - point * .1) {
        const percent = Math.ceil(49 - rect.top / rect.height * 100);
        const h2 = el.querySelectorAll('h2');

        const opaPer = percent * 100;
        const tranYPer = 20 / percent * 100;

        if (percent > 25 && percent < 50) {
            console.log(percent)
            console.log(percent * percent / 25)
            // console.log(tranYPer)
        }
    }
}

(() => {
    // window.addEventListener('scroll', mainSubAnimation);
})();