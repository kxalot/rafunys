
let players = [];
let currentPlayerIndex = 0;
let level = 1;
let mode = 'lento';
let pruebasPorNivel = 10;
let completedChallenges = 0;
let usedChallenges = {};

function startGame() {
    const p1Name = document.getElementById("player1Name").value || "Jugador 1";
    const p1Gender = document.getElementById("player1Gender").value;
    const p2Name = document.getElementById("player2Name").value || "Jugador 2";
    const p2Gender = document.getElementById("player2Gender").value;
    mode = document.querySelector('input[name="mode"]:checked').value;
    pruebasPorNivel = mode === "lento" ? 10 : 5;

    players = [
        { name: p1Name, gender: p1Gender },
        { name: p2Name, gender: p2Gender }
    ];

    usedChallenges = {};
    level = 1;
    completedChallenges = 0;
    currentPlayerIndex = 0;

    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    nextChallenge();
}

function nextChallenge() {
    const currentPlayer = players[currentPlayerIndex];
    const playerDisplay = `Turno de ${currentPlayer.name}`;
    document.getElementById("turnInfo").innerText = "Turno de...";
    document.getElementById("levelInfo").innerText = `Nivel ${level}`;
    document.getElementById("playerTurn").innerText = playerDisplay;

    const nivelPruebas = pruebas[`nivel${level}`] || [];
    usedChallenges[`nivel${level}`] = usedChallenges[`nivel${level}`] || [];

    const remaining = nivelPruebas.filter(p => !usedChallenges[`nivel${level}`].includes(p));
    if (remaining.length === 0) {
        usedChallenges[`nivel${level}`] = [];
    }

    const challengePool = nivelPruebas.filter(p => !usedChallenges[`nivel${level}`].includes(p));
    const challenge = challengePool[Math.floor(Math.random() * challengePool.length)];

    document.getElementById("challengeText").innerText = challenge;
    usedChallenges[`nivel${level}`].push(challenge);

    completedChallenges++;
    if (completedChallenges >= pruebasPorNivel) {
        level++;
        completedChallenges = 0;
    }

    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}

function resetGame() {
    window.location.reload();
}
