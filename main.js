const video = document.querySelector('[data-video]');

const btnsContainer = document.querySelector('[data-buttons]');
// console.dir(btnsContainer);

const durationTime = document.querySelector('[data-duration]');
const durationStamp = document.querySelector('[data-stamp]');

const convertSeconds = timeToConvert =>{
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
    // let currentVoiceVolume = video.volume;
    // console.log(currentVoiceVolume);

    if (video.volume < 1) {
        video.volume += .1;
    }
};

const turnDownVoice = () => {
    // let currentVoiceVolume = video.volume;
    // console.log(currentVoiceVolume);

    if (video.volume > 0) {
        video.volume -= .1;
    }
};

const handleClickedButtons = e => {
    // console.log(e.target.parentElement.dataset);
    const btnId = Object.keys(e.target.parentElement.dataset);
    // console.log(btnId)
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
            video.currentTime = 0;
            video.pause();
            const pauseBtn2 = document.querySelector('[data-pause]');
            pauseBtn2.innerHTML = '<i class="fas fa-play"></i>';
            pauseBtn2.removeAttribute('data-pause');
            pauseBtn2.setAttribute('data-play', '');
            break;
    }
};

//dodano przycisk od stopu więc do ogarnięcia w handleClickedButtons
//wprowadzić zdarzenie volume i tutaj najpierw podgłaśnianie a później może jaka animacja żeby pokazywał się dopiero na kliknięcie na głośniczek


btnsContainer.addEventListener('click', handleClickedButtons);




