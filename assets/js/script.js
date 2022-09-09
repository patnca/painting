// Dados Iniciais
let currentColor = 'black';
let screen = document.querySelector('#tela');
let context = screen.getContext('2d');
let canDraw = false;
let mousex = 0;
let mousey = 0;

// Eventos
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);

document.querySelector('.clear').addEventListener('click', clearScreen);


// Funções
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

function mouseDownEvent(e) {
    canDraw = true;
    mousex = e.pageX - screen.offsetLeft;
    mousey = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
    if (canDraw) {
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent() {
    canDraw = false;
}

function draw(x,y) {
    let pointx = x - screen.offsetLeft;
    let pointy = y - screen.offsetTop;

    context.beginPath();
    context.lineWidth = 5;
    context.lineJoin = 'round';
    context.moveTo(mousex, mousey);
    context.lineTo(pointx, pointy);
    context.closePath();
    context.strokeStyle = currentColor;
    context.stroke();

    mousex = pointx;
    mousey = pointy;
}

function clearScreen() {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}