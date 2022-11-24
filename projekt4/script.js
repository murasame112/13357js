"use strict";
const createButton = document.querySelector('#new_note');
const singleNoteBox = document.querySelector('.single_note_box');
let highestId = 0;

window.addEventListener('DOMContentLoaded', (event) => {

    createButton.addEventListener('click', createNewNote);

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

function createNewNote(){
    // creating new note (front)
    const newNoteDiv = document.createElement('div');
    newNoteDiv.id = 'new_note_div';

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

    const saveButton = document.createElement('button');
    saveButton.id = 'new_note_save';
    saveButton.addEventListener('click', saveNewNote);
    saveButton.innerHTML = "Save";

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
    

}


function saveNewNote(){
    const noteDiv = document.querySelector('#'+this.parentElement.parentElement.id);
    highestId++;
    
    const title = noteDiv.querySelector('#new_note_title').value;
    const content = noteDiv.querySelector('#new_note_content').value;
    const color = noteDiv.querySelector('#new_note_color').value;
    let pin = false;
    if(noteDiv.querySelector('#new_note_pin').checked == true){
        pin = true;
    }
    const data = noteDiv.dataset.date;

    const note = new Note(highestId, title, content, color, pin, data);
    console.log(note);  
    localStorage.setItem(note.id, note);
    
}


//let note = localStorage.getItem(note.id);