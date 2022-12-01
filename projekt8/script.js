// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc

// todo1 - kulki nie moga sie respic na innych kulkach
// todo2 - guzik "draw" jest wyszarzony dopóki nie ma wartości X wpisanej, a potem jesli ktos ja usunie lub go zwyczajnie kliknie

const canvas = document.querySelector('#canva');
const ctx = canvas.getContext('2d');

const drawButton = document.querySelector('#draw');
const xValue = document.querySelector('#xValue');

xValue.addEventListener('change', setDraw);

function setDraw(){
    if(xValue.value.length != 0){
        // todo2 od-szarzanie buttona
        drawButton.addEventListener('click', draw);
    }else{
        // todo2 wyszarzanie buttona
    }
}



const maxWidth = 475;
const minWidth = 25;


  


function draw() {
    for(let i = 0; i < xValue.value; i++){
        let width = Math.random() * (maxWidth - minWidth) + minWidth;
        let height = Math.random() * (maxWidth - minWidth) + minWidth;
        if (canvas.getContext) {
            ctx.beginPath();
            ctx.arc(width, height, 10, 0, 2 * Math.PI);
            ctx.stroke();
    
        }
    }
    

    // todo2 wyszarzanie buttona
}