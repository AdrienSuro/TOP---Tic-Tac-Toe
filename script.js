// Retrieve from DOM :
let gameboardGrid = document.getElementById("gameboardGrid");

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
};

let gameboardModule = (function () {
  const createGameboard = function () {
    let gameboardArray = [];
    gameboardArray.length = 9;
    let addPlayerChoice = function () {
      this.innerHTML = "X";
    };
    for (let i = 0; i < gameboardArray.length; i++) {
      const boxContent = document.createElement("div");
      boxContent.id = "gameboardBox";
      boxContent.addEventListener("click", addPlayerChoice);
      gameboardGrid.appendChild(boxContent);
    }
    console.log(gameboardArray);
  };

  function logGameboard() {
    createGameboard();
  }

  return {
    returnGameboard: function () {
      logGameboard();
    },
  };
})();

// DOM Manipulation :
document.getElementById("startButton").addEventListener("click", startNewGame);
document
  .getElementById("buttonGameboard")
  .addEventListener("click", gameboardModule.returnGameboard);
