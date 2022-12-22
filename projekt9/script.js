async function funcName(url){
    const response = await fetch(url);
    let data = await response.json();
    console.log(data);
    }

funcName('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=b32d84d770907c0b3e954927aed7ea88');

"use strict";
const createButton = document.querySelector('#new_city');
const singleCityBox = document.querySelector('.single_city_box');
const cityList = document.querySelector('.cities');
let highestId = 0;
getCities();
window.addEventListener('DOMContentLoaded', (event) => {

    createButton.addEventListener('click', createNewCity);

});



class Note{
    constructor(id, title, content, color, pin, data){
        this.id = id;
        this.title = title;
        this.content = content;
        this.color = color;
        this.pin = pin;
        this.data = data;
    }
}

function clearNewCity(){
    const oldCity = document.querySelector('#new_city_div');
    if(oldCity != null){
        oldCity.remove();
    }
}

function createNewCity(){
    
    clearNewCity();
    const newCityDiv = document.createElement('div');
    newCityDiv.id = 'new_city_div';

    // =====
    const subTitleDiv = document.createElement('div');
    subTitleDiv.id = 'sub_title_div';
    const title = document.createElement('input');
    title.type = 'text';
    title.id = 'new_note_title';
    title.placeholder = 'Title';

    const pinDiv = document.createElement('div');
    pinDiv.id = 'pin_div';
    const pinLabel = document.createElement('label');
    pinLabel.innerHTML = 'pin';
    const pin = document.createElement('input');
    pin.type = 'checkbox';
    pin.id = 'new_note_pin';

    const content = document.createElement('textarea');
    content.id = 'new_note_content';
    content.placeholder = 'Content';

    const additionalsDiv = document.createElement('div');
    additionalsDiv.id = 'additionals_div';

    const colorDiv = document.createElement('div');
    colorDiv.id = 'color_div';
    const colorLabel = document.createElement('label');
    colorLabel.innerHTML = 'color (hex):';
    const color = document.createElement('input');
    color.type = 'text';
    color.id = 'new_note_color';
    color.placeholder = '#000000';

    /// =====

    const saveButton = document.createElement('button');
    saveButton.id = 'new_city_save';
    saveButton.addEventListener('click', saveNewCity);
    saveButton.innerHTML = "Save";

    // =====
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;

    newNoteDiv.dataset.date = formattedToday;


    // appending new note (front)

    colorDiv.appendChild(colorLabel);
    colorDiv.appendChild(color);
    additionalsDiv.appendChild(colorDiv);
    additionalsDiv.appendChild(saveButton);
    pinDiv.appendChild(pinLabel);
    pinDiv.appendChild(pin);
    subTitleDiv.appendChild(title);
    subTitleDiv.appendChild(pinDiv);
    newNoteDiv.appendChild(subTitleDiv);
    newNoteDiv.appendChild(content);
    newNoteDiv.appendChild(additionalsDiv);
    singleNoteBox.appendChild(newNoteDiv);
    // =====
    
}


function saveNewCity(){
    const cityDiv = document.querySelector('#new_city_div');
    highestId++;
    
    // =====
    const title = noteDiv.querySelector('#new_note_title').value;
    const content = noteDiv.querySelector('#new_note_content').value;
    const color = noteDiv.querySelector('#new_note_color').value;
    let pin = false;
    if(noteDiv.querySelector('#new_note_pin').checked == true){
        pin = true;
    }
    const data = noteDiv.dataset.date;

    const note = new Note(highestId, title, content, color, pin, data);
    // =====
    const JSONcity = JSON.stringify(city);
    localStorage.setItem(city.id, JSONcity);
    getCities();
    cityDiv.remove();
    
}


function getCities(){
    let cities = [];
    let unpinnedCities = [];
    
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }
    
    for(let i = 0; i < localStorage.length; i++){
        values[i] = JSON.parse(values[i]);
        cities.push(values[i]);
    }
    highestId = cities.at(-1).id;
    cityList.innerHTML = '';
    cities.forEach(function (element){
        if(element.pin){
            listCity(element);
        }else{
            unpinnedCities.push(element);
        }
    });
    if( unpinnedCities.length > 0){
        unpinnedCities.forEach(function(element){
            listCity(element);
        });
    }

    const listedCities = document.querySelectorAll('.listed_city');
    
    listedCities.forEach(function(element){
        element.addEventListener('click', editCity);
    });
}

function listCity(city){
    const newListedCity = document.createElement('div');
    // =====
    newListedNote.id = 'note'+note.id;
    newListedNote.classList.add('listedNote');
    newListedNote.dataset.title = note.title;
    newListedNote.dataset.content = note.content;
    newListedNote.dataset.color = note.color;
    newListedNote.dataset.pin = note.pin;
    newListedNote.dataset.data = note.data;

    const title = document.createElement('h2');
    title.innerHTML = note.title;
    newListedNote.appendChild(title);
    // =====
    cityList.appendChild(newListedCity);
}

function editCity(){

    let cityId = this.id.slice(4);
    cityId = parseInt(cityId);
    
    createNewCity();
    const editedCity = document.querySelector('#new_city_div');
    // =====
    editedNote.querySelector('#new_note_title').value = this.dataset.title;
    editedNote.querySelector('#new_note_content').value = this.dataset.content;
    editedNote.querySelector('#new_note_color').value = this.dataset.color;
    editedNote.querySelector('#new_note_title').dataset.id = noteId;
    if(this.dataset.pin == true || this.dataset.pin == 'true'){
        editedNote.querySelector('#new_note_pin').checked = true;
    }
    // =====
    const saveButton = document.querySelector('#new_city_save');
    const additionals_div = document.querySelector('#additionals_div');

    saveButton.remove();

    const deleteButton = document.createElement('button');
    deleteButton.id = 'new_city_delete';
    deleteButton.addEventListener('click', deleteCity);
    deleteButton.innerHTML = 'Delete';

    const editButton = document.createElement('button');
    editButton.id = 'new_city_edit';
    editButton.addEventListener('click', saveEditedCity);
    editButton.innerHTML = 'Save';

    additionals_div.appendChild(deleteButton);
    additionals_div.appendChild(editButton);
    
}

function saveEditedCity(){

    const cityDiv = document.querySelector('#new_city_div');
    
    // =====
    const id = noteDiv.querySelector('#new_note_title').dataset.id;
    const title = noteDiv.querySelector('#new_note_title').value;
    const content = noteDiv.querySelector('#new_note_content').value;
    const color = noteDiv.querySelector('#new_note_color').value;
    let pin = false;
    if(noteDiv.querySelector('#new_note_pin').checked == true){
        pin = true;
    }
    const data = noteDiv.dataset.date;

    const note = new Note(id, title, content, color, pin, data);
    // ====
    const JSONcity = JSON.stringify(city);
    localStorage.setItem(city.id, JSONcity);
    getCities();
    cityDiv.remove();
}

function deleteCity(){
    const cityDiv = document.querySelector('#new_city_div');
    
    const id = cityDiv.querySelector('#new_city_title').dataset.id;
    localStorage.removeItem(id);
    clearNewCity();
    getCities();
}