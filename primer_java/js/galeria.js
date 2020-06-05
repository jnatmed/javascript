var galeriaPAW = function(contenedor) {
    var _contenedor = contenedor;
    variablePublica = "";

    function iniciar(){
        document.addEventListener("DOMContentLoaded", function(){
            _contenedor = 
            typeof _contenedor === "string"
            ? document.querySelector(_contenedor)
            : _contenedor;
            _contenedor.classList.Add("galeriaPAW");
            _armaBotonera();
            _armaThumbails
        });
        estilo = _nuevoElemento("link", {
            rel: "stylesheet",
            media: 
        }

        )
    };

    return{
        variablePublica : variablePublica,
        iniciar: iniciar,
    };
    
};