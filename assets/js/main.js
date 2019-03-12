let cartCounter = 0;
let cartPrice = 0;
let cartCounterLabel = document.querySelector('#cart-counter');
let buttonsContainer = document.querySelector('.page-content');

let btnClickHandler = (e) => {
    let target = e.target;

    if (target.classList.contains('item-actions_cart')) {

        cartCounterLabel.innerHTML = `${++cartCounter}`;
        if (cartCounter === 1) cartCounterLabel.style.display = 'block';

        let restoreHTML = target.innerHTML;

        target.innerHTML = (() => {
            let tempPrice = target.parentElement.previousElementSibling.innerHTML;

            cartPrice += +tempPrice.replace(/^\$(\d+)\s\D+(\d+).*$/gu, '$1.$2');

            return `Added ${cartPrice.toFixed(2)} $`;
        })();

        buttonsContainer.removeEventListener('click', btnClickHandler);

        setTimeout((elem, restore) => {
            elem.innerHTML = restore;
            buttonsContainer.addEventListener('click', btnClickHandler);
        }, 2000, target, restoreHTML);
    }
};

buttonsContainer.addEventListener('click', btnClickHandler);