let playSlidesInterval;
let slideCount
window.addEventListener('DOMContentLoaded', (event) => {
    const slides = document.querySelectorAll('.slide');   
    slideCount = document.querySelectorAll('.slide').length;
    const buttonNext = document.querySelector('#next');
    const buttonPrev = document.querySelector('#prev');
    const buttonPlay = document.querySelector('#play');
    const buttonStop = document.querySelector('#stop');

    //playSlidesInterval = setInterval(moveRight, 3000);

    buttonNext.addEventListener('click', moveRight);
    buttonPrev.addEventListener('click', moveLeft);
    buttonPlay.addEventListener('click', playSlides);
    buttonStop.addEventListener('click', stopSlides);


});

function moveRight(){
    let slideId = getMainSlideId();
    if(slideId == slideCount-1){
        rerollRight();
        return 0;
    }
    const mainSlide = document.querySelector('.main_slide');
    slideId++;
    const newSlide = document.querySelector('#slide' + slideId + '');
    slideId++;
    const nextSlide = document.querySelector('#slide' + slideId + '');
    const subSlides = document.querySelectorAll('.sub_slide');
    
    mainSlide.classList.remove('main_slide');
    mainSlide.classList.add('sub_slide');
    
    subSlides.forEach(function(elem) {
        elem.classList.remove('sub_slide');
    });

    newSlide.classList.add('main_slide');

    nextSlide.classList.add('sub_slide');
}

function moveLeft(){
    let slideId = getMainSlideId();
    const mainSlide = document.querySelector('.main_slide');
    slideId--;
    const newSlide = document.querySelector('#slide' + slideId + '');
    slideId--;
    const nextSlide = document.querySelector('#slide' + slideId + '');
    const subSlides = document.querySelectorAll('.sub_slide');
    
    mainSlide.classList.remove('main_slide');
    mainSlide.classList.add('sub_slide');
    
    subSlides.forEach(function(elem) {
        elem.classList.remove('sub_slide');
    });

    newSlide.classList.add('main_slide');

    nextSlide.classList.add('sub_slide');
}

function playSlides(){
    playSlidesInterval = setInterval(moveRight, 3000);
}

function stopSlides(){
    clearInterval(playSlidesInterval);
}

function rerollRight(){
    console.log("sadf");
    
}

function getMainSlideId(){
    slide = document.querySelector('.main_slide');
    let id = slide.id;
    id = id.slice(5);
    return id; 
}