// cuando es verdadero, mueve el mouse dibujando en el objeto canvas
let isDrawing = false;
let x = 0;
let y = 0;
var img = new Image();
img.src = "imgs/salon-sofa-rosa-4.jpg";

const myPics = document.getElementById('myPics');
const context = myPics.getContext('2d');
img.onload = function(){
    myPics.drawImage(img, 0, 0);
}

// evento.offsetX, event.offsetY da el offset (x,y) desde la esquina del canvas
// agrega el evento escuchador para mousedown, mousemove, and mouseup
myPics.addEventListener(
    'mousedown', e =>{
        x = e.offsetX;
        y = e.offsetY;
        isDrawing = true;
    }
);
myPics.addEventListener(
    'mousemove', e =>{
        if (isDrawing === true){
            drawLine(context, x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
        }
    }
);
window.addEventListener(
    'mouseup', e =>{
        if (isDrawing === true){
            drawLine(context, x, y, e.offsetX, e.offsetY);
            x = 0;
            y = 0;
            isDrawing = false;
        }
    }
);
function drawLine(context, x1, y1, x2, y2){
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
    context.closePath();
}
