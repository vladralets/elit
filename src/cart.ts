const checkoutBtn = document.querySelector(
    '#checkout-btn'
) as HTMLButtonElement;

checkoutBtn.addEventListener('click', () => {
    const modal = document.querySelector('.modal') as HTMLDivElement;
    modal.style.display = 'flex';

    const closeBtn = document.querySelector('#close-modal') as HTMLSpanElement;

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    const seeMoreBtn = document.querySelector(
        '#show-more'
    ) as HTMLButtonElement;

    seeMoreBtn.addEventListener('click', () => {
        console.log('clicked');

        window.location.href = 'https://visiodome.com/';
    });
});

const infoBtn = document.querySelector('#info-btn') as HTMLButtonElement;

infoBtn.addEventListener('click', () => {
    window.location.href = '/product.html';
});
