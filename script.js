let intentos = 6;
const button = document.getElementById("guess-button");
const input = document.getElementById("guess-input");
const valor = input.value;
let palabra;




fetch('https://random-word-api.herokuapp.com/word?lang=es&length=5')
    .then(response => response.json())
    .then(response => {

        console.log('desde API', response);
        palabra = response[0].toUpperCase();
        console.log(palabra);

    })

    .catch(err => {
        let diccionario =  ['ACTOR', 'AGUDO', 'BUENO', 'CAJAS'];
        palabra = diccionario[Math.floor(Math.random() * diccionario.length)];

        console.log("ocurrió un error");


    });


button.addEventListener('click', intentar); 

function intentar(){
    const INTENTO = leerIntento();
    if (INTENTO.length !== 5) {
        alert("Por favor, ingresa exactamente 5 letras.");
        return;
    } else{
        if (INTENTO === palabra ) {
            console.log("GANASTE!")
            terminar("<h1>GANASTE!!</h1>")
            return
        }
        const GRID = document.getElementById("grid");
        const ROW = document.createElement('div');
        ROW.className = 'row';
        
        // Crear una fila para cada intento
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        for (let i in palabra){
            const letraSpan = document.createElement('span');
            letraSpan.className = 'letter';
            if (INTENTO[i] === palabra[i]){
                letraSpan.innerHTML = INTENTO[i];
                letraSpan.style.backgroundColor = 'green';
            } else if (palabra.includes(INTENTO[i])){
                letraSpan.innerHTML = INTENTO[i];
                letraSpan.style.backgroundColor = 'yellow';
            } else {
                letraSpan.innerHTML = INTENTO[i];
                letraSpan.style.backgroundColor = 'grey';
            }
            ROW.appendChild(letraSpan);
        }
        GRID.appendChild(ROW);
        
        // Reducir el número de intentos
        intentos--;
        if (intentos === 0){
            console.log("PERDISTE!");
            terminar("<h1>PERDISTE!!</h1>")
            return
        }
    }
}

function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}

function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    const BOTON = document.getElementById("guess-button");
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
    if (mensaje==="<h1>GANASTE!!</h1>") {
        
    
        // Mostrar la palabra adivinada en una fila separada
        const GRID = document.getElementById("grid");
        const ROW = document.createElement('div');
        ROW.className = 'row';
        GRID.appendChild(ROW);
        for (let i = 0; i < palabra.length; i++) {
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            SPAN.innerHTML = palabra[i];
            SPAN.style.backgroundColor = 'green';
            ROW.appendChild(SPAN);
        }
    }
}
