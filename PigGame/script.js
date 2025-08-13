'use strict';

const MAX_PLAYER = 2;
const MAX_SCORE = 100;

// buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const imgDice = document.querySelector('.dice');
// elements
const curScoreEls = document.querySelectorAll('.current-score');
const totalScoreEls = document.querySelectorAll('.score');
const playerEls = document.querySelectorAll('.player');

//
let currentScore = new Array(2);
let totalScore = new Array(2);
let playerIndex = 0;
let anyWinner = false;
Init();

btnRoll.addEventListener('click', () => {
  if (anyWinner) return;

  // get random nubmer
  let random = Math.trunc(Math.random() * 6 + 1);
  imgDice.src = `dice-${random}.png`;
  imgDice.classList.remove('hidden');

  //
  if (random === 1) {
    SwitchPlayer();
  } else {
    // acc current
    currentScore[playerIndex] += random;
    curScoreEls[playerIndex].textContent = currentScore[playerIndex];
  }
});

btnHold.addEventListener('click', () => {
  if (anyWinner) return;
  //
  totalScore[playerIndex] += currentScore[playerIndex];
  totalScoreEls[playerIndex].textContent = totalScore[playerIndex];
  // check if there is a winner?
  if (totalScore[playerIndex] >= MAX_SCORE) {
    anyWinner = true;
    playerEls[playerIndex].classList.add('player--winner');
  } else {
    SwitchPlayer();
  }
});

btnNew.addEventListener('click', () => {
  Init();
});

function SwitchPlayer() {
  // reset current score
  currentScore[playerIndex] = 0;
  curScoreEls[playerIndex].textContent = 0;
  // change player
  playerIndex = MAX_PLAYER - 1 - playerIndex;
  playerEls.forEach(x => x.classList.toggle('player--active'));
}

function Init() {
  currentScore.fill(0);
  totalScore.fill(0);
  curScoreEls.forEach(x => (x.textContent = 0));
  totalScoreEls.forEach(x => (x.textContent = 0));
  playerIndex = 0;
  playerEls[0].classList.add('player--active');
  playerEls[1].classList.remove('player--active');
  imgDice.classList.add('hidden');
  anyWinner = false;
  playerEls.forEach(x => x.classList.remove('player--winner'));
}
