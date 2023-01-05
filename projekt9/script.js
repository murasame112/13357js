
"use strict";
async function weatherApi(url){
    const response = await fetch(url);
    let data = await response.json();
    console.log(data);
    }

//weatherApi('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=b32d84d770907c0b3e954927aed7ea88');

async function cityApi(url){
    const response = await fetch(url);
    let data = await response.json();
    //console.log(data);
    return data;
    }

//cityApi('http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix=London');



const createButton = document.querySelector('#new_city');
const singleCityBox = document.querySelector('.single_city_box');
const cityList = document.querySelector('.cities');
let highestId = 0;
getCities();
window.addEventListener('DOMContentLoaded', (event) => {

    createButton.addEventListener('click', addCity);

});

class City{
    constructor(id, name, coordX, coordY){
        this.id = id;
        this.name = name;
        this.coordX = coordX;
        this.coordY = coordY;
    }
}

function clearNewCity(){
    const oldCity = document.querySelector('#new_city_div');
    if(oldCity != null){
        oldCity.remove();
    }
}

function addCity(){
    clearNewCity();
    const newCityDiv = document.createElement('div');
    newCityDiv.id = 'new_city_div';
    newCityDiv.className = 'new_city_div';
    const subNameDiv = document.createElement('div');
    subNameDiv.id = 'sub_name_div';
    const name = document.createElement('input');
    name.type = 'text';
    name.id = 'new_city_name';
    name.placeholder = 'Name of the city';
    const additionalsDiv = document.createElement('div');
    additionalsDiv.id = 'new_additionals_div';

    const saveButton = document.createElement('button');
    saveButton.id = 'new_city_save';
    saveButton.addEventListener('click', saveNewCity);
    saveButton.innerHTML = "Save";

    subNameDiv.appendChild(name);
    newCityDiv.appendChild(subNameDiv);
    singleCityBox.appendChild(newCityDiv);
    additionalsDiv.appendChild(saveButton);
    newCityDiv.appendChild(additionalsDiv);

}

async function saveNewCity(){
    const cityDiv = document.querySelector('#new_city_div');
    const name = cityDiv.querySelector('#new_city_name').value;
    highestId++;
    const data = await cityApi('http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix='+name);
    const d1 = data[Object.keys(data)[0]];
    const singleCity = d1[Object.keys(d1)[0]];

    const city = new City(highestId, name, singleCity.latitude, singleCity.longitude);

    const JSONcity = JSON.stringify(city);
    localStorage.setItem(city.id, JSONcity);
    getCities();
    cityDiv.remove();
    
}


function showCity(){
    let cityId = this.id.slice(4);
    cityId = parseInt(cityId);
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

    // tu edit stary
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
    //const saveButton = document.querySelector('#new_city_save');
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





function getCities(){
    let cities = [];
    
    let values = [],
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
        listCity(element);
    });

    const listedCities = document.querySelectorAll('.listed_city');
    
}

function listCity(city){
    const newListedCity = document.createElement('div');
    newListedCity.id = 'city'+city.id;
    newListedCity.classList.add('listed_city');
    newListedCity.dataset.name = city.name;
    newListedCity.dataset.coordX = city.coordX;
    newListedCity.dataset.coordY = city.coordY;

    const name = document.createElement('h2');
    name.innerHTML = city.name;
    newListedCity.appendChild(name);
    cityList.appendChild(newListedCity);
}





function deleteCity(){
    const cityDiv = document.querySelector('#new_city_div');
    
    const id = cityDiv.querySelector('#new_city_title').dataset.id;
    localStorage.removeItem(id);
    clearNewCity();
    getCities();
}