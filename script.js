let intentos = 6;
//let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
//const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
let palabra;

const button = document.getElementById("guess-button");
button.addEventListener('click', intentar);
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


function intentar() {
    const INTENTO = leerIntento();
    
    // Verificar si la palabra tiene 5 letras
    if (INTENTO.length !== 5) {
        alert("La palabra debe tener 5 letras.");
        return;  // Salir de la función sin procesar el intento
    }
    
    if (INTENTO === palabra) {
        console.log("GANASTE!")
        terminar("<h1>¡GANASTE!</h1>");
        return;
    }

    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    for (let i in palabra) {
        const letraSpan = document.createElement('span');
        letraSpan.className = 'letter';
        if (INTENTO[i] === palabra[i]) {
            letraSpan.innerHTML = INTENTO[i];
            letraSpan.style.backgroundColor = 'green';
        } else if (palabra.includes(INTENTO[i])) {
            letraSpan.innerHTML = INTENTO[i];
            letraSpan.style.backgroundColor = 'yellow';
        } else {
            letraSpan.innerHTML = INTENTO[i];
            letraSpan.style.backgroundColor = 'grey';
        }
        ROW.appendChild(letraSpan);
    }
    GRID.appendChild(ROW);

    intentos--;
    if (intentos === 0) {
        console.log("PERDISTE!");
        terminar("<h1>¡PERDISTE!</h1>");
        return;
    }
}

function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    const BOTON = document.getElementById("guess-button");
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
    if (mensaje === "<h1>¡GANASTE!</h1>") {
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