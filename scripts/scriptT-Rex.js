document.addEventListener('keydown', function(evento){
    if (evento.keyCode == 32){
        if(nivel.muerto == false){
            saltar();
        }else{
            nivel.velocidad = 9;
            nube.velocidad = 2;
            cactus.x = ancho + 100;
            nube.x = ancho + 100;
            nivel.marcador = 0;
            nivel.muerto = false;
        }
    }
});

var imgRex, imgNube, imgCactus, imgSuelo;
/**
 * ctx => contexto, canvas => lienzo
 */
var ancho = 700;
var alto = 300;
var canvas, ctx;  

function cargaImagenes(){
    imgRex = new Image();
    imgNube = new Image();
    imgCactus = new Image();
    imgSuelo = new Image();
    imgRex.src = "imgs/t-rex.jpg";
    imgNube.src = "imgs/nube.jpg";
    imgCactus.src = "imgs/cactus.png";
    imgSuelo.src = "imgs/suelo.jpg";
}

/**
 * lo mas sensillo para borrar el lienzo, es cambiarle la anchura 
 * en el momento en el que se cambia, se borra todo.
 * es la solucion mas optima, la mas rapida.
 */
function borrarCanvas(){
    // console.log("borrando canvas");
    canvas.width = ancho;
    canvas.heigth = ancho;
}

/**
 * trex: 
 * Es un objeto sensillo, es una estructura en la que
 * vamos a guardar varias variables, atributos a saber:
 * y => para saber la posicion vertical
 * vy => la velocidad de y, cuantos pixeles tiene que poner o quitar
 * osea a que velocidad esta subiendo o bajando
 * salto => que se mueva a 28 pixeles por fotograma
 * pero cada vez que pase un fotograma le vamos a restar 2
 * entonces va a avanzar 28, luego 26, luego 24,.., cada vez mas despacito
 * hasta que llegue a negativo y baje de nuevo.
 * vymax => velocidad maxima a la que baje porque no queremos que se 
 * acelere hasta un punto que sea infinito
 * saltando => saber si esta saltando o no
 */
var suelo = 200;
var trex = {y: suelo, 
            vy: 0, 
            gravedad:2, 
            salto:28, 
            vymax:9, 
            saltando:false};
var nivel = {velocidad:9, marcador: 0, muerto: false};
var cactus = {x: ancho + 100,y: suelo-25}; 
var nube = {x: 400, y: 100, velocidad: 3};
var suelog = {x:0, y: suelo + 30};

function dibujaRex(){
    ctx.drawImage(imgRex,0,0,64,69,100,trex.y,50,50);
}

function dibujaCactus(){
    ctx.drawImage(imgCactus,0,0,38,75,cactus.x, cactus.y,38,75);
}

function dibujaNube(){
    ctx.drawImage(imgNube,0,0,82,25,nube.x, nube.y,82,25);
}

function dibujaSuelo(){
    ctx.drawImage(imgSuelo,suelog.x,0,700,37,0, suelog.y,700,37);    
}

function logicaSuelo(){
    if(suelog.x > 700){
        suelog.x = 0;
    }else{
        suelog.x += nivel.velocidad;
    }
}


function logicaCactus(){
    if (cactus.x < - 100){
        cactus.x = ancho + 100;
        nivel.marcador++;
    }else{
        cactus.x -= nivel.velocidad;
    }
}

function logicaNube(){
    if (nube.x < - 100){
        nube.x = ancho + 100;
    }else{
        nube.x -= nube.velocidad;
    }
}

function saltar(){
    trex.saltando = true;
    trex.vy = trex.salto;
}

function gravedad(){
    
    if (trex.saltando == true){
        // console.log("trex.y - trex.vy - trex.gravedad > suelo");
        if (trex.y - trex.vy - trex.gravedad > suelo){
            trex.saltando =  false;
            trex.vy = 0;
            trex.y = suelo;
        }
        else{
            // console.log("else_gravedad");
            trex.vy -= trex.gravedad;
            trex.y -= trex.vy;     
        }
    }
}

function colision(){

    if(cactus.x >= 100 && cactus.x <= 150){
        if(trex.y >= suelo-25){
            nivel.muerto = true;
            nivel.velocidad = 0;
            nube.velocidad = 0
        }
    }
}

function puntuacion(){
    ctx.font = "30px impact";
    ctx.fillStyle = "#555555";
    ctx.fillText(`${nivel.marcador}`, 600,50);

    if(nivel.muerto == true){
        ctx.font = "60px impact";
        ctx.fillText(`GAME OVER`,240,150);
    }
}

//  BUCLE PRINCIPAL

/**
 * ejecutar principal, en un intervalo de FPS veces 
 * cada 1000 milisegundos. 
 */
var FPS = 50;
setInterval(function(){
    principal();
},1000/FPS);  

function principal(){
    // console.log("principal");
    borrarCanvas();
    gravedad();
    colision();
    logicaSuelo();
    logicaCactus();
    logicaNube();
    dibujaSuelo();
    dibujaCactus();
    dibujaNube();
    dibujaRex();
    puntuacion();
}




function inicialize(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cargaImagenes();
    // console.debug(ctx);
}



