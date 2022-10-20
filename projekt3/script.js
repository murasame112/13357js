const recButtons = document.querySelectorAll(".recording_button");
window.addEventListener('DOMContentLoaded', (event) => {

    document.addEventListener('keypress', onKeyPress);
    recButtons.forEach(function(element){
        element.addEventListener('click', startRecording);
    });

});

const sounds = {
    'q': 'sound1',
    'w': 'sound2',
}

function onKeyPress(event){
    const sound = sounds[event.key];
    if (!sound) {
        return false;
    }else{
        playSound(sound);
    }
}

function playSound(sound){
    const audio = document.querySelector('#' + sound);
    audio.currentTime = 0;
    audio.play();
}
let ch1, ch2, ch3, ch4;
let channelArr;

function startRecording(){
    // przy kazdym kanale osobny button, z innym id - na podstawie tego id sprawdza na ktory kanal nadpisac - nadpisuje poprzez nadanie kanalowi klasy "recording" lub cos takiego
    id = parseInt(this.id.slice(6),10);
    document.addEventListener('keypress', getSound);
    const channel = document.querySelector("#channel"+id);
    channel.classList.add('recording');
}

function stopRecording(){
    const channel = document.querySelector('.recording');
    id = parseInt(channel.id.slice(7),10);
    // na podstawie id przypisuje channelArr do ch1/ch2/ch3/ch4
    // czysci channelArr
    // remove listener getSound
    // remove classlist recording
}

function getSound(){
    // bierze dzwiek i date now
    // do tablica/obiekt channelArr dodaje po prostu dzwiek i czas z date now
}