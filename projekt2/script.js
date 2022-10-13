window.addEventListener('DOMContentLoaded', (event) => {
    const slides = document.querySelectorAll('.slide');   
    const slideCount = document.querySelectorAll('.slide').length;
    const button = document.querySelector('#next');


    button.addEventListener('click', () => {
        let slideId = getMainSlideId();
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
    });

});

function getMainSlideId(){
    slide = document.querySelector('.main_slide');
    let id = slide.id;
    id = id.slice(5);
    return id; 
}