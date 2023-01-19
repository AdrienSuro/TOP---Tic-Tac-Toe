let gameboardGrid = document.getElementById("gameboardGrid");
let gameboardArray = [];
gameboardArray.length = 9; 
let gameStatus = "running";

const playerFactory = (name) => {
  let score = 0;
  let addPoint = function () {
    score += 1;
  };
  let winnerMessage = () => console.log(`${name} has won the game!`);
  return { name, score, addPoint, winnerMessage };
};

const createGrid = () => {  
  if (gameboardGrid.hasChildNodes()) {
    console.log("Grid already here")
  } else {
    for (let i = 0; i < gameboardArray.length; i++) {
      const boxContent = document.createElement("div");
      boxContent.id = "gameboardBox";
      boxContent.addEventListener("click", () => { gameLogic.setPlayerMark(i, boxContent) });
      gameboardGrid.appendChild(boxContent);};
  };
}

// REPAIR WINNER MESSAGE FUNCTIONALITY
const gameLogic = (() => {
    let lastPlayer = "";
    const checkWinner = function() {
        let winningConditionX = (gameboardArray[0] === ("X") && gameboardArray[3] === ("X") && gameboardArray[6] === ("X"))|| (gameboardArray[1] === ("X") && gameboardArray[4] === ("X") && gameboardArray[7] === ("X")) || (gameboardArray[2] === ("X") && gameboardArray[5] === ("X") && gameboardArray[8] === ("X")) || (gameboardArray[0] === ("X") && gameboardArray[1] === ("X") && gameboardArray[2] === ("X")) || (gameboardArray[3] === ("X") && gameboardArray[4] === ("X") && gameboardArray[5] === ("X")) || (gameboardArray[6] === ("X") && gameboardArray[7] === ("X") && gameboardArray[8] === ("X")) || (gameboardArray[0] === ("X") && gameboardArray[4] === ("X") && gameboardArray[8] === ("X")) || (gameboardArray[2] === ("X") && gameboardArray[4] === ("X") && gameboardArray[6] === ("X"));
        let winningConditionO = (gameboardArray[0] === ("O") && gameboardArray[3] === ("O") && gameboardArray[6] === ("O"))|| (gameboardArray[1] === ("O") && gameboardArray[4] === ("O") && gameboardArray[7] === ("O")) || (gameboardArray[2] === ("O") && gameboardArray[5] === ("O") && gameboardArray[8] === ("O")) || (gameboardArray[0] === ("O") && gameboardArray[1] === ("O") && gameboardArray[2] === ("O")) || (gameboardArray[3] === ("O") && gameboardArray[4] === ("O") && gameboardArray[5] === ("O")) || (gameboardArray[6] === ("O") && gameboardArray[7] === ("O") && gameboardArray[8] === ("O")) || (gameboardArray[0] === ("O") && gameboardArray[4] === ("O") && gameboardArray[8] === ("O")) || (gameboardArray[2] === ("O") && gameboardArray[4] === ("O") && gameboardArray[6] === ("O"));
        if (winningConditionX) {
          playerX.winnerMessage;
          gameStatus = "ended"; 
        }  else if (winningConditionO) {
          playerO.winnerMessage.bind(playerO);
          gameStatus = "ended";
        }
    }
    
    // Create a reset button
    // Create a minimax to play against computer
    const setPlayerMark = function(i, box) {
      if (lastPlayer === "X") {
          if ((!box.innerHTML) && (gameStatus === "running")) {
          gameboardArray[i] = "O";
          box.innerHTML = gameboardArray[i];
          lastPlayer = "O";
          checkWinner();
        }
      } else if (lastPlayer === "" || "O") {
        if ((!box.innerHTML) && (gameStatus === "running")) {
        gameboardArray[i] = "X";
        box.innerHTML = gameboardArray[i];
        lastPlayer = "X";
        checkWinner();
        }
      };
  }
    return {setPlayerMark};
})();

document
  .getElementById("buttonGameboard")
  .addEventListener("click", createGrid)

document
  .getElementById("choosePlayers")
  .addEventListener("click", inputPlayerName)

function inputPlayerName() {
  let playerX = playerFactory(prompt("Player X name"));
  let playerO = playerFactory(prompt("Player O name"));
  document.getElementById("nameX").innerHTML = playerX.name;
  document.getElementById("nameO").innerHTML = playerO.name; 
}