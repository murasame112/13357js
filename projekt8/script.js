// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc

// todo1 - kulki nie moga sie respic na innych kulkach
// todo2 - guzik "draw" jest wyszarzony dopóki nie ma wartości X wpisanej, a potem jesli ktos ja usunie lub go zwyczajnie kliknie
// todo3 - przeniesc generowanie kulek do init() z draw()

const canvas = document.querySelector('#canva');
const ctx = canvas.getContext('2d');

const drawButton = document.querySelector('#draw');
const initButton = document.querySelector('#init');
const xValue = document.querySelector('#xValue');

xValue.addEventListener('change', setDraw);

function setDraw(){
    if(xValue.value.length != 0){
        // todo2 od-szarzanie buttona
        initButton.addEventListener('click', init);
    }else{
        // todo2 wyszarzanie buttona
    }
}

drawButton.addEventListener('click', ()=>{setInterval(draw,1000)});
const radius = 10;
const maxWidth = 480;
const minWidth = 20;


function init(){
    

    
}



function draw() {
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //for(let i = 0; i < xValue.value; i++){
        let width = Math.random() * (maxWidth - minWidth) + minWidth;
        let height = Math.random() * (maxWidth - minWidth) + minWidth;
        if (canvas.getContext) {
            ctx.beginPath();
            ctx.arc(width, height, radius, 0, 2 * Math.PI);
            ctx.fillStyle = '#49d169';
            ctx.fill();
            ctx.stroke();
            ctx.save();
        }
    //}
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    ctx.stroke();
    
    
    //ctx.translate(5, 5);
    

    //ctx.restore();
  
    // // Earth
    // const time = new Date();
    // ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
    // ctx.translate(105, 0);
    // ctx.fillRect(0, -12, 40, 24); // Shadow
  
    // // Moon
    // ctx.save();
    // ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
    // ctx.translate(0, 28.5);
    // ctx.restore();
  
    // ctx.restore();
  
    // ctx.beginPath();
    // ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
    // ctx.stroke();
  
    //window.requestAnimationFrame(draw);
    

    // todo2 wyszarzanie buttona
}