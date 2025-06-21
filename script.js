
const pruebasPorNivel = {
    1: ["Caricia suave", "Mirada intensa", "Susurros al oído", "Besos en el cuello"],
    2: ["Exploración con pluma", "Masaje con aceite", "Juego de hielos", "Ataduras suaves"],
    3: ["Uso del vibrador", "Palo inmovilizador", "Fusta en acción", "Tentáculo en juego"],
    4: ["Suspensión ligera", "Cambio de roles", "Ordena y obedece", "Toque final del castillo"]
};

let players = [];
let genders = [];
let currentPlayerIndex = 0;
let currentLevel = 1;
let pruebasCompletadas = 0;
let pruebasPorNivelRequeridas = 10;
let modo = "lento";

function startGame() {
    const player1 = document.getElementById("player1").value || "Jugador 1";
    const player2 = document.getElementById("player2").value || "Jugador 2";
    const gender1 = document.getElementById("gender1").value;
    const gender2 = document.getElementById("gender2").value;
    const selectedMode = document.querySelector('input[name="mode"]:checked').value;

    modo = selectedMode;
    pruebasPorNivelRequeridas = modo === "rapido" ? 5 : 10;

    players = [player1, player2];
    genders = [gender1, gender2];
    currentPlayerIndex = 0;
    currentLevel = 1;
    pruebasCompletadas = 0;

    document.querySelector(".mode").style.display = "none";
    document.querySelector(".inputs").style.display = "none";
    document.querySelector("button").style.display = "none";
    document.getElementById("game").style.display = "block";

    updateDisplay();
}

function updateDisplay() {
    document.getElementById("levelDisplay").innerText = `Nivel ${currentLevel}`;
    document.getElementById("playerTurnDisplay").innerText = `Turno de ${players[currentPlayerIndex]}`;
}

function nextChallenge() {
    const pruebasNivel = pruebasPorNivel[currentLevel];
    const prueba = pruebasNivel[Math.floor(Math.random() * pruebasNivel.length)];
    document.getElementById("challengeDisplay").innerText = prueba;

    pruebasCompletadas++;
    if (pruebasCompletadas >= pruebasPorNivelRequeridas) {
        currentLevel++;
        pruebasCompletadas = 0;
    }
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateDisplay();
}

function resetGame() {
    location.reload();
}
