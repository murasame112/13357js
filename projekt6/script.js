// wieksze pochylenie = wieksza predkosc
let field = document.querySelector('#field');
let ball = document.querySelector('#ball');
let hole = document.querySelector("#hole");
window.addEventListener('deviceorientation', onDeviceMove);

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
    requestAnimationFrame(animate)
}
let i = 5;
function animate() {

    
    i++;
    requestAnimationFrame(animate)
}

