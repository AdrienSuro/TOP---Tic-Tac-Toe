// Retrieve from DOM :
let gameboardGrid = document.getElementById("gameboardGrid");
let gameboardArray = [];
gameboardArray.length = 9; 

const playerFactory = (name, symbol) => {
  let score = 0;
  let addPoint = function () {
    score += 1;
  };
  let winnerMessage = `${name} has won the game!`;
  return { name, score, addPoint, winnerMessage };
};

let startNewGame = function () {
  let playerName = prompt("What's your name?");
  let playerSymbol = prompt(
    "Choose a symbol. Type the letter X or the letter O."
  );
  let player = playerFactory(playerName, playerSymbol);
  console.log(player);
  }

const createGrid = (() => {  
  function create() { 
    for (let i = 0; i < gameboardArray.length; i++) {
        const boxContent = document.createElement("div");
        boxContent.id = "gameboardBox";
        boxContent.addEventListener("click", gameLogic.setPlayerMark(i, boxContent));
        gameboardGrid.appendChild(boxContent);};
  }
  return {create, gameboardArray};
})();

const gameLogic = (() => {
    let lastPlayer = "";
    const checkWinner = function() {
        let winningConditionX = (gameboardArray[0] === ("X") && gameboardArray[3] === ("X") && gameboardArray[6] === ("X"))|| (gameboardArray[1] === ("X") && gameboardArray[4] === ("X") && gameboardArray[7] === ("X")) || (gameboardArray[2] === ("X") && gameboardArray[5] === ("X") && gameboardArray[8] === ("X")) || (gameboardArray[0] === ("X") && gameboardArray[1] === ("X") && gameboardArray[2] === ("X")) || (gameboardArray[3] === ("X") && gameboardArray[4] === ("X") && gameboardArray[5] === ("X")) || (gameboardArray[6] === ("X") && gameboardArray[7] === ("X") && gameboardArray[8] === ("X")) || (gameboardArray[0] === ("X") && gameboardArray[4] === ("X") && gameboardArray[8] === ("X")) || (gameboardArray[2] === ("X") && gameboardArray[4] === ("X") && gameboardArray[6] === ("X"));
        let winningConditionO = (gameboardArray[0] === ("O") && gameboardArray[3] === ("O") && gameboardArray[6] === ("O"))|| (gameboardArray[1] === ("O") && gameboardArray[4] === ("O") && gameboardArray[7] === ("O")) || (gameboardArray[2] === ("O") && gameboardArray[5] === ("O") && gameboardArray[8] === ("O")) || (gameboardArray[0] === ("O") && gameboardArray[1] === ("O") && gameboardArray[2] === ("O")) || (gameboardArray[3] === ("O") && gameboardArray[4] === ("O") && gameboardArray[5] === ("O")) || (gameboardArray[6] === ("O") && gameboardArray[7] === ("O") && gameboardArray[8] === ("O")) || (gameboardArray[0] === ("O") && gameboardArray[4] === ("O") && gameboardArray[8] === ("O")) || (gameboardArray[2] === ("O") && gameboardArray[4] === ("O") && gameboardArray[6] === ("O"));
        if (winningConditionX) {
          console.log("X won");
        }  else if (winningConditionO) {
          console.log("O won"); }
    }

    const setPlayerMark = function(i, box) {
      if (lastPlayer === "X") {
        gameboardArray[i] = "O";
        box.innerHTML = gameboardArray[i];
        lastPlayer = "O";
        checkWinner();
      } else if (lastPlayer === "" || "O") {
        gameboardArray[i] = "X";
        box.innerHTML = gameboardArray[i];
        lastPlayer = "X";
        checkWinner();
        }
    }
    return {setPlayerMark};
})();

// DOM Manipulation :
document.getElementById("startButton").addEventListener("click", startNewGame);
document
  .getElementById("buttonGameboard")
  .addEventListener("click", gameLogic.setPlayerMark)