const player = document.querySelector('[data-player]');
const video = document.querySelector('[data-video]');
const btnsContainer = document.querySelector('[data-buttons]');
const durationContainer = document.querySelector('.duration-time');
const durationTime = document.querySelector('[data-duration]');
const durationStamp = document.querySelector('[data-stamp]');
const volumeBtn = document.querySelector('[data-volume]');
const inputVolume = document.querySelector('[data-videovolume]');
const fullScreenBtn = document.querySelector('[data-fullscreen]');
let isMuted = false;
let isFullScreen = false;

const convertSeconds = timeToConvert => {
    let minutes = timeToConvert / 60 < 10 ? `0${Math.trunc(timeToConvert / 60)}` : `${Math.trunc(timeToConvert / 60)}`;
    let seconds = timeToConvert % 60 < 10 ? `0${Math.trunc(timeToConvert % 60)}` : `${Math.trunc(timeToConvert % 60)}`;
    let convertedSeconds = {};
    convertedSeconds = {...convertedSeconds, minutes, seconds};
    return convertedSeconds;
}

video.addEventListener('durationchange', () => {
    const convertedVideoDurationTime = convertSeconds(Math.floor(video.duration));
    durationTime.innerText = `${convertedVideoDurationTime.minutes}:${convertedVideoDurationTime.seconds}`;
})

video.addEventListener('timeupdate', () => {
    const convertedVideoCurrentTime = convertSeconds(Math.floor(video.currentTime));
    durationStamp.innerText = `${convertedVideoCurrentTime.minutes}:${convertedVideoCurrentTime.seconds}`;
});

const turnUpVoice = () => {
    if (video.volume < 1) {
        video.volume += .1;
    }
};

const turnDownVoice = () => {
    if (video.volume > 0) {
        video.volume -= .1;
    }
};

const handleClickedButtons = e => {
    const btnId = Object.keys(e.target.parentElement.dataset);
    switch (btnId[0]) {
        case 'play':
            video.play();
            const playBtn = document.querySelector('[data-play]');
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playBtn.removeAttribute('data-play');
            playBtn.setAttribute('data-pause', '');
            break;
        case 'pause':
            video.pause();
            const pauseBtn = document.querySelector('[data-pause]');
            pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            pauseBtn.removeAttribute('data-pause');
            pauseBtn.setAttribute('data-play', '');
            break;
        case 'stop':
            const isPlaying = document.querySelector('[data-pause]');
            if (isPlaying) {
                isPlaying.innerHTML = '<i class="fas fa-play"></i>';
                isPlaying.removeAttribute('data-pause');
                isPlaying.setAttribute('data-play', '');
            }
            video.currentTime = 0;
            video.pause();
            video.volume = 1;
            inputVolume.value = 1;          
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            break;
    }
};

handleVideoVolume = e => {
    video.volume = e.target.value;
    if (video.volume == 0) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
    if (video.volume <= .5 && video.volume > 0) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    }
    if (video.volume > .5) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
};

handleMuteVideo = () => {
    if (!isMuted) {
        video.volume = 0;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        isMuted = !isMuted;
    } else {
        video.volume = 1;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        isMuted = !isMuted;
    }
}

handleFullscreen = () => {
    if (!isFullScreen) {
        player.classList.add('player-fullscreen');
        video.classList.add('video-fullscreen');
        btnsContainer.classList.add('btns-fullscreen');
        durationContainer.classList.add('duration-fullscreen');
        fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        isFullScreen = !isFullScreen;
    } else {
        player.classList.remove('player-fullscreen');
        video.classList.remove('video-fullscreen');
        btnsContainer.classList.remove('btns-fullscreen');
        durationContainer.classList.remove('duration-fullscreen');
        fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        isFullScreen = !isFullScreen;
    }
}

//wprowadzić zdarzenie volume i tutaj najpierw podgłaśnianie a później może jaka animacja żeby pokazywał się dopiero na kliknięcie na głośniczek

btnsContainer.addEventListener('click', handleClickedButtons);
inputVolume.addEventListener('change', handleVideoVolume);
volumeBtn.addEventListener('click', handleMuteVideo);
fullScreenBtn.addEventListener('click', handleFullscreen);



