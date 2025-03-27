import {getInfoFromCollection} from './firebase';

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader') as HTMLDivElement;
    const content = document.getElementById('content') as HTMLDivElement;

    const productId = new URLSearchParams(window.location.search).get('id');
    if (!productId) {
        console.error('Product ID not found in URL');
        return;
    }

    getInfoFromCollection(productId)
        .then((data) => {
            if (data.length === 0) {
                console.error('No product data found');
                return;
            }

            const product = data[0];

            const metaImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
            if (metaImage) {
                metaImage.content = product.metaImgUrl;
            }
            

            const messageTitle = document.querySelector('.hero__title') as HTMLHeadingElement;
            messageTitle.innerText = product.messageTitle;
            const messageBody = document.querySelector('.hero__desc') as HTMLParagraphElement;
            messageBody.innerText = product.messageBody;

            const prodName = document.querySelector('.product__title') as HTMLHeadingElement;
            prodName.innerText = product.prodName;
            const prodDesc = document.querySelector('.product__desc') as HTMLParagraphElement;
            prodDesc.innerText = product.prodDesc;
            const prodPrice = document.querySelector('.product__price') as HTMLSpanElement;
            prodPrice.innerText = product.prodPrice.toString() + ' €';
            const prodId = document.querySelector(
                '.product__code'
            ) as HTMLVideoElement;
            prodId.innerText = product.prodId;

            const assistant__name =
                document.querySelectorAll('.assistant__name') as NodeListOf<HTMLSpanElement>;
            assistant__name.forEach((name) => {
                name.innerText = product.salesName;
            }
            );

        })
        .catch((error) => {
            console.error('Error fetching product data:', error);
        })
        .finally(() => {
            preloader.style.display = 'none';
            content.style.display = getConentDisplayType();
        });
    

    const getConentDisplayType = (): 'block' | 'grid' => {
        const width = window.innerWidth;

        if (width < 960) {
            return "block";
        } else {
            return "grid";
        }
    };

    if (!preloader || !content) return;

    videoHandler();
    heroVideoHandler();
});

const videoHandler = () => {
    const videoBtn = document.getElementById('video__btn') as HTMLButtonElement;
    const videoContainer = document.getElementById('video') as HTMLDivElement;
    const video = document.querySelector('.video video') as HTMLVideoElement;
    const preloadDiv = document.querySelector(
        '.video__preload'
    ) as HTMLDivElement;

    if (!videoBtn || !videoContainer || !video || !preloadDiv) return;

    let isSeeking = false;
    let isFullscreen = false;

    const captureThumbnail = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) return;

        video.currentTime = 5;

        video.addEventListener(
            'loadeddata',
            () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const imgDataUrl = canvas.toDataURL('image/jpeg');
                preloadDiv.style.backgroundImage = `url(${imgDataUrl})`;
            },
            { once: true }
        );

        video.load();
    };

    const openVideo = () => {
        videoContainer.style.display = 'none';
        video.style.display = 'block';
        video.play();

        isFullscreen = true;

        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if ((video as any).webkitRequestFullscreen) {
            (video as any).webkitRequestFullscreen();
        } else if ((video as any).msRequestFullscreen) {
            (video as any).msRequestFullscreen();
        }
    };

    const closeVideo = () => {
        if (isSeeking || isFullscreen) return;
        video.pause();
        video.style.display = 'none';
        videoContainer.style.display = 'flex';
    };

    videoBtn.addEventListener('click', openVideo);

    [
        'fullscreenchange',
        'webkitfullscreenchange',
        'msfullscreenchange',
    ].forEach((event) => {
        document.addEventListener(event, () => {
            isFullscreen = !!document.fullscreenElement;
            if (!isFullscreen) closeVideo();
        });
    });

    video.addEventListener('pause', () => {
        if (!isSeeking && !isFullscreen) closeVideo();
    });

    video.addEventListener('seeking', () => {
        isSeeking = true;
    });

    video.addEventListener('seeked', () => {
        isSeeking = false;
    });

    video.addEventListener('ended', () => {
        isFullscreen = false;
        closeVideo();
    });

    captureThumbnail();
};

const heroVideoHandler = () => {
    const videoBtn = document.getElementById('hero-video__btn') as HTMLButtonElement;
    const videoContainer = document.getElementById('hero-video') as HTMLDivElement;
    const video = document.querySelector('.hero__video video') as HTMLVideoElement;
    const preloadDiv = document.querySelector(
        '.hero__video-preload'
    ) as HTMLDivElement;

    if (!videoBtn || !videoContainer || !video || !preloadDiv) return;

    let isSeeking = false;
    let isFullscreen = false;

    const captureThumbnail = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) return;

        video.currentTime = 1;

        video.addEventListener(
            'loadeddata',
            () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const imgDataUrl = canvas.toDataURL('image/jpeg');
                preloadDiv.style.backgroundImage = `url(${imgDataUrl})`;
            },
            { once: true }
        );

        video.load();
    };

    const openVideo = () => {
        videoContainer.style.display = 'none';
        video.style.display = 'block';
        video.play();

        isFullscreen = true;

        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if ((video as any).webkitRequestFullscreen) {
            (video as any).webkitRequestFullscreen();
        } else if ((video as any).msRequestFullscreen) {
            (video as any).msRequestFullscreen();
        }
    };

    const closeVideo = () => {
        if (isSeeking || isFullscreen) return;
        video.pause();
        video.style.display = 'none';
        videoContainer.style.display = 'flex';
    };

    videoBtn.addEventListener('click', openVideo);

    [
        'fullscreenchange',
        'webkitfullscreenchange',
        'msfullscreenchange',
    ].forEach((event) => {
        document.addEventListener(event, () => {
            isFullscreen = !!document.fullscreenElement;
            if (!isFullscreen) closeVideo();
        });
    });

    video.addEventListener('pause', () => {
        if (!isSeeking && !isFullscreen) closeVideo();
    });

    video.addEventListener('seeking', () => {
        isSeeking = true;
    });

    video.addEventListener('seeked', () => {
        isSeeking = false;
    });

    video.addEventListener('ended', () => {
        isFullscreen = false;
        closeVideo();
    });

    captureThumbnail();
};

const purchaseBtn = document.querySelector(
    '.product__btn'
) as HTMLButtonElement;

purchaseBtn.addEventListener('click', () => {
    window.location.href = '/cart.html';
});

const chatBtn = document.querySelectorAll('.chat') as NodeListOf<HTMLDivElement>;

chatBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        window.location.href = '/chat.html';
    });
});
