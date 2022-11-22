// wieksze pochylenie = wieksza predkosc
const field = document.querySelector('#field');
const ball = document.querySelector('#ball');
const hole = document.querySelector('#hole');
const timeSpan = document.querySelector('#time');
const scoreSpan = document.querySelector('#score');
let time = 60;
let points = 0;
timeSpan.innerHTML=time;
scoreSpan.innerHTML=points;
let previous_alpha = 0;
let previous_beta = 90;




window.addEventListener('deviceorientation', onDeviceMove);
let timeInterval = setInterval(countTime, 1000);

function countTime(){
    if(time > 0){
        time--;
        timeSpan.innerHTML=time;
    }else{
        timeSpan.innerHTML=time;
        alert("Game finished, your points: "+points);
        clearInterval(timeInterval);
    }
}

function setBall(){
    const field_width = field.offsetWidth;
    const field_height = field.offsetHeight;
    const ball_width = ball.offsetWidth;
    const ball_height = ball.offsetHeight;
    const hole_left = hole.offsetLeft;
    const hole_top = hole.offsetTop;

    let left = hole_left;
    let top = hole_top;
    while(left == hole_left){
        left = Math.random() * ((field_width - ball_width) - 0) + 0;
    }
    while(top == hole_top){
        top = Math.random() * ((field_height - ball_height) - 0) + 0;
    }     

    ball.style.left = left+'px';
    ball.style.top = top+'px';

}

setBall();

function onDeviceMove(event) {
    animate(event.alpha, event.beta);
}

function animate(alpha, beta) {
    const ball_left = ball.offsetLeft;
    const ball_top = ball.offsetTop;
    
    if(alpha == previous_alpha){
        if(alpha > 0){
            ball.style.left = ball_left+1+'px';
        }else if(alpha < 0){
            ball.style.left = ball_left-1+'px';
        }

    }else if(alpha > previous_alpha){
        ball.style.left = ball_left+1+'px';
    }else if(alpha < previous_alpha){
        ball.style.left = ball_left-1+'px';   
    }
    previous_alpha = alpha;

    if(beta == previous_beta){
        if(beta > 90){
            ball.style.top = ball_top+1+'px';
        }else if(beta < 90){
            ball.style.top = ball_top-1+'px';
        }

    }else if(beta > previous_beta){
        ball.style.top = ball_top+1+'px';
    }else if(beta < previous_beta){
        ball.style.top = ball_top-1+'px';   
    }
    previous_beta = beta;

    if(ball.offsetLeft == hole.offsetLeft && ball.offsetTop == hole.offsetTop){
        points++;
        scoreSpan.innerHTML=points;
        setBall();
    }
    window.requestAnimationFrame(() => {animate(alpha, beta)});
 
}



