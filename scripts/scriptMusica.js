window.addEventListener(
    "load", function(){
        this.document.getElementById("play").addEventListener(
            "click", sonarPajaros );
        this.document.getElementById("stop").addEventListener(
            "click", callarPajaros );
    }
);
function sonarPajaros(){
    var sonido = document.createElement("iframe");
    sonido.setAttribute("src", "audio/Julieta Venegas - Lento.mp3");
    document.body.appendChild(sonido);
    document.getElementById("play").removeEventListener("click", sonarPajaros);
}
function callarPajaros(){
    var iframe = document.getElementsByTagName("iframe");

    if(iframe.length > 0){
        iframe[0].parentNode.removeChild(iframe[0]);
        document.getElementById("play").addEventListener("click",sonarPajaros)
    }
}