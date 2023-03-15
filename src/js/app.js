document.addEventListener('DOMContentLoaded', ()=>{

    const menuLinks = document.querySelectorAll('.link[data-goto]')
    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLinks => {
            menuLinks.addEventListener('click', onMenuLinkClick);
        });

        function onMenuLinkClick(e) {
            const menuLink = e.target;
            if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY -50;
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
        menuBtn.addEventListener('click', ()=>{
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

    let brifElemCheckBox = document.querySelectorAll('.brif-elem .action label input');

    if (brifElemCheckBox.length != 0) {
        brifElemCheckBox.forEach(function(item){
            item.addEventListener('click', (e)=>{
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
        programmBtn.forEach(function(item){
            item.addEventListener('click', (e)=>{
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
        callPopupBtns.forEach(function(item){
            item.addEventListener('click', ()=>{
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
            document.addEventListener('click', (e)=> {
                if (!e.target.closest(".call-popup") && !e.target.closest('.popup__item')) {
                    ClosePopup(i);
                }
            })
        }
    }
})