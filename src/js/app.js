document.addEventListener('DOMContentLoaded', () => {

    const menuLinks = document.querySelectorAll('.link[data-goto]')
    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLinks => {
            menuLinks.addEventListener('click', onMenuLinkClick);
        });

        function onMenuLinkClick(e) {
            const menuLink = e.target;
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - 50;
                CloseMenu();
                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: 'smooth'
                });
                e.preventDefault();
            }
        }
    }

    let menuBtn = document.querySelector('.menu-btn');

    if (menuBtn) {
        let headerNav = document.querySelector('.header__nav');
        menuBtn.addEventListener('click', () => {
            if (menuBtn.classList.contains('active')) {
                CloseMenu();
            } else {
                OpenMenu();
            }
        })

        function CloseMenu() {
            menuBtn.classList.remove('active');
            headerNav.classList.remove('active');
        }

        function OpenMenu() {
            menuBtn.classList.add('active')
            headerNav.classList.add('active');
        }
    }

    const ch = document.querySelectorAll('.courses-item__checkbox')
    const hidden = document.querySelectorAll('input[name="courses"]')[0]
    const arr = []

    ch.forEach(el => {
        el.addEventListener('change', () => {
            if (el.checked) {
                arr.push(el.value)
                hidden.value = arr
            } else {
                if (arr.indexOf(el.value) !== -1) arr.splice(arr.indexOf(el.value), 1)
            }
        })
    })

    // очистка чекбоксов после отправки во всплывашке
    let forms = document.querySelectorAll('.wpcf7');
    forms.forEach(el => {
        el.addEventListener('wpcf7mailsent', () => {
            ch.forEach(el => {
                if (el.checked){
                    el.checked = false;
                }
            })
        }, false);
    })

    let phonesInputs = document.querySelectorAll('input[type="tel"]');
    phonesInputs.forEach(el => {
        el.setAttribute('onkeypress', 'maskPhone(event)')
        el.setAttribute('onpaste', 'onPastePhone(event)')
    })

    let brifElemCheckBox = document.querySelectorAll('.brif-elem .action label input');

    if (brifElemCheckBox.length != 0) {
        brifElemCheckBox.forEach(function (item) {
            item.addEventListener('click', (e) => {
                let parentPrice = item.closest('.brif-elem').querySelector('.counter');
                if (e.target.classList.contains('active')) {
                    let currentPrice = +e.target.getAttribute('data-price');
                    e.target.classList.remove('active');
                    parentPrice.innerHTML = +parentPrice.innerHTML - currentPrice;
                } else {
                    e.target.classList.add('active');
                    let currentPrice = +e.target.getAttribute('data-price');
                    parentPrice.innerHTML = Number(parentPrice.innerHTML) + currentPrice;
                }
            })
        })
    }

    let programmBtn = document.querySelectorAll('.programm__btn');

    if (programmBtn.length != 0) {
        programmBtn.forEach(function (item) {
            item.addEventListener('click', (e) => {
                if (e.target.classList.contains('active')) {
                    e.target.classList.remove('active');
                    e.target.nextElementSibling.style.maxHeight = 0 + 'px';
                    e.target.nextElementSibling.classList.remove('active');
                } else {
                    e.target.classList.add('active');
                    e.target.nextElementSibling.style.maxHeight = e.target.nextElementSibling.scrollHeight + 'px';
                    e.target.nextElementSibling.classList.add('active');
                }
            })
        })
        programmBtn[0].click();
    }

    let callPopupBtns = document.querySelectorAll('.call-popup');

    if (callPopupBtns.length != 0) {
        callPopupBtns.forEach(function (item) {
            item.addEventListener('click', () => {
                let popup = document.querySelector(".popup");
                if (popup.classList.contains('active')) {
                    ClosePopup(popup);
                } else {
                    OpenPopup(popup);
                }
            })
        })

        function ClosePopup(i) {
            i.classList.remove('active')
            document.body.style = 'auto';
        }

        function OpenPopup(i) {
            i.classList.add('active');
            document.body.style = 'hidden';
            document.addEventListener('click', (e) => {
                if (!e.target.closest(".call-popup") && !e.target.closest('.popup__item')) {
                    ClosePopup(i);
                }
            })
        }
    }
})

function maskPhone(e) {
    const mask = /\+7 \(\d{3}\) \d{3} \d{2} \d{2}/;
    var valSize = e.target.value.trim().replace(/\D/g, "").length;
    e = e || window.event;
    var key = e.keyCode || e.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\+/;
    if (!regex.test(key)) {
        e.returnValue = false;
        if (e.preventDefault) e.preventDefault();
    } else {
        if (valSize !== 0 && key === "+") {
            e.returnValue = false;
            return;
        }
        if (valSize === 0) {
            if (key === "8" || key === "7") {
                e.target.value = "+7";
                e.returnValue = false;
            } else if (key === "9") {
                e.target.value = "+7 (9";
                e.returnValue = false;
            } else if (key !== "+") {
                e.target.value = "+7 (9";
            } else if (key === "+" && e.target.value === "+") {
                e.returnValue = false;
            }
        } else if (valSize === 1) {
            e.target.value = "+7 (9";
            if (key === "9") {
                e.returnValue = false;
            }
        } else if (valSize === 4) {
            if (e.target.value.slice(-1) === ")") {
                e.target.value = e.target.value.trim() + " ";
            } else if (e.target.value.slice(-1) === " ") {
                return;
            } else e.target.value = e.target.value.trim() + ") ";
        } else if (valSize === 7 || valSize === 9) {
            if (e.target.value.slice(-1) === " ") {
                return;
            } else e.target.value = e.target.value.trim() + " ";
        } else if (valSize === 11) {
            e.returnValue = false;
        }
    }
}

function onPastePhone(e) {
    e.preventDefault();
    const mask = /(7|8)(9\d{2})(\d{3})(\d{2})(\d{2})/;
    var phone = e.clipboardData.getData('text/plain').replace(/\D/g, "");
    if (!mask.test(phone)) {
        e.returnValue = false;
        return;
    }
    var matched = phone.match(mask);
    e.target.value = "+7 (" + matched[2] + ") " + matched[3] + " " + matched[4] + " " + matched[5];
    e.returnValue = false;
}