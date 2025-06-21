
let nivel = 1;
let turno = 0;
let jugadores = [];
let modo = "lento";
let pruebasPorNivel = {
    1: ["Caricias suaves", "Miradas profundas", "Besos lentos"],
    2: ["Exploración con pluma", "Masaje sensual", "Juego con vendas"],
    3: ["Desnudez parcial", "Lenguaje corporal intenso", "Juego con temperatura"],
    4: ["Dominación leve", "Uso de juguetes suaves", "Exploración creativa"],
    5: ["Toque final del castillo", "Reto extremo", "Desafío libre"]
};

let historialPruebas = {
    1: [], 2: [], 3: [], 4: [], 5: []
};

function startGame() {
    const name1 = document.getElementById('player1Name').value || "Jugador 1";
    const gender1 = document.getElementById('player1Gender').value;
    const name2 = document.getElementById('player2Name').value || "Jugador 2";
    const gender2 = document.getElementById('player2Gender').value;
    const radios = document.getElementsByName('mode');

    for (const r of radios) {
        if (r.checked) {
            modo = r.value;
            break;
        }
    }

    jugadores = [
        { nombre: name1, genero: gender1 },
        { nombre: name2, genero: gender2 }
    ];
    nivel = 1;
    turno = 0;
    historialPruebas = { 1: [], 2: [], 3: [], 4: [], 5: [] };

    document.getElementById('gameArea').style.display = 'block';
    nextChallenge();
}

function nextChallenge() {
    const jugador = jugadores[turno % jugadores.length];
    const pruebasNivel = pruebasPorNivel[nivel];
    const historial = historialPruebas[nivel];

    let prueba;
    const opcionesDisponibles = pruebasNivel.filter(p => !historial.includes(p));
    if (opcionesDisponibles.length > 0) {
        prueba = opcionesDisponibles[Math.floor(Math.random() * opcionesDisponibles.length)];
        historial.push(prueba);
    } else {
        prueba = pruebasNivel[Math.floor(Math.random() * pruebasNivel.length)];
    }

    document.getElementById('turnoText').innerText = `Turno de ${jugador.nombre}`;
    document.getElementById('nivelText').innerText = `Nivel ${nivel}`;
    document.getElementById('pruebaText').innerText = prueba;

    turno++;
    const pruebasParaSubir = modo === 'lento' ? 10 : 5;
    if (historial.length >= pruebasParaSubir && nivel < 5) {
        nivel++;
    }
}

function resetGame() {
    location.reload();
}
