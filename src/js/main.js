'use strict';

window.addEventListener("DOMContentLoaded", () => {

    /* Tabs */

    const   tabItems = document.querySelectorAll('.tabheader__item'),
            tabItemsParent = document.querySelector('.tabheader__items'),
            tabContent = document.querySelectorAll('.tabcontent');

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('fade');
        })

        tabItems.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent(i = 0) {
        tabItems[i].classList.add('tabheader__item_active');
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('fade');
    }

    tabItemsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabItems.forEach((item, index) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });

    hideTabContent();
    showTabContent();

    /* Timer */

    const deadline = '2021-05-11';

    function getTimeRemaining(endtime) {
        const   t = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(t / (1000 * 60 * 60 * 24)),  // 1000 * 60 * 60 * 24 - milsec in a day
                hours = Math.floor((t / (1000 * 60 * 60) % 24)), // (1000 * 60 * 60) % 24 - milsec in an hour
                minutes = Math.floor((t / 1000 / 60) % 60), // (1000 / 60) % 60 - milsec in a monute
                seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtiime) {
        const   timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtiime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                days.innerHTML = getZero(0);
                hours.innerHTML = getZero(0);
                minutes.innerHTML = getZero(0);
                seconds.innerHTML = getZero(0);
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    /* Modal */

    const   modalOpenBtn = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal'),
            modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    modalOpenBtn.forEach(item => {
        item.addEventListener('click', openModal)
    })

    modalCloseBtn.addEventListener('click', closeModal)

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal()
        }
    })

    // const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    /* Menu cards made with Classes */

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.rate = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.rate;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `   <img src="${this.src}" alt="${this.alt}">
                                    <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
                                    <div class="menu__item-descr">${this.descr}</div>
                                    <div class="menu__item-divider"></div>
                                    <div class="menu__item-price">
                                        <div class="menu__item-cost">Цена:</div>
                                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                                    </div>`;

            this.parent.append(element);
        }
    }

    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Фитнес',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '8.5',
        '.menu__field .container'
    ).render();

    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        '“Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        '20.5',
        '.menu__field .container',
        'menu__item'
    ).render();

    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Постное',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        '16',
        '.menu__field .container',
        'menu__item'
    ).render();

    /* Forms */

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    })

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const req = new XMLHttpRequest();
            req.open('POST', 'server.php');

            req.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            })

            const json = JSON.stringify(object);

            req.send(json);

            req.addEventListener('load', () => {
                if (req.status === 200) {
                    console.log(req.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }
});