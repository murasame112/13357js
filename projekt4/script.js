"use strict";
const createButton = document.querySelector('#new_note');
const singleNoteBox = document.querySelector('.single_note_box');
const noteList = document.querySelector('.notes');
let highestId = 0;
getNotes();
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

function clearNewNote(){
    const oldNote = document.querySelector('#new_note_div');
    if(oldNote != null){
        oldNote.remove();
    }
}

function createNewNote(){
    
    clearNewNote();
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
    const JSONnote = JSON.stringify(note);
    localStorage.setItem(note.id, JSONnote);
    getNotes();
    noteDiv.remove();
    
}


function getNotes(){
    let JSONnote; 
    let notes = [];
    let unpinnedNotes = [];
    
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }
    
    for(let i = 0; i < localStorage.length; i++){
        values[i] = JSON.parse(values[i]);
        notes.push(values[i]);
    }
    highestId = notes.at(-1).id;
    noteList.innerHTML = '';
    notes.forEach(function (element){
        if(element.pin){
            listNote(element);
        }else{
            unpinnedNotes.push(element);
        }
    });
    if( unpinnedNotes.length > 0){
        unpinnedNotes.forEach(function(element){
            listNote(element);
        });
    }

    const listedNotes = document.querySelectorAll('.listedNote');
    
    listedNotes.forEach(function(element){
        element.addEventListener('click', editNote);
    });
}

function listNote(note){
    const newListedNote = document.createElement('div');
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

    noteList.appendChild(newListedNote);
}

function editNote(){

    let noteId = this.id.slice(4);
    noteId = parseInt(noteId);
    
    createNewNote();
    const editedNote = document.querySelector('#new_note_div');
    editedNote.querySelector('#new_note_title').value = this.dataset.title;
    editedNote.querySelector('#new_note_content').value = this.dataset.content;
    editedNote.querySelector('#new_note_color').value = this.dataset.color;
    editedNote.querySelector('#new_note_title').dataset.id = noteId;
    if(this.dataset.pin == true || this.dataset.pin == 'true'){
        editedNote.querySelector('#new_note_pin').checked = true;
    }
    const saveButton = document.querySelector('#new_note_save');
    const additionals_div = document.querySelector('#additionals_div');

    saveButton.remove();

    const deleteButton = document.createElement('button');
    deleteButton.id = 'new_note_delete';
    deleteButton.addEventListener('click', deleteNote);
    deleteButton.innerHTML = 'Delete';

    const editButton = document.createElement('button');
    editButton.id = 'new_note_edit';
    editButton.addEventListener('click', saveEditedNote);
    editButton.innerHTML = 'Save';

    additionals_div.appendChild(deleteButton);
    additionals_div.appendChild(editButton);
    
}

function saveEditedNote(){

    const noteDiv = document.querySelector('#new_note_div');
    
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
    const JSONnote = JSON.stringify(note);
    localStorage.setItem(note.id, JSONnote);
    getNotes();
    noteDiv.remove();
}

function deleteNote(){
    const noteDiv = document.querySelector('#new_note_div');
    
    const id = noteDiv.querySelector('#new_note_title').dataset.id;
    localStorage.removeItem(id);
    clearNewNote();
    getNotes();
}