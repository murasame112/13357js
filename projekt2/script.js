let playSlidesInterval;
let slideCount
window.addEventListener('DOMContentLoaded', (event) => {
     
    slideCount = document.querySelectorAll('.slide').length;
    const buttonNext = document.querySelector('#next');
    const buttonPrev = document.querySelector('#prev');
    const buttonPlay = document.querySelector('#play');
    const buttonStop = document.querySelector('#stop');
    const eachButtonsDiv = document.querySelector('#eachButtonsDiv');

    for(let i = 0; i < slideCount; i++){
        let eachButton = document.createElement("button");
        eachButtonsDiv.appendChild(eachButton);
        let j = i+1;
        eachButton.id = 'b' + j + '';
        eachButton.innerHTML = j;
        eachButton.addEventListener('click', showSlide);
        
    }
    playSlidesInterval = setInterval(moveRight, 3000);

    buttonNext.addEventListener('click', moveRight);
    buttonPrev.addEventListener('click', moveLeft);
    buttonPlay.addEventListener('click', playSlides);
    buttonStop.addEventListener('click', stopSlides);


});

function moveRight(){
    let slideId = getMainSlideId();
    const mainSlide = document.querySelector('.main_slide');
    let newSlide, nextSlide;
    slideId++;
    if(slideId > 5){
        newSlide = document.querySelector('#slide1');
    }else{
        newSlide = document.querySelector('#slide' + slideId);
    }
    slideId++;
    if(slideId > 6){
        nextSlide = document.querySelector('#slide2');
    }else{
        nextSlide = document.querySelector('#slide' + slideId);
    }
    const subSlides = document.querySelectorAll('.sub_slide');
    
    mainSlide.classList.remove('main_slide');
    if(slideId != 7){
        mainSlide.classList.add('sub_slide');
    }
    
    subSlides.forEach(function(elem) {
        elem.classList.remove('sub_slide');
    });

    newSlide.classList.add('main_slide');

    if(nextSlide != null){
        nextSlide.classList.add('sub_slide');
    }
}

function moveLeft(){
    let slideId = getMainSlideId();
    const mainSlide = document.querySelector('.main_slide');
    let newSlide, nextSlide;
    slideId--;
    
    if(slideId < 1){
        newSlide = document.querySelector('#slide5');
    }else{
        newSlide = document.querySelector('#slide' + slideId);
    }
    slideId--;
    
    if(slideId < 0){
        nextSlide = document.querySelector('#slide4');
    }else{
        nextSlide = document.querySelector('#slide' + slideId);
    }
    const subSlides = document.querySelectorAll('.sub_slide');
    
    mainSlide.classList.remove('main_slide');
    if(slideId != -1){
        mainSlide.classList.add('sub_slide');
    }
    
    subSlides.forEach(function(elem) {
        elem.classList.remove('sub_slide');
    });

    newSlide.classList.add('main_slide');

    if(nextSlide != null){
        nextSlide.classList.add('sub_slide');
    }
    
}

function playSlides(){
    playSlidesInterval = setInterval(moveRight, 3000);
}

function stopSlides(){
    clearInterval(playSlidesInterval);
}

function showSlide(){
    let id = this.id;
    id = id.slice(1);
    id = parseInt(id, 10);

    const slides = document.querySelectorAll('.slide');  

    slides.forEach(function(elem) {
        elem.classList.remove('main_slide');
        elem.classList.remove('sub_slide');
    });
    let low_id = id-1;
    let high_id = id+1;
    const mainSlide = document.querySelector('#slide' + id);
    const low_slide = document.querySelector('#slide' + low_id);
    const high_slide = document.querySelector('#slide' + high_id);


    mainSlide.classList.add('main_slide');
    if(low_slide != null){
        low_slide.classList.add('sub_slide');
    }
    if(high_slide != null){
        high_slide.classList.add('sub_slide');
    }
    

    
}

function getMainSlideId(){
    slide = document.querySelector('.main_slide');
    let id = slide.id;
    id = id.slice(5);
    return id; 
}