
"use strict";
async function weatherApi(url){
    const response = await fetch(url);
    let data = await response.json();
    return data;
    }

//weatherApi('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=b32d84d770907c0b3e954927aed7ea88');

async function cityApi(url){
    const response = await fetch(url);
    let data = await response.json();
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
    let oldCity = document.querySelector('#new_city_div');
    if(oldCity != null){
        oldCity.remove();
    }
    oldCity = document.querySelector('#city_div');
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

    if(localStorage.length >= 10){
        alert("cannot save more than 10 cities");
        return false;
    }
    

    const cityDiv = document.querySelector('#new_city_div');
    const name = cityDiv.querySelector('#new_city_name').value;
    highestId++;
    const data = await cityApi('http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix='+name+'&languageCode=en');
    const d1 = data[Object.keys(data)[0]];
    const singleCity = d1[Object.keys(d1)[0]];

    const city = new City(highestId, name, singleCity.latitude, singleCity.longitude);

    const JSONcity = JSON.stringify(city);
    localStorage.setItem(city.id, JSONcity);
    getCities();
    cityDiv.remove();
    
}


async function showCity(){
    let cityId = this.id.slice(4);
    cityId = parseInt(cityId);
    let item = localStorage.getItem(cityId);
    item = JSON.parse(item);

    clearNewCity();
    const cityDiv = document.createElement('div');
    cityDiv.id = 'city_div';
    cityDiv.dataset.id = cityId;

    const nameDiv = document.createElement('div');
    nameDiv.id = 'name_div';
    const name = document.createElement('h2');
    name.id = 'city_name';
    name.innerHTML = item.name;

    const statsDiv = document.createElement('div');
    statsDiv.id = 'stats_div';
    const temperature = document.createElement('p');
    temperature.id = 'city_temperature';
    const humidity = document.createElement('p');
    humidity.id = 'city_humidity';

    const pictureDiv = document.createElement('div');
    pictureDiv.id = 'picture_div';
    const picture = document.createElement('img');
    picture.id = 'city_picture';

    const additionalsDiv = document.createElement('div');
    additionalsDiv.id = 'additionals_div';

    const deleteButton = document.createElement('button');
    deleteButton.id = 'city_delete';
    deleteButton.addEventListener('click', deleteCity);
    deleteButton.innerHTML = 'Delete';

    // picture url
    const lat = roundNumTo2(item.coordX);
    const lon = roundNumTo2(item.coordY);

    const data = await weatherApi('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=b32d84d770907c0b3e954927aed7ea88');

    const celsiusTemp = data.main.temp -273.15;
    temperature.innerHTML = 'Temperature (C): ' + roundNumTo2(celsiusTemp);
    humidity.innerHTML = 'Air humidity: ' + data.main.humidity + '%';
    // appending city (front)

    additionalsDiv.appendChild(deleteButton);
    pictureDiv.appendChild(picture);
    statsDiv.appendChild(temperature);
    statsDiv.appendChild(humidity);
    nameDiv.appendChild(name);    
    cityDiv.appendChild(nameDiv);
    cityDiv.appendChild(statsDiv);
    cityDiv.appendChild(pictureDiv);
    cityDiv.appendChild(additionalsDiv);
    singleCityBox.appendChild(cityDiv);

  
    
    
}

function roundNumTo2(num){
    num = Number(num);
    num = num.toFixed(2);
    num = Number(num);
    return num;
}




function getCities(){
    if(localStorage.length == 0){
        return false;
    }
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
    listedCities.forEach(function(element){
        element.addEventListener('click', showCity);
    });
    
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
    const cityId = document.querySelector('#city_div').dataset.id;
    localStorage.removeItem(cityId);
    clearNewCity();
    getCities();
}