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
    durationTime.innerText = `Czas trwania: ${convertedVideoDurationTime.minutes}:${convertedVideoDurationTime.seconds}`;

    //poprawić
    const convertedVideoCurrentTime = convertSeconds(Math.floor(video.currentTime));
    durationStamp.innerText = `Czas odtwarzania: ${convertedVideoCurrentTime.minutes}:${convertedVideoCurrentTime.seconds}`;

})

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
            break;
        case 'pause':
            video.pause();
            break;
        case 'volup':
            turnUpVoice();
            break;
        case 'voldown':
            turnDownVoice();
            break;
    }
};


btnsContainer.addEventListener('click', handleClickedButtons);




