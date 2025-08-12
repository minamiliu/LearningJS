'use strict';

const MAX_NUMBER = 20;

// game set
let randomNumber = GetSecretNumber();
let userScore = MAX_NUMBER;
SetUserScore(userScore);
let userHighScore = 0;

// button event
document.querySelector('.check').addEventListener('click', btnCheckHandler);
document.querySelector('.again').addEventListener('click', btnAgainHandler);

function btnCheckHandler() {
  // input
  let inputNumber = Number(document.querySelector('.guess').value);

  if (!inputNumber) {
    document.querySelector('.message').textContent = 'Input a number 1~20';
    return;
  }

  // check score
  if (userScore <= 0) {
    // the game is already finished.
    return;
  }

  // check number
  if (inputNumber === randomNumber) {
    // correct
    SetWinView();
    if (userScore > userHighScore) {
      userHighScore = userScore;
      document.querySelector('.highscore').textContent = userHighScore;
    }
  } else {
    // wrong
    let msg = inputNumber > randomNumber ? 'Too High' : 'Too Low';
    document.querySelector('.message').textContent = msg;
    SetUserScore(--userScore);
    if (userScore <= 0) {
      document.querySelector('.message').textContent = 'Game Over';
    }
  }
}

function btnAgainHandler() {
  ResetGame();
}

function SetUserScore(scoreValue) {
  document.querySelector('.score').textContent = scoreValue;
}

function SetWinView() {
  document.querySelector('.message').textContent = 'Correct Number!';
  document.querySelector('.number').textContent = randomNumber;
  document.querySelector('body').style.backgroundColor = '#60b347';
  document.querySelector('.number').style.width = '30rem';
}

function ResetGame() {
  randomNumber = GetSecretNumber();
  userScore = MAX_NUMBER;
  SetUserScore(userScore);
  // ui
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = '?';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
}

function GetSecretNumber() {
  let n = Math.floor(Math.random() * MAX_NUMBER) + 1;
  console.log(`Secret Number=${n}`);
  return n;
}
