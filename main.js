const video = document.querySelector('[data-video]');

const btnsContainer = document.querySelector('[data-buttons]');
// console.dir(btnsContainer);

const durationInfo = document.querySelector('[data-duration]');

video.addEventListener('durationchange', () => {
    let videoDurationTime = Math.floor(video.duration);
    let minutes = videoDurationTime / 60 < 10 ? `0${Math.trunc(video.duration / 60)}` : `${Math.trunc(videoDurationTime / 60)}`;
    let seconds = videoDurationTime % 60 < 10 ? `0${Math.trunc(video.duration % 60)}` : `${Math.trunc(videoDurationTime % 60)}`;
    durationInfo.innerText = `Czas trwania: ${minutes}:${seconds}`;
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




