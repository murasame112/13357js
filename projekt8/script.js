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

let xValue = 0;
let yValue = 200;
let animation;
let balls = [];
let lines = [];

const drawButton = document.querySelector('#draw');
const initButton = document.querySelector('#init');
const xValueInput = document.querySelector('#xValue');
const yValueInput = document.querySelector('#yValue');
xValueInput.addEventListener('change', setDraw);
yValueInput.addEventListener('change', setDraw);
drawButton.addEventListener('click', executeDraw);
initButton.disabled = true; 
drawButton.disabled = true; 

// funkcja ustawia przycisk 'set' na mozliwy do klikniecia, gdy jest jakas wartosc w inpucie
function setDraw(){
    if((xValueInput.value.length != 0) && (yValueInput.value.length != 0)){
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
            ctx.lineWidth = 6;
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

class Line {
    constructor(moveToX, moveToY, lineToX, lineToY){
        this.moveToX = moveToX;
        this.moveToY = moveToY;
        this.lineToX = lineToX;
        this.lineToY = lineToY;
    }

    createLine(){
        ctx.beginPath();
        ctx.moveTo(this.moveToX,this.moveToY);
        ctx.lineTo(this.lineToX,this.lineToY);
        ctx.closePath();
        ctx.stroke();
    }

    draw(){
        this.createLine();
    }
}

function lineCheck(){

    for(let i= 0 ; i<balls.length;i++)
    {

        for(let j =0;j<balls.length;j++)
        {
            
            if(balls[i].xPosition != balls[j].xPosition && balls[i].yPosition != balls[j].yPosition )
            {
                let xA = 0;
                let xB = 0;
                let yA = 0;
                let yB = 0;

                xA = balls[i].xPosition;
                xB = balls[j].xPosition;
                yA = balls[i].yPosition;
                yB = balls[j].yPosition;

                const pythagoreanA = Math.pow((xA - xB),2);
                const pythagoreanB = Math.pow((yA - yB),2);
                const pythagoreanC = Math.sqrt(pythagoreanA + pythagoreanB);


                if(pythagoreanC <= yValue)
                {
                    let line = new Line(xA,yA,xB,yB)
                    lines.push(line);

                    lines.forEach(element =>{
                        element.draw();
                    })

                }
                
                
                   
            }
            lines = [];
        }
    }

}


function init(){
    balls =[];
    xValue = xValueInput.value;
    yValue = yValueInput.value;
    xValueInput.value = null;
    initButton.disabled = true; 

    for(let i = 0; i < xValue; i++)
    {
    
        let radius = Math.random() * (20 - 10) + 10;
        const speed = (-radius+21)/2;
        radius = radius*(1.5);
        const xPosition = Math.random() * ((maxWidth - radius)-radius) + radius;
        const yPosition = Math.random() * ((maxHeight - radius)-radius) + radius;
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

    lineCheck();
    lines.forEach(l =>{
        l.draw();
        
    })

    balls.forEach(element =>{
        element.draw();
    })
}


