// app.js

let participantes = []; // Lista para almacenar los nombres
totalParticipantes = 0; // Número máximo de participantes
limiteErrores = 3; // Límite de errores permitidos

// Solicitar el número de participantes
function definirParticipantes() {
    const mensaje = "¿Cuántos participantes deseas agregar? (1 a 50)";
    const cantidad = prompt(mensaje);

    if (cantidad && !isNaN(cantidad) && cantidad >= 1 && cantidad <= 50) {
        totalParticipantes = parseInt(cantidad);
        mostrarAlerta(`Puedes registrar hasta ${totalParticipantes} participantes.`);
    } else {
        alert("Ingresa un número válido entre 1 y 50.");
        definirParticipantes();
    }
}

// Añadir un participante
function registrarParticipante() {
    if (participantes.length >= totalParticipantes) {
        alert("Límite de participantes alcanzado.");
        limpiarCampo();
        return;
    }

    const input = document.getElementById("participante");
    const nombre = input.value.trim();

    if (!nombre.includes(" ") || nombre.split(" ").length < 2) {
        gestionarError("Ingresa nombre y apellido.");
        return;
    }

    limiteErrores = 3;
    participantes.push(nombre);

    actualizarLista();
    limpiarCampo();

    if (participantes.length === totalParticipantes) {
        document.querySelector(".boton-sorteo").disabled = false;
        mostrarAlerta("¡Todos los participantes registrados! Puedes sortear ahora.");
    } else {
        mostrarAlerta(`Faltan ${totalParticipantes - participantes.length} participantes.`);
    }
}

// Manejar errores
function gestionarError(mensaje) {
    limiteErrores--;
    if (limiteErrores > 0) {
        alert(`${mensaje} Te quedan ${limiteErrores} intentos.`);
    } else {
        alert("Demasiados errores. Campo deshabilitado.");
        document.getElementById("participante").disabled = true;
    }
}

// Actualizar lista de participantes
function actualizarLista() {
    const lista = document.getElementById("listaParticipantes");
    lista.innerHTML = participantes.map(nombre => `<li>${nombre}</li>`).join('');
}

// Mostrar alertas
function mostrarAlerta(mensaje) {
    document.getElementById("mensajeSistema").textContent = mensaje;
}

// Sorteo del participante
function sortearGanador() {
    if (participantes.length === 0) {
        alert("No hay participantes registrados.");
        return;
    }

    const ganador = participantes[Math.floor(Math.random() * participantes.length)];
    document.getElementById("resultado").innerHTML = `<div class="ganador"><h2>¡Felicidades, ${ganador}!</h2><p>¡Eres el ganador del sorteo! 🎉</p></div>`;

    setTimeout(() => jugarOtraVez(), 3000);
}

// Reiniciar juego
function jugarOtraVez() {
    if (confirm("¿Quieres realizar otro sorteo?")) {
        reiniciarTodo();
    } else {
        alert("¡Gracias por participar!");
    }
}

function reiniciarTodo() {
    participantes = [];
    totalParticipantes = 0;
    limiteErrores = 3;

    document.getElementById("participante").value = "";
    document.getElementById("participante").disabled = false;
    document.getElementById("listaParticipantes").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    document.querySelector(".boton-sorteo").disabled = true;

    mostrarAlerta("");
    definirParticipantes();
}

function limpiarCampo() {
    document.getElementById("participante").value = "";
}

document.getElementById("participante").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        registrarParticipante();
    }
});

window.onload = function () {
    definirParticipantes();
    document.querySelector(".boton-sorteo").disabled = true;
};
