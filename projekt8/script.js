// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc

const canvas = document.querySelector('#canva');
const ctx = canvas.getContext('2d');

// ===== potencjalna konfiguracja tych zmiennych
const maxWidth = 900;
const maxHeight = maxWidth;
const minWidth = 0;
const minHeight = minWidth;
// =====

let xValue=0;
let animation;
let balls =[];

const drawButton = document.querySelector('#draw');
const initButton = document.querySelector('#init');
const xValueInput = document.querySelector('#xValue');
xValueInput.addEventListener('change', setDraw);
drawButton.addEventListener('click', executeDraw);
initButton.disabled = true; 
drawButton.disabled = true; 

// funkcja ustawia przycisk 'set' na mozliwy do klikniecia, gdy jest jakas wartosc w inpucie
function setDraw(){
    if(xValueInput.value.length != 0){
        initButton.disabled = false;
        initButton.addEventListener('click', init);
    }else{
        initButton.disabled = true; 
    }
}

class Ball {

    constructor(xPosition, yPosition, radius,speed){
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.radius = radius;
        this.speed = speed;

        this.moveX = 1 * this.speed;
        this.moveY = 1 * this.speed;

    }

    createBall(){
        if (canvas.getContext) {
            ctx.beginPath();
            ctx.arc(this.xPosition, this.yPosition, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = '#49d169';
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    }

    draw()
    {
        this.createBall();
        
        if((this.xPosition + this.radius) > maxWidth)
        {
        this.moveX = -this.moveX;
        }

        if((this.xPosition - this.radius) < minWidth)
        {
        this.moveX = -this.moveX;
        }

        if((this.yPosition + this.radius) > maxHeight)
        {
            this.moveY = -this.moveY;
        }

        if((this.yPosition - this.radius) < minHeight)
        {
        this.moveY = -this.moveY;
        }

        this.xPosition += this.moveX;
        this.yPosition += this.moveY;

    }
}


function init(){
    balls =[];
    xValue = xValueInput.value;
    console.log(xValue);
    xValueInput.value = null;
    initButton.disabled = true; 

    for(let i = 0; i < xValue; i++)
    {
    
        const radius = Math.floor(Math.random() * 20) + 10;
        const speed = -radius+30;
        const xPosition = Math.floor(Math.random() * (maxWidth - radius-1)) + radius+1;
        const yPosition = Math.floor(Math.random() * (maxHeight - radius-1)) + radius+1;

        const ball = new Ball(xPosition, yPosition, radius, speed);
        balls.push(ball);
        drawButton.disabled = false; 
        cancelAnimationFrame(animation);
        ctx.clearRect(0, 0, maxWidth, maxHeight);
    }
}

function executeDraw(){
    drawButton.disabled = true; 
    animation = requestAnimationFrame(executeDraw);
    ctx.clearRect(0, 0, maxWidth, maxHeight);

    balls.forEach(element =>{
        element.draw();
    })
}


