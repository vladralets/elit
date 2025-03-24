document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader') as HTMLDivElement;
    const content = document.getElementById('content') as HTMLDivElement;

    const getConentDisplayType = (): 'block' | 'grid' => {
        const width = window.innerWidth;

        if (width < 960) {
            return "block";
        } else {
            return "grid";
        }
    };

    if (!preloader || !content) return;

    setTimeout(() => {
        preloader.style.display = 'none';
        content.style.display = getConentDisplayType();
    }, 2000);

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

// Product section
const purchaseBtn = document.querySelector(
    '.product__btn'
) as HTMLButtonElement;

purchaseBtn.addEventListener('click', () => {
    window.location.href = '/cart.html';
});
