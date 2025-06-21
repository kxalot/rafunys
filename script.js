let currentLevel = 1;
let usedTests = [];
let player1 = "", player2 = "";
let gender1 = "", gender2 = "";
let turnIndex = 0;
let testCount = 0;
const TESTS_PER_LEVEL = 5;

function personalize(text) {
  return text
    .replace(/@hombre/g, gender1 === '@hombre' ? player1 : player2)
    .replace(/@mujer/g, gender1 === '@mujer' ? player1 : player2);
}

function startGame() {
  player1 = document.getElementById("player1").value || "Jugador 1";
  gender1 = document.getElementById("gender1").value;
  player2 = document.getElementById("player2").value || "Jugador 2";
  gender2 = document.getElementById("gender2").value;
  document.getElementById("setupMenu").classList.add("hidden");
  showTurnNotice();
}

function showTurnNotice() {
  const playerName = turnIndex % 2 === 0 ? player1 : player2;
  document.getElementById("turnText").textContent = `🎲 Turno de ${playerName}`;
  document.getElementById("turnNotice").classList.remove("hidden");
  setTimeout(() => {
    document.getElementById("turnNotice").classList.add("hidden");
    document.getElementById("gameScreen").classList.remove("hidden");
    document.getElementById("currentPlayerName").textContent = playerName;
  }, 2000);
}

function nextTest() {
  const available = tests.filter(t => t.level === currentLevel && !usedTests.includes(t.text));
  if (available.length === 0 || testCount >= TESTS_PER_LEVEL) {
    currentLevel++;
    testCount = 0;
    usedTests = [];
    document.getElementById("level").textContent = currentLevel;
  }

  const next = tests.filter(t => t.level === currentLevel && !usedTests.includes(t.text));
  if (next.length === 0) {
    document.getElementById("testBox").textContent = "Fin del juego 🔥";
    return;
  }

  const random = next[Math.floor(Math.random() * next.length)];
  usedTests.push(random.text);
  testCount++;
  document.getElementById("testBox").textContent = personalize(random.text);

  if (random.text.includes("2 minutos")) {
    startTimer(120);
  } else {
    document.getElementById("timer").classList.add("hidden");
  }

  turnIndex++;
  showTurnNotice();
}

function startTimer(seconds) {
  const timerEl = document.getElementById("timer");
  timerEl.classList.remove("hidden");
  let count = seconds;
  timerEl.textContent = `⏳ ${count}s`;
  const interval = setInterval(() => {
    count--;
    timerEl.textContent = `⏳ ${count}s`;
    if (count <= 0) {
      clearInterval(interval);
      timerEl.classList.add("hidden");
    }
  }, 1000);
}

function resetGame() {
  currentLevel = 1;
  testCount = 0;
  usedTests = [];
  turnIndex = 0;
  document.getElementById("level").textContent = currentLevel;
  document.getElementById("testBox").textContent = "Pulsa para comenzar...";
}

const tests = [
  { level: 1, text: "🧡 Bésale el cuello durante 2 minutos sin parar." },
  { level: 1, text: "🧡 Lame muy lentamente su ombligo." },
  { level: 2, text: "❤️ Bebe una bebida con alcohol de su ombligo." },
  { level: 2, text: "❤️ Da un mordisco suave en la parte interna del muslo." },
  { level: 3, text: "🔥 Mastúrbale mientras llevas un disfraz de dominatrix." },
  { level: 4, text: "🖤 Oblígale a correrse... y luego a seguir." }
];
