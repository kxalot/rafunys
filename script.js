
let players = [];
let turn = 0;
let level = 1;
let mode = 'lento';
let completedChallenges = 0;
let challengesPerLevel = 10;
let challenges = {
  1: ['Caricia inicial', 'Miradas sensuales', 'Beso con mordisco'],
  2: ['Jugueteo con vendas', 'Exploración con pluma', 'Masaje excitante'],
  3: ['Juego con cuerda', 'Desafío con vibrador', 'Postura atrevida'],
};

function startGame() {
  const name1 = document.getElementById('player1').value;
  const name2 = document.getElementById('player2').value;
  const gender1 = document.getElementById('gender1').value;
  const gender2 = document.getElementById('gender2').value;
  mode = document.querySelector('input[name="mode"]:checked').value;
  challengesPerLevel = mode === 'lento' ? 10 : 5;
  players = [
    { name: name1, gender: gender1 },
    { name: name2, gender: gender2 }
  ];
  document.querySelector('.menu').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  updateDisplay();
}

function updateDisplay() {
  document.getElementById('levelDisplay').textContent = 'Nivel ' + level;
  document.getElementById('turnDisplay').textContent = 'Turno de ' + players[turn].name;
}

function nextChallenge() {
  const challengeList = challenges[level] || ['Desafío libre'];
  const challenge = challengeList[Math.floor(Math.random() * challengeList.length)];
  document.getElementById('instruction').textContent = challenge;
  completedChallenges++;
  if (completedChallenges >= challengesPerLevel) {
    level++;
    completedChallenges = 0;
    alert('¡Nivel ' + level + ' desbloqueado!');
  }
  turn = (turn + 1) % players.length;
  updateDisplay();
}

function resetGame() {
  location.reload();
}
