const recButtons = document.querySelectorAll('.recording_button');
const stopButton = document.querySelector('#stop_recording');
const playButtons = document.querySelectorAll('.play_button');

let i = 0;
window.addEventListener('DOMContentLoaded', (event) => {

    document.addEventListener('keypress', onKeyPress);

    recButtons.forEach(function(element){
        element.addEventListener('click', startRecording);
    });

    stopButton.addEventListener('click', stopRecording);

    playButtons.forEach(function(element){
        element.addEventListener('click', play);
    });
    
});

const sounds = {
    'q': 'sound1',
    'w': 'sound2',
    'e': 'sound3'
}

function onKeyPress(event){
    const sound = sounds[event.key];
    if (!sound) {
        return false;
    }else{
        playSound(sound);
    }
}


let channels = [];
let channelArr = [];

function playSound(sound){
    const audio = document.querySelector('#' + sound);
    audio.currentTime = 0;
    audio.play();
    if(document.querySelectorAll('.recording').length > 0){
        channelArr[i] = [sound, Date.now()];
    }
    i++;
}

function startRecording(){
    // przy kazdym kanale osobny button, z innym id - na podstawie tego id sprawdza na ktory kanal nadpisac - nadpisuje poprzez nadanie kanalowi klasy "recording" lub cos takiego
    id = parseInt(this.id.slice(6),10);
    const channel = document.querySelector("#channel"+id);
    channel.classList.add('recording');
    i = 0;
    //TODO: wylaczyc guziki gdy nagrywanie wlaczone
}

function stopRecording(){
    const channel = document.querySelector('.recording');
    id = parseInt(channel.id.slice(7),10);
    channels[id] = channelArr;
    channelArr = [];
    channel.classList.remove('recording');
    //TODO: znowu wlaczyc guziki nagrywania
}


function play(){
    id = parseInt(this.id.slice(4),10);
    playSound(channels[id][0][0]);
    for(let k = 1; k < channels[id].length; k++){
        setTimeout(() => {playSound(channels[id][k][0])}, channels[id][k][1] - channels[id][k-1][1]);
    }
}
