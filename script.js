"use strict";
//Tic tac toe logic
//2 players
//each player has one option per turn.
//check for board ARR for winner each time.
//for example : "x", "x", "x"; -> winner;
//you can check for the winner after there are at least 5 elements on the table. -> optimisation;

const boardArr = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];
let isFinished = false;
let winCombination = new Array(3);
winCombination.fill("");

const gameContainer = document.querySelector(`.game-box`);
const gameBoxes = gameContainer.querySelectorAll(`div`);

let moveCount = 0;
let playerNumber = 0;

//checks if the array element is already set.
const checkForValidClick = (arr, index) => {
  if (arr[Math.floor(index / 3)][index % 3] !== " ") return false;
  else return true;
};

//adds the selected value to an empty space in the 2d array.
//also highlight the selected options to see that they were selected already.
const setArrValue = (boxElement, arr, index, value) => {
  boxElement.textContent = value;
  arr[Math.floor(index / 3)][index % 3] = value;
  boxElement.classList.add(`selected`);
  moveCount++;
};

//change the player by changing the text and the background color.
const changePlayer = () => {
  if (!isFinished)
    document
      .querySelector(`.player-container`)
      .querySelector(`h1`).textContent = `Player ${playerNumber + 1}'s turn!`;
};

//check in the array for a winning combination
const checkForWin = (arr, value, moveCounter, boxElem) => {
  //move counter for optimisation
  console.log(moveCounter);
  if (moveCounter >= 5) {
    //8 possible combinations
    console.log(`i am here`);
    //lines
    if (arr[0][0] == value && arr[0][1] == value && arr[0][2] == value)
      winCombination = [0, 1, 2];
    if (arr[1][0] == value && arr[1][1] == value && arr[1][2] == value)
      winCombination = [3, 4, 5];
    if (arr[2][0] == value && arr[2][1] == value && arr[2][2] == value)
      winCombination = [6, 7, 8];

    //columns
    if (arr[0][0] == value && arr[1][0] == value && arr[2][0] == value)
      winCombination = [0, 3, 6];
    if (arr[0][1] == value && arr[1][1] == value && arr[2][1] == value)
      winCombination = [1, 4, 7];
    if (arr[0][2] == value && arr[1][2] == value && arr[2][2] == value)
      winCombination = [2, 5, 8];

    //diagonals
    if (arr[0][0] == value && arr[1][1] == value && arr[2][2] == value)
      winCombination = [0, 4, 8];
    if (arr[2][0] == value && arr[1][1] == value && arr[0][2] == value)
      winCombination = [6, 4, 2];

    console.log(winCombination);
    if (moveCounter <= 9 && !winCombination.includes("")) {
      processWinning(winCombination, boxElem);
    } else if (moveCounter === 9 && winCombination.includes("")) {
      processDraw();
    }
  }
};

gameBoxes.forEach((box, index) => {
  box.addEventListener(`click`, function () {
    if (!isFinished) {
      if (checkForValidClick(boardArr, index)) {
        if (playerNumber === 0) {
          setArrValue(box, boardArr, index, "x");
          checkForWin(boardArr, "x", moveCount, gameBoxes);
          playerNumber = 1;
          changePlayer();
        } else {
          {
            setArrValue(box, boardArr, index, "o");
            checkForWin(boardArr, "o", moveCount, gameBoxes);
            playerNumber = 0;
            changePlayer();
          }
        }
      }
    }
  });
});

function highlightWinner(combinationArr, allBoxes) {
  combinationArr.forEach((element) => {
    allBoxes[element].classList.add(`win-combination`);
  });
}

const restartGame = () => window.location.reload();

const processResult = (textValue) => {
  isFinished = true;
  document.querySelector(`.player-container`).remove();
  const showEnd = document.createElement(`div`);
  showEnd.classList.add(`results`);
  showEnd.innerHTML = `<h1> ${textValue} </h1>
  <input type="button" value = "New Game!">`;
  document.querySelector(`body`).appendChild(showEnd);
  showEnd.querySelector(`input`).addEventListener(`click`, restartGame);
};

function processWinning(winningCombination, allBoxes) {
  highlightWinner(winningCombination, allBoxes);
  processResult(`Player ${playerNumber + 1} WON!`);
}

function processDraw() {
  processResult(`It's a DRAW!`);
}
